const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
const Customer = require('./models/customer.js');

const prompt = require('prompt-sync')();

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB')
    console.log(`Welcome ${username}`)
    await selectOption ()
}

connect()

const username = prompt('What is your name? ');


const selectOption = async () => {
    const menuSystem = console.log(`What would you like to do.
    1. Create a customer 
    2. View all customers 
    3. Update a customer 
    4. Delete a customer 
    5. Quit`)  
    
    const actionRun = prompt('Number of action to run: ')
    
    await numSelected (actionRun)

}

const numSelected = async (actionRun) => {
    if (actionRun === '1') {
       await createCustomer()
       await selectOption ()
    }

    if (actionRun === '2') {
        await viewCustomers ()
        await selectOption ()
    }

    if (actionRun === '3') {
        await updateCustomers ()
        await selectOption ()
    }

    if (actionRun === '4') {
        await deleteCustomers ()
        await selectOption ()
    }

    if (actionRun === '5') {
        await quitApplication ()
    }
}

const createCustomer = async () => {
    let customerName = prompt(`What is the customer's name?`)
    let customerAge = prompt(`How old is the cutomer?`)
    const customerData = {
        name: customerName,
        age: customerAge
    }
    const customer = await Customer.create(customerData)
   
}

const viewCustomers = async () => {
    const listOfCustomers = await Customer.find()
    console.log(`Below is a list of customers: `)
    listOfCustomers.forEach((customer) => {
        console.log(`
        id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age} `)
    })
}

const updateCustomers = async () => {
    await viewCustomers ()
    const getCustomerById = prompt('Copy and paste the id of the customer you would like to update: ')
    const name = prompt(`Update User Name: `)
    const age = prompt(`Update User Age: `)

    const updateName = await Customer.findByIdAndUpdate(getCustomerById, { name: name })
    const updateAge = await Customer.findByIdAndUpdate(getCustomerById, { age: age })
   
   console.log(`Succesfully Updated.`)
}

const deleteCustomers = async () => {
    await viewCustomers ()
    const getCustomerById = prompt('Copy and paste the id of the customer you would like to delete: ')

    const deleteCustomer = await Customer.findByIdAndDelete(getCustomerById)
    
    console.log(`Customer ${deleteCustomer} has been deleted`)
   
}

const quitApplication = async () => {
    mongoose.connection.close()
}
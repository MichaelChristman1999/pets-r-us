/*
    ==================
    Title: index.js, 
    Author: Michael Christman
    Date: April 9th, 2023 (updated on April 23rd, 2023)
    Description: This is the index.js file for the pets-r-us repo and provides the background for the Pets-R-Us site. It will establish a server connection and instructing the Node.js environment what modules and files to select and how to use them.
*/


//List of modules
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const pino = require('pino');

const mongoose = require('mongoose');
const CONN = 'mongodb+srv://mchristman:M0nduckDuckG00se@bellevueuniversity.y9g9tgp.mongodb.net/test';
mongoose.connect(CONN).then(() => {
    console.log('Database connection attempt was successful');
}).catch(err => {
    console.log('MongoDB Error: ' + err.message);
});

//Import statement for customers and appointment schemas
const Customer = require('./models/customer');
const Appointment = require('./models/appointments');

//This variable enables access for the application to utilize Express.js
const app = express();

//Name of the server established for the Pets-R-Us website
const PORT = process.env.PORT || 3000;

//This will notify the file locations to the router and additionally it will instruct to utilize EJS to create 'views' since the files will be inside the 'views' folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressLayouts)
app.set('layout', './layouts/layout')

//Page server routes

//If server receives <petsrus/> or <petsrus/index> the user will be routed to the main landing page
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Pets-R-Us Landing', 
        message: 'Welcome to the Pets-R-Us website!'
    })
});
app.get('/index', (req, res) => {
    res.render('index', {
        title: 'Pets-R-Us Landing', 
        message: 'Welcome to the Pets-R-Us website!'
    })
});

//If server receives <petsrus/groomiing> the user will be routed to the grooming page
app.get('/grooming', (req, res) => {
    res.render('grooming', {
        title: 'Pets-R-Us Grooming Service',
        message: 'Grooming Appointments Page'
    })
})

//If server receives <petsrus/training> the user will be routed to the training page
app.get('/training', (req, res) => {
    res.render('training', {
        title: 'Pets-R-Us Training',
        message: 'Training Appointments Page'
    })
})

//If server receives <petsrus/boarding> the user will be routed to the boarding page
app.get('/boarding', (req, res) => {
    res.render('boarding', {
        title: 'Pets-R-Us Boarding Service',
        message: 'Boarding Appointments Page'
    })
})

app.get('/customers', (req, res) => {
    Customer.find({}, function(err, customers){
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.render('customer-list', {
                title: 'Pets-R-Us Customer List',
                message: 'Customer List',
                customers: customers
            })
        }
    })   
})


//If server receives <petsrus/registration> the user will be routed to the registration page
app.get('/registration', (req, res) => {
    res.render('registration', {
        title: 'Pets-R-Us User Registration',
        message: 'User Registration Page'
    })
})

app.post('/register', (req, res, next) => {
    console.log(req.body);
    console.log(req.body.customerId);
    console.log(req.body.email);
    const newCustomer = new Customer({
      customerId: req.body.customerId,
      email: req.body.email,
    });

    console.log(newCustomer);

    Customer.create(newCustomer, function(err, cus) {
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.render('index', {
                title: 'Welcome to the Pets-R-Us website!'
            })
        }
    })
})

app.get('/appointments', (req, res) => {
    let jsonFile = fs.readFileSync('./public/data/services.json');
    let services = JSON.parse(jsonFile);

    console.log(services);

    res.render('appointments', {
        title: 'Pets-R-Us Appointment Booking', 
        message: 'Book with Pets-R-Us!',
        services: services
    })
});

app.post('/appointment-booked', (req, res, next) => {
    const newAppointment = new Appointment({
        customerId: req.body.customerId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        service: req.body.service,
    })
    Appointment.create(newAppointment, function(err, appointment){
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.render('index',{
                title: 'Welcome to Pets-R-Us!'
            })
        }
    })
})


///If server receives <petsrus/my-appointments> the user will be routed to the currently booked appointments page

app.get('/my-appointments', (req, res) => {
    res.render('my-appointments', {
        title: 'Pets-R-Us Appointments',
        message: 'Here are the Appointments You Booked'
    })
})

app.get('/api/appointments/:email', async(req, res, next) => {
    Appointment.find({ email: req.params.email}, function(err, appointments) {
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.json(appointments);
        }
    })
})

//The app will listen to the PORT server that was created on line 31
app.listen(PORT, () => {
    console.log('Application started and listening on PORT ' + PORT);
});

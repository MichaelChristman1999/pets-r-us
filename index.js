const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const fs = require('fs');
const Customer = require('./models/customers');
const Appointment = require('./models/appointments');

// Set Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;

// Connecting to Mongo
const CONN = 'mongodb+srv://mchristman:M0nduckDuckG00se@bellevueuniversity.y9g9tgp.mongodb.net/test';

// Showing Server Connection Messages
mongoose.connect(CONN).then(() => {
    console.log('The connection to your MongoDB database was successful');
}).catch(err => {
    console.log('MongoDB Error: ' + err.message);
});

// View to the Landing page
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Pets-R-Us: Home Page',
        message: 'Pets-R-Us: Home Page'
    });
});

// View to the Grooming page
app.get('/grooming', (req, res) => {
    res.render('grooming', {
        title: 'Pets-R-Us: Grooming',
        message: 'Pets-R-Us: Grooming'
    });
});

// View to the Boarding page
app.get('/boarding', (req, res) => {
    res.render('boarding', {
        title: 'Pets-R-Us: Boarding',
        message: 'Pets-R-Us: Boarding'
    });
});

// View to the Training page
app.get('/training', (req, res) => {
    res.render('training', {
        title: 'Pets-R-Us: Training',
        message: 'Pets-R-Us: Training'
    });
});

// View to the Registration page
app.get('/registration', (req, res) => {
    res.render('registration', {
        title: 'Pets-R-Us: Registration',
        message: 'Pets-R-Us: Registration'
    });
});

// HTTP GET route to display the customer list EJS page
app.get('/customers', async (req, res, next) => {
    try {
        const customers = await Customer.find({});
        res.render('customer-list', {
            title: 'Pets-R-Us: Customer List',
            pageTitle: 'Our Customers',
            customers: customers
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
});

// HTTP Post to the Registration
app.post('/registrations', async (req, res, next) => {
    console.log(req.body);
    const newCustomer = new Customer({
        customerId: req.body.customerId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        email: req.body.email,
        agree: req.body.agree
    });
    
    // If successful, route to Home page otherwise show error
    const customer = await Customer.create(newCustomer);

    // Converted callback to Async/Await
    if (customer) {
        res.render('index', {
            title: 'Pets-R-Us'
        });
        } else {
            console.log(err);
            next(err);
    }
  });

// View to the booking page and pulls the services for the form from services.json file
app.get('/booking', (req, res) => {
    let jsonFile = fs.readFileSync('./public/data/services.json');
    let services = JSON.parse(jsonFile);
  
    res.render('booking', {
        title: 'Pets-R-Us: Booking',
        message: 'Pets-R-Us: Booking',
        services: services
    });
  });

// HTTP Post to the Appointments
app.post('/booking', async (req, res, next) => {
    console.log(req.body);
    const newAppointment = new Appointment({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        service: req.body.service
    });
    
    // If successful, route to Home page otherwise show error
    const appointment = await Appointment.create(newAppointment);

    // Converted callback to Async/Await
    if (appointment) {
        res.render('index', {
            title: 'Pets-R-Us'
        });
        } else {
            console.log(err);
            next(err);
    }
  });


// View to the My Appointments Page
  app.get('/my-appointments', (req, res) => {
    res.render('my-appointments', {
        title: 'Pets-R-Us: My Appointments',
        message: 'Appointment Lookup'
    });
  });

  



  app.get('/api/appointments/:email', async (req, res, next) => {
    try {
      const appointments = await Appointment.find({ email: req.params.email });
      res.json(appointments);
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
  
  


  app.use((req, res, next) => {
    res.status(404).send("Sorry, page not found")
  });
  
app.listen(PORT, () => {
    console.log('Application started and listening on PORT ' + PORT);
});

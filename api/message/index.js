//create cars api using express
const createHandler = require('azure-function-express').createHandler;

const express = require('express');
const app = express();

app.use(express.json());

const cars = require('./cars.json');

//get all cars
app.get('/cars', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.a
    res.json(cars);
});

//get car by id
app.get('/cars/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    const id = req.params.id;
    const car = cars.find(car => car.id === parseInt(id));
    res.json(car);
});

//update car
app.put('/cars/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    const id = req.params.id;
    const updatedCar = req.body;
    const index = cars.findIndex(car => car.id === id);
    cars[index] = updatedCar;
    res.json(updatedCar);
});

//delete car
app.delete('/cars/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    const id = req.params.id;
    const index = cars.findIndex(car => car.id === id);
    cars.splice(index, 1);
    res.json({ message: `Car with id ${id} deleted` });
});

//add car
app.post('/cars', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    console.log(req);
    const newCar = req.body;
    if (cars.length === 0){
        newCar.id = 1;
    }else{
        newCar.id = cars[cars.length - 1].id + 1;
    }
    console.log(newCar);
    cars.push(newCar);
    res.json(newCar);
});

//start app at localhost:3001
app.listen(3001, () => {
    console.log('Server started at http://localhost:3001');
});

module.exports = createHandler(app);
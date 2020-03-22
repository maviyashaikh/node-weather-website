const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() // calling express method

// Define paths for express config
const publicdir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') // we require this line because we have renamed the folder in public dir from 'views' to 'templates'...as 'views' is the default name if we dont do this it will throw and error
const partialsPath = path.join(__dirname, '../templates/partials')//path to partials directory

// Setup handlebars engine and views loaction
app.set('view engine', 'hbs')// setting engine as hbs
app.set('views', viewsPath)// setting the new path of views
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicdir))//for static pages

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Maviya Shaikh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Maviya Shaikh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a page for your help whenever required. You can contact us on the mail given below',
        title: 'Help',
        name: 'Maviya Shaikh'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide and address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
           return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
               return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: location
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('', {
        title: 'Help article not found!',
        name: 'Maviya Shaikh'
    })
})

app.get('*', (req, res) => {
    res.render('', {
        title: '404 Page not found!',
        name: 'Maviya Shaikh'
    })
})

app.listen(3000, () => {
    console.log('The server is up on port 3000')
})

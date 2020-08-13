const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./models/User')
require('./models/Vaccine')
const requireToken = require('./middleware/requireToken')
const {CONNECTION} = require('../keys')// import of secret key with your mongoDB Connection and password
const authRoutes = require('./routes/authRoutes')

app.use(bodyParser.json())
app.use(authRoutes)
const Vaccine = mongoose.model("Vaccine")

const mongoUri = CONNECTION// imported of .env (mongoDB connection)

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

mongoose.connection.on("connected", () => {
    console.log("Connected to mongo!")
})

mongoose.connection.on("error", (err) => {
    console.log("Error", err)
})

mongoose.set('useFindAndModify', false);

app.get('/', requireToken, (req, res) => {
    Vaccine.find({}).then(data => {
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
})

app.get('/auth', requireToken, (req, res) => {
    res.send({id: req.user._id})
})

app.post('/send-data', (req, res) => {
    const vaccine = new Vaccine({
        vacina: req.body.vacina,
        dose: req.body.dose,
        lote: req.body.lote,
        date: req.body.date,
        userID: req.body.userID,
        date2: req.body.date2,
        date3: req.body.date3,
        date4: req.body.date4
    })
    vaccine.save().then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
    
})

app.post('/delete', (req, res) => {
    Vaccine.findByIdAndRemove(req.body.id).then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
})

app.post('/update', (req, res) => {
    Vaccine.findByIdAndUpdate(req.body.id, {     
        vacina: req.body.vacina,
        dose: req.body.dose,
        lote: req.body.lote,
        date: req.body.date,
        userID: req.body.userID,
        date2: req.body.date2,
        date3: req.body.date3,
        date4: req.body.date4
    }).then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
})

app.listen(3000, () => {
    console.log('Server running!')
})
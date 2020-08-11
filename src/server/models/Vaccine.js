const mongoose = require('mongoose')

const VaccineSchema = new mongoose.Schema({
    vacina: {
        type: String,
        required:true
    },
    dose: {
        type: String,
        required:true
    },
    lote: {
        type: String,
        required:true
    },
    date: {
        type: String,
        required:true
    },
    date2: String,
    date3: String,
    date4: String
})

mongoose.model("Vaccine", VaccineSchema)
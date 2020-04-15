const mongoose = require('mongoose')

const password = ''

const url = `mongodb+srv://fullstack:${password}@persons-lqwpf.mongodb.net/fullstack-persons`

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

module.exports = Person

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

const logger = (req, res, next) => {
    console.log('Method: ', req.method)
    console.log('Path: ', req.path)
    console.log('Body: ', req.body)
    console.log('---')
    next()
}

app.use(logger)

const formatPerson = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (body.name === undefined || body.number === undefined) {
        return res.status(400).json({ error: 'name or number missing' })
    }

    Person
        .find({ name: body.name })
        .then( persons => {
            if (persons.length > 0){
                return res.status(400).json({ error: 'name must be unique' })
            } else {
                const person = new Person({
                    name: body.name,
                    number: body.number
                })
            
                person
                    .save()
                    .then(savedPerson => {
                        res.json(formatPerson(savedPerson))
                    })
            }
        }) 
})

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(persons => {
            res.json(persons.map(formatPerson))
            })
})

app.get('/api/persons/:id', (req, res) => {
    Person
        .findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(formatPerson(person))
            } else {
                res.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        })
})

app.delete('/api/persons/:id', (req, res) => {
    Person
        .findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => {
            res.status(400).send({ error: 'malformatted id' })
        })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

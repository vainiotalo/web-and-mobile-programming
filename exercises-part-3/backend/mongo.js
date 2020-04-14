const mongoose = require('mongoose')

const password = ''

const url = `mongodb+srv://fullstack:${password}@persons-lqwpf.mongodb.net/fullstack-persons`

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

const args = process.argv.slice(2)

if(args.length > 0){
    const person = new Person({
        name: `${args[0]}`,
        number: `${args[1]}`,
    })

    person
        .save()
        .then(response => {
            console.log(`adding person ${args[0]} number ${args[1]} to the directory`)
            mongoose.connection.close()
        })

} else {
    Person
        .find({})
        .then(result => {
            console.log('puhelinluettelo:')
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
}
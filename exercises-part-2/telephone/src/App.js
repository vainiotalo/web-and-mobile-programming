import React from 'react'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: ''
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                this.setState({ persons: response.data })
            })
    }

    addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }

        if (this.state.persons.filter(data => data.name === this.state.newName).length > 0
            || this.state.persons.filter(data => data.number === this.state.newNumber).length > 0){
            alert("Nimi ja/tai numero on jo luettelossa")
        } 
        else {
            axios.post('http://localhost:3001/persons', personObject)
            .then(response => {
                this.setState({
                persons: this.state.persons.concat(response.data),
                newName: '',
                newNumber: ''
                })
            })
        }
    }

    removePerson = (event) => {
        const id = parseInt([event.target.id])
        const name = [event.target.name]
        const url = 'http://localhost:3001/persons/' + id

        if(window.confirm('poistetaanko ' + name)){

        axios
            .delete(url)
            .then(response => {
                this.setState({
                    persons: this.state.persons.filter(person => person.id !== id)
                })
            })
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Form onSubmit={this.addPerson} onChange={this.handleChange}
                        name={this.state.newName} number={this.state.newNumber} />
                <h2>Numerot</h2>
                <Directory entries={this.state.persons} handleClick={this.removePerson}  /> 
            </div>
        )
    }
}

const Form = ({ onSubmit, onChange, name, number }) => {
    return(
        <form onSubmit={onSubmit}>
            <div>
                nimi: <input
                        name = "newName"
                        value={name}
                        onChange={onChange}
                        required
                        />
            </div>
            <div>
                numero: <input
                        name = "newNumber"
                        value={number}
                        onChange={onChange}
                        required
                        />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}

const Directory = ({ entries, handleClick }) => {
    return(
        <div>
        <style>{`
            table{
                width:10%;
                text-align: left;
            }
        `}</style>
        <table>
            <tbody>
                    {entries.map(person =>
                        <tr key={person.id + ''}>
                            <td>{person.name}</td>
                            <td>{person.number}</td>
                            <td><button onClick={handleClick}
                                        name={person.name}
                                        id={person.id}>poista</button></td>
                        </tr>)}
            </tbody>
        </table>
        </div>
    )
}

export default App
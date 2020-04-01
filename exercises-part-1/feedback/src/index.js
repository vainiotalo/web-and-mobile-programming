import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hyvä: 0,
            neutraali: 0,
            huono: 0,
            tulokset: 0
        }
    }

    hyväPalaute = () => {
        this.setState({
            hyvä: this.state.hyvä + 1,
            tulokset: this.state.tulokset + 1
        })
    }

    neutraaliPalaute = () => {
        this.setState({
            neutraali: this.state.neutraali + 1,
            tulokset: this.state.tulokset + 0
        })
    }

    huonoPalaute = () => {
        this.setState({
            huono: this.state.huono + 1,
            tulokset: this.state.tulokset - 1
        })
    }

    render() {
        if (this.state.hyvä === 0 && this.state.neutraali === 0 && this.state.huono === 0) {
            return (
                <div>
                <h1>anna palautetta</h1>
                <Button handleClick={this.hyväPalaute} text="hyvä" />
                <Button handleClick={this.neutraaliPalaute} text='neutraali' />
                <Button handleClick={this.huonoPalaute} text='huono' />
                <h1>statistiikka</h1>
                <p>ei yhtään palautetta annettu</p>
            </div>
            )
        }
        return (
            <div>
                <h1>anna palautetta</h1>
                <Button handleClick={this.hyväPalaute} text="hyvä" />
                <Button handleClick={this.neutraaliPalaute} text='neutraali' />
                <Button handleClick={this.huonoPalaute} text='huono' />
                <h1>statistiikka</h1>
                <Statistics stat1={this.state.hyvä} stat2={this.state.neutraali}
                                stat3={this.state.huono}
                                stat4={this.state.tulokset / (this.state.hyvä + this.state.neutraali + this.state.huono) || 0}
                                stat5={(this.state.hyvä / (this.state.hyvä + this.state.neutraali + this.state.huono)) || 0} />
            </div>
        )
    }
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = ({ name, stat }) => {
    return (
        <div>
        <style>{`
            table{
                width:30%;
                text-align: left;
        }
        `}</style>
        
        <table>
            <tbody>
                <tr>
                    <td>{name}:</td>
                    <td width="50%">{stat}</td>
                </tr>
            </tbody>
        </table>
        </div>
    )
}

const Statistics = ({ stat1, stat2, stat3, stat4, stat5 }) => {
    return (
        <div>
            <Statistic name='hyvä' stat={stat1} />
            <Statistic name='neutraali' stat={stat2} />
            <Statistic name='huono' stat={stat3} />
            <Statistic name='keskiarvo' stat={stat4.toFixed(1)} />
            <Statistic name='positiivisia' stat={Number(stat5).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1}) }  />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
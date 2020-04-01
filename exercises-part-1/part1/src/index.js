import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.part.name} {props.part.exercises}</p>
        </div>
    )
}

const Contents = (props) => {
    return (
        <div>
            <Part part={props.parts[0]} />
            <Part part={props.parts[1]} />
            <Part part={props.parts[2]} />
        </div>
    )
}

const Total = (props) => {
    const sum = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
    return (
        <div>
            <p>Total {sum} exercises</p>
        </div>
    )
}
 
const App = () => {
    const course = {
        name: 'Superadvanced web and mobile programming',
        parts: [
        {
            name: 'Basics of React',
            exercises: 8
        },
        {
            name: 'Using props',
            exercises: 10
        },
        {
            name: 'Component states',
            exercises: 12
        }
    ]
}

    return (
        <div>
            <Header course={course.name} />
            <Contents parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

ReactDOM.render(
<App />, 
document.getElementById('root')
)
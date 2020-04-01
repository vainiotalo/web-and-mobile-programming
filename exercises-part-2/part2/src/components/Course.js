import React from 'react'

const Total = ( {course} ) => {
    const arr = course.parts.map(part => part.exercises)
    const sum = arr.reduce((a,b) => a + b, 0)
    return (
        <div>
            <p>Total: {sum}</p>
        </div>
    )
}

const Part = ( {part} ) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Contents = ( {course} ) => {
    return (
        <div>
            {course.parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}

const Header = ( {course} ) => {
    return (
        <div>
            <h1>{course.name}</h1>
        </div>
    )
}

const Course = ( {course} ) => {

    return (
        <div>
            <Header course={course} />
            <Contents course={course} />
            <Total course={course} />
        </div>
    )
}

export default Course
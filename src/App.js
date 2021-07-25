import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import {useEffect} from "react";
import { useState } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
    const [showAddTask, setShowAddTask] = useState(
        false
    )

    const [tasks, setTasks] = useState([])

    useEffect( () => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks()
    }, [])

    const fetchTasks = async () => {
        const result = await fetch('http://localhost:5000/tasks')
        const tasks = await result.json()
        console.log(tasks)
        return tasks
    }
    const fetchTask = async (id) => {
        const result = await fetch(`http://localhost:5000/tasks/${id}`)
        const task = await result.json()
        console.log(task)
        return task
    }

    // add task
    const addTask = async (task) => {
        const response = await fetch(`http://localhost:5000/tasks`,
            { method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(task) })

        const data = await response.json()
        setTasks([...tasks, data])

        /*
        const id = Math.floor(Math.random() * 1000) + 1
        const newTask = { id, ...task }
        setTasks([...tasks, newTask])
         */
    }

    // delete task
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE',})
        setTasks(tasks.filter((task) => (task.id !== id)))
    }

    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
        const response = await fetch(`http://localhost:5000/tasks/${id}` ,
            { method: 'PUT',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify(updatedTask)})

        const data = await response.json()
        console.log(data)
        setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
    }

  return (
      <Router>
        <div className="container">
          <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>

            <Route path='/' exact render={ () => (
             <>
                 {showAddTask && <AddTask onAdd={addTask}/>}

                 { tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No tasks' }
             </>
            )}/>
            <Route path='/about' component={About}/>
            <Footer/>
        </div>
      </Router>
  );
}


export default App;

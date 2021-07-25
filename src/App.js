import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState } from 'react'

function App() {
    const [tasks, setTasks] = useState(
        [
            {
                id: 1,
                text: 'Doctors appointment',
                day: 'Feb 5th at 2:30pm',
                reminder: true,
            },
            {
                id: 2,
                text: 'Meeting at school',
                day: 'Feb 6th at 8:30pm',
                reminder: true,
            },
            {
                id: 3,
                text: 'Food shopping',
                day: 'Feb 5th at 1:30pm',
                reminder: false,
            },
        ]
    )

    // delete task
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => (task.id !== id)))
    }

    const toggleReminder = (id) => {
        setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
        console.log(id, "reminder")
    }

  return (
    <div className="container">
      <Header/>
        { tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No tasks' }

    </div>
  );
}


export default App;

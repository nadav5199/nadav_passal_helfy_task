import TaskItem from './TaskItem'
import '../styles/task-list.css'
import { getAllTasks } from '../services/tasks.service';
import { useEffect, useState } from 'react';

export default function TaskList() {
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        getAllTasks(setTasks);
    }, []);
    return (
        <div className="task-list-container">
            <div>
                <h1>Task List</h1>
            </div>
            <div>
                {tasks.map(task => {
                    return (
                        <TaskItem task={task} />
                    )
                })}
            </div>
        </div>
    )
}
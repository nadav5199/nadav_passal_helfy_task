import TaskItem from './TaskItem'
import '../styles/task-list.css'
export default function TaskList() {
    return (
        <div className="task-list-container">
            <div>
                <h1>Task List</h1>
            </div>
            <div>
                <TaskItem />
            </div>
        </div>
    )
}
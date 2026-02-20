import '../styles/task-item.css'
export default function TaskItem({ task }) {
    return (
        <div className="task-item-container">
            <h2>Task Item</h2>
            <h3>{task.title}</h3>
            <h3>{task.description}</h3>
            <h3>{task.priority}</h3>
        </div>
    )
}

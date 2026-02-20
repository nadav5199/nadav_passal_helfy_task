import '../styles/task-item.css'
export default function TaskItem({ task, onToggle }) {
    const handleCheckboxClick = (e) => {
        e.stopPropagation();
        if (onToggle) {
            onToggle(task.id);
        }
    };

    return (
        <div className="task-item-container">
            <h3>{task.title}</h3>
            <h3>{task.description}</h3>
            <h3>{task.priority}</h3>
            <input 
                type="checkbox" 
                checked={task.completed} 
                onClick={(e) => e.stopPropagation()}
                onChange={handleCheckboxClick}
            />
        </div>
    )
}

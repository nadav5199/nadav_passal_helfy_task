import '../styles/task-item.css'
export default function TaskItem({ task, onToggle, onDelete }) {
    const handleCheckboxClick = (e) => {
        e.stopPropagation();
        if (onToggle) {
            onToggle(task.id);
        }
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        if (onDelete) {
            onDelete(task.id);
        }
    };

    return (
        <div className={`task-item-container priority-${task.priority?.toLowerCase()}`}>
                <button 
                    className="delete-btn" 
                    onClick={handleDeleteClick}
                    aria-label="Delete task"
                >
                    🗑️
                </button>
            <h2>{task.title}</h2>
            <h3>fescription{task.description}</h3>
            <h3>priority: {task.priority}</h3>
            <div className="task-item-actions">
                <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onClick={(e) => e.stopPropagation()}
                    onChange={handleCheckboxClick}
                />
            </div>
        </div>
    )
}

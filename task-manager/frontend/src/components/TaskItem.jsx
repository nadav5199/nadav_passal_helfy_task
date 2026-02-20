import '../styles/task-item.css'
export default function TaskItem({ task, onToggle }) {
    const handleCheckboxClick = (e) => {
        e.stopPropagation();
        if (onToggle) {
            onToggle(task.id);
        }
    };

    return (
        <div className={`task-item-container priority-${task.priority?.toLowerCase()}`}>
            <h2>{task.title}</h2>
            <h3>fescription{task.description}</h3>
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

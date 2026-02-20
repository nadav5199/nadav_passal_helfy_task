import TaskItem from './TaskItem'
import Modal from './Modal'
import FilterDropdown from './FilterDropdown'
import '../styles/task-list.css'
import { getAllTasks, updateTask, createTask, toggleTaskCompletion, deleteTask } from '../services/tasks.service';
import { useEffect, useState, useMemo } from 'react';
import clsx from 'clsx';

export default function TaskList() {
    const [tasks, setTasks] = useState([])
    const [currentIndex, setCurrentIndex] = useState(3) 
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [enableTransition, setEnableTransition] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)
    const [isCreateMode, setIsCreateMode] = useState(false)
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        getAllTasks(setTasks);
    }, []);

    const cloneCount = 3; 

    const filteredTasks = useMemo(() => {
        switch (filter) {
            case 'completed':
                return tasks.filter(task => task.completed);
            case 'pending':
                return tasks.filter(task => !task.completed);
            default:
                return tasks;
        }
    }, [tasks, filter]);

    const extendedTasks = useMemo(() => {
        if (filteredTasks.length === 0) return [];
        if (filteredTasks.length < 3) return filteredTasks;

        const prefix = filteredTasks.slice(-cloneCount);
        const suffix = filteredTasks.slice(0, cloneCount);

        return [...prefix, ...filteredTasks, ...suffix];
    }, [filteredTasks]);

    const handleNext = () => {
        if (isTransitioning || filteredTasks.length < 3) return;
        setIsTransitioning(true);
        setCurrentIndex(prev => prev + 1);
    };

    const handlePrev = () => {
        if (isTransitioning || filteredTasks.length < 3) return;
        setIsTransitioning(true);
        setCurrentIndex(prev => prev - 1);
    };


    const handleTransitionEnd = () => {
        const totalRealItems = filteredTasks.length;
        if (currentIndex >= totalRealItems + cloneCount) {
            setEnableTransition(false);
            setIsTransitioning(false);
            setTimeout(() => {
                setCurrentIndex(cloneCount);
                setTimeout(() => {
                    setEnableTransition(true);
                }, 50);
            }, 0);
            return;
        }

        if (currentIndex < cloneCount) {
            setEnableTransition(false);
            setIsTransitioning(false);
            setTimeout(() => {
                setCurrentIndex(totalRealItems + cloneCount - 1);
                setTimeout(() => {
                    setEnableTransition(true);
                }, 50);
            }, 0);
            return;
        }

        setIsTransitioning(false);
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setIsCreateMode(false);
        setIsModalOpen(true);
    };

    const handleAddClick = () => {
        setSelectedTask(null);
        setIsCreateMode(true);
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (formData) => {
        if (isCreateMode) {
            const newTask = await createTask(formData);
            setTasks(prev => [...prev, newTask]);
        } else {
            updateTask(selectedTask.id, formData, setTasks);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setIsCreateMode(false);
    };

    const handleToggle = (taskId) => {
        toggleTaskCompletion(taskId, setTasks);
    };

    const handleDelete = (taskId) => {
        deleteTask(taskId, setTasks);
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrentIndex(3);
    };

    if (filteredTasks.length === 0) {
        return (
            <div className="task-list-container">
                <div className="task-list-header">
                    <h1>Task List</h1>
                    <FilterDropdown filter={filter} onFilterChange={handleFilterChange} />
                    <button className="add-task-btn" onClick={handleAddClick} aria-label="Add new task">
                        +
                    </button>
                </div>
                <p>No tasks available</p>
                <Modal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    title="Create Task"
                    task={null}
                    onSubmit={handleModalSubmit}
                />
            </div>
        );
    }

    if (filteredTasks.length === 1) {
        return (
            <div className="task-list-container">
                <div className="task-list-header">
                    <h1>Task List</h1>
                    <FilterDropdown filter={filter} onFilterChange={handleFilterChange} />
                    <button className="add-task-btn" onClick={handleAddClick} aria-label="Add new task">
                        +
                    </button>
                </div>
                <div className="single-task" onClick={() => handleTaskClick(filteredTasks[0])}>
                    <TaskItem task={filteredTasks[0]} onToggle={handleToggle} onDelete={handleDelete} />
                </div>
                <Modal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    title={isCreateMode ? "Create Task" : "Edit Task"}
                    task={isCreateMode ? null : selectedTask}
                    onSubmit={handleModalSubmit}
                />
            </div>
        );
    }
    if (filteredTasks.length === 2) {
        return (
            <div className="task-list-container">
                <div className="task-list-header">
                    <h1>Task List</h1>
                    <FilterDropdown filter={filter} onFilterChange={handleFilterChange} />
                    <button className="add-task-btn" onClick={handleAddClick} aria-label="Add new task">
                        +
                    </button>
                </div>
                <div className="task-grid">
                    {filteredTasks.map(task => (
                        <div key={task.id} onClick={() => handleTaskClick(task)}>
                            <TaskItem task={task} onToggle={handleToggle} onDelete={handleDelete} />
                        </div>
                    ))}
                </div>
                <Modal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    title={isCreateMode ? "Create Task" : "Edit Task"}
                    task={isCreateMode ? null : selectedTask}
                    onSubmit={handleModalSubmit}
                />
            </div>
        );
    }

    return (
        <div className="task-list-container">
            <div className="task-list-header">
                <h1>Task List</h1>
                <FilterDropdown filter={filter} onFilterChange={handleFilterChange} />
                <button className="add-task-btn" onClick={handleAddClick} aria-label="Add new task">
                    +
                </button>
            </div>

            <div className="carousel-wrapper">
                <button
                    className="carousel-nav prev"
                    onClick={handlePrev}
                    disabled={isTransitioning}
                    aria-label="Previous task"
                >
                    ←
                </button>

                <div className="carousel-container">
                    <div
                        className={clsx('carousel-track', {
                            'no-transition': !enableTransition
                        })}
                        style={{
                            transform: `translateX(-${(currentIndex * 100) / 3}%)`,
                        }}
                        onTransitionEnd={handleTransitionEnd}
                    >
                        {extendedTasks.map((task, index) => (
                            <div 
                                key={`${task.id}-${index}`} 
                                className="carousel-slide"
                                onClick={() => handleTaskClick(task)}
                            >
                                <TaskItem task={task} onToggle={handleToggle} onDelete={handleDelete} />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    className="carousel-nav next"
                    onClick={handleNext}
                    disabled={isTransitioning}
                    aria-label="Next task"
                >
                    →
                </button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                title={isCreateMode ? "Create Task" : "Edit Task"}
                task={isCreateMode ? null : selectedTask}
                onSubmit={handleModalSubmit}
            />
        </div>
    );
}
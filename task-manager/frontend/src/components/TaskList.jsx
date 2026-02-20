import TaskItem from './TaskItem'
import Modal from './Modal'
import '../styles/task-list.css'
import { getAllTasks, updateTask } from '../services/tasks.service';
import { useEffect, useState, useMemo } from 'react';
import clsx from 'clsx';

export default function TaskList() {
    const [tasks, setTasks] = useState([])
    const [currentIndex, setCurrentIndex] = useState(3) 
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [enableTransition, setEnableTransition] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)

    useEffect(() => {
        getAllTasks(setTasks);
    }, []);

    const cloneCount = 3; 


    const extendedTasks = useMemo(() => {
        if (tasks.length === 0) return [];
        if (tasks.length < 3) return tasks;

        const prefix = tasks.slice(-cloneCount);
        const suffix = tasks.slice(0, cloneCount);

        return [...prefix, ...tasks, ...suffix];
    }, [tasks]);

    const handleNext = () => {
        if (isTransitioning || tasks.length < 3) return;
        setIsTransitioning(true);
        setCurrentIndex(prev => prev + 1);
    };

    const handlePrev = () => {
        if (isTransitioning || tasks.length < 3) return;
        setIsTransitioning(true);
        setCurrentIndex(prev => prev - 1);
    };


    const handleTransitionEnd = () => {
        const totalRealItems = tasks.length;
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
        setIsModalOpen(true);
    };

    const handleTaskUpdate = (updatedData) => {
        updateTask(selectedTask.id, updatedData, setTasks);
    };

    if (tasks.length === 0) {
        return (
            <div className="task-list-container">
                <h1>Task List</h1>
                <p>No tasks available</p>
            </div>
        );
    }

    if (tasks.length === 1) {
        return (
            <div className="task-list-container">
                <h1>Task List</h1>
                <div className="single-task" onClick={() => handleTaskClick(tasks[0])}>
                    <TaskItem task={tasks[0]} />
                </div>
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Edit Task"
                    task={selectedTask}
                    onSubmit={handleTaskUpdate}
                />
            </div>
        );
    }
    if (tasks.length === 2) {
        return (
            <div className="task-list-container">
                <h1>Task List</h1>
                <div className="task-grid">
                    {tasks.map(task => (
                        <div key={task.id} onClick={() => handleTaskClick(task)}>
                            <TaskItem task={task} />
                        </div>
                    ))}
                </div>
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Edit Task"
                    task={selectedTask}
                    onSubmit={handleTaskUpdate}
                />
            </div>
        );
    }

    return (
        <div className="task-list-container">
            <h1>Task List</h1>

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
                                <TaskItem task={task} />
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
                onClose={() => setIsModalOpen(false)}
                title="Edit Task"
                task={selectedTask}
                onSubmit={handleTaskUpdate}
            />
        </div>
    );
}
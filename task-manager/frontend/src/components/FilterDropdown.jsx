import { useState } from 'react';
import '../styles/filter-dropdown.css';

export default function FilterDropdown({ filter, onFilterChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (newFilter) => {
        onFilterChange(newFilter);
        setIsOpen(false);
    };

    return (
        <div className="filter-container">
            <button 
                className="filter-btn" 
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Filter tasks"
            >
                <span>Filter</span>
            </button>
            {isOpen && (
                <div className="filter-dropdown">
                    <label className="filter-option">
                        <input 
                            type="radio" 
                            name="filter" 
                            checked={filter === 'all'} 
                            onChange={() => handleChange('all')}
                        />
                        All
                    </label>
                    <label className="filter-option">
                        <input 
                            type="radio" 
                            name="filter" 
                            checked={filter === 'completed'} 
                            onChange={() => handleChange('completed')}
                        />
                        Completed
                    </label>
                    <label className="filter-option">
                        <input 
                            type="radio" 
                            name="filter" 
                            checked={filter === 'pending'} 
                            onChange={() => handleChange('pending')}
                        />
                        Pending
                    </label>
                </div>
            )}
        </div>
    );
}

import React, { useState } from 'react';
import { addCollector } from '../services/api';

const AddCollectorForm = () => {
    const [contact, setContact] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addCollector({ contact });
            alert('Collector added successfully!');
            setContact('');
        } catch (error) {
            alert(`Failed to add collector: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Collector</h2>
            <div>
                <label>Contact:</label>
                <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Collector</button>
        </form>
    );
};

export default AddCollectorForm;
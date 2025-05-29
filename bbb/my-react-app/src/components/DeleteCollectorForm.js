import React, { useState } from 'react';
import { deleteCollector } from '../services/api';

const DeleteCollectorForm = () => {
    const [collectorId, setCollectorId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await deleteCollector(collectorId);
            alert('Collector deleted successfully!');
            setCollectorId('');
        } catch (error) {
            alert(`Failed to delete collector: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Delete Collector</h2>
            <div>
                <label>Collector ID:</label>
                <input
                    type="number"
                    value={collectorId}
                    onChange={(e) => setCollectorId(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Delete Collector</button>
        </form>
    );
};

export default DeleteCollectorForm;
import React, { useState } from 'react';
import { deleteCollection } from '../services/api';

const DeleteCollectionForm = () => {
    const [collectionId, setCollectionId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await deleteCollection(collectionId);
            alert('Collection deleted successfully!');
            setCollectionId('');
        } catch (error) {
            alert(`Failed to delete collection: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Delete Collection</h2>
            <div>
                <label>Collection ID:</label>
                <input
                    type="number"
                    value={collectionId}
                    onChange={(e) => setCollectionId(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Delete Collection</button>
        </form>
    );
};

export default DeleteCollectionForm;
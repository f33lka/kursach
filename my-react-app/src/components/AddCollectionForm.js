import React, { useState } from 'react';
import { addCollection } from '../services/api';

const AddCollectionForm = () => {
    const [owner, setOwner] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addCollection({ owner });

            alert('Collection added successfully!');

            setOwner('');
        } catch (error) {
            alert(`Failed to add collection: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} class="text-black">
            <h2>Add Collection</h2>

            <div>
                <label>Owner:</label>

                <input
                    type="text"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}

                    required
                />
            </div>
            
            <button type="submit">Add Collection</button>
        </form>
    );
};

export default AddCollectionForm;
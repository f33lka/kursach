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
        <form class="w-1/4 p-2 bg-gray-200 rounded-lg text-black flex flex-col justify-between" onSubmit={handleSubmit}>
            <div>
                <h2 class="my-2 text-center text-lg font-semibold">Delete Collection</h2>

                <div class="my-1 flex justify-between">
                    <label>Collection ID:</label>

                    <input class="w-1/2 bg-gray-300 rounded-lg"
                        type="number"
                        value={collectionId}
                        onChange={(e) => setCollectionId(e.target.value)}

                        required
                    />
                </div>
            </div>

            <div class="h-1/18 flex justify-center">
                <button class="w-2/3 border-2 border-gray-300 rounded-lg font-sans font-semibold transition-colors duration-200 ease-in-out hover:bg-gray-300 hover:text-red-600" type="submit">
                    Delete Collection
                </button>
            </div>
        </form>
    );
};

export default DeleteCollectionForm;
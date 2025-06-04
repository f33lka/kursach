import React, { useState } from 'react';
import { deleteBrand } from '../services/api';

const DeleteBrandForm = () => {
    const [brandId, setBrandId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await deleteBrand(brandId);

            alert('Brand deleted successfully!');

            setBrandId('');
        } catch (error) {
            alert(`Failed to delete brand: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <form class="w-1/4 p-2 bg-gray-200 rounded-lg text-black flex flex-col justify-between" onSubmit={handleSubmit}>
            <div>
                <h2 class="my-2 text-center text-lg font-semibold">Delete Brand</h2>

                <div class="my-1 flex justify-between">
                    <label>Brand ID:</label>

                    <input class="w-1/2 bg-gray-300 rounded-lg"
                        type="number"
                        value={brandId}
                        onChange={(e) => setBrandId(e.target.value)}

                        required
                    />
                </div>
            </div>
            
            <div class="h-1/18 flex justify-center">
                <button class="w-2/3 border-2 border-gray-300 rounded-lg font-sans font-semibold transition-colors duration-200 ease-in-out hover:bg-gray-300 hover:text-red-600" type="submit">
                    Delete Brand
                </button>
            </div>
        </form>
    );
};

export default DeleteBrandForm;
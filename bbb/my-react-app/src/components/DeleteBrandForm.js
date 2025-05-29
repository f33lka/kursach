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
        <form onSubmit={handleSubmit}>
            <h2>Delete Brand</h2>
            <div>
                <label>Brand ID:</label>
                <input
                    type="number"
                    value={brandId}
                    onChange={(e) => setBrandId(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Delete Brand</button>
        </form>
    );
};

export default DeleteBrandForm;
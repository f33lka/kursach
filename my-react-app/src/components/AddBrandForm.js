import React, { useState } from 'react';
import { addBrand } from '../services/api';

const AddBrandForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        theme: '',
        country: '',
        features: '',
        release_date: '',
        circulation: '',
        acquisition_date: '',
        price: '',
        collectorContact: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addBrand({ formData });
            alert('Brand added successfully!');
            setFormData({
                name: '',
                theme: '',
                country: '',
                features: '',
                release_date: '',
                circulation: '',
                acquisition_date: '',
                price: '',
                collectorContact: ''
            });
        } catch (error) {
            alert(`Failed to add brand: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} class="text-black">
            <h2>Add Brand</h2>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Theme:</label>
                <input
                    type="text"
                    name="theme"
                    value={formData.theme}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Country:</label>
                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Features:</label>
                <input
                    type="text"
                    name="features"
                    value={formData.features}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Release Date:</label>
                <input
                    type="text"
                    name="release_date"
                    value={formData.release_date}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Circulation:</label>
                <input
                    type="number"
                    name="circulation"
                    value={formData.circulation}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Acquisition Date:</label>
                <input
                    type="text"
                    name="acquisition_date"
                    value={formData.acquisition_date}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                />
            </div>
            <div>
                <label>Collector Contact:</label>
                <input
                    type="text"
                    name="collectorContact"
                    value={formData.collectorContact}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Add Brand</button>
        </form>
    );
};

export default AddBrandForm;
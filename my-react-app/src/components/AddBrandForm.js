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
        <form class="w-1/4 p-2 bg-gray-200 rounded-lg text-black flex flex-col justify-between" onSubmit={handleSubmit}>
            <div>
                <h2 class="my-2 text-center text-lg font-semibold">Add Brand</h2>

                <div class="my-1 flex justify-between">
                    <label>Name:</label>

                    <input class="w-1/2 bg-gray-300 rounded-lg"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}

                        required
                    />
                </div>

                <div class="my-1 flex justify-between">
                    <label>Theme:</label>

                    <input class="w-1/2 bg-gray-300 rounded-lg"
                        type="text"
                        name="theme"
                        value={formData.theme}
                        onChange={handleChange}
                    />
                </div>

                <div class="my-1 flex justify-between">
                    <label>Country:</label>

                    <input class="w-1/2 bg-gray-300 rounded-lg"
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}

                        required
                    />
                </div>

                <div class="my-1 flex justify-between">
                    <label>Features:</label>

                    <input class="w-1/2 bg-gray-300 rounded-lg"
                        type="text"
                        name="features"
                        value={formData.features}
                        onChange={handleChange}
                    />
                </div>

                <div class="my-1 flex justify-between">
                    <label>Release Date:</label>

                    <input class="w-1/2 bg-gray-300 rounded-lg"
                        type="text"
                        name="release_date"
                        value={formData.release_date}
                        onChange={handleChange}
                    />
                </div>

                <div class="my-1 flex justify-between">
                    <label>Circulation:</label>

                    <input class="w-1/2 bg-gray-300 rounded-lg"
                        type="number"
                        name="circulation"
                        value={formData.circulation}
                        onChange={handleChange}
                    />
                </div>

                <div class="my-1 flex justify-between">
                    <label>Acquisition Date:</label>

                    <input class="w-1/2 bg-gray-300 rounded-lg"
                        type="text"
                        name="acquisition_date"
                        value={formData.acquisition_date}
                        onChange={handleChange}
                    />
                </div>

                <div class="my-1 flex justify-between">
                    <label>Price:</label>

                    <input class="w-1/2 bg-gray-300 rounded-lg"
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        step="0.01"
                    />
                </div>

                <div class="my-1 flex justify-between">
                    <label>Collector Contact:</label>

                    <input class="w-1/2 bg-gray-300 rounded-lg"
                        type="text"
                        name="collectorContact"
                        value={formData.collectorContact}
                        onChange={handleChange}

                        required
                    />
                </div>
            </div>
            
            <div class="h-1/18 flex justify-center">
                <button class="w-2/3 border-2 border-gray-300 rounded-lg font-sans font-semibold transition-colors duration-200 ease-in-out hover:bg-gray-300 hover:text-red-600" type="submit">
                    Add Brand
                </button>
            </div>
        </form>
    );
};

export default AddBrandForm;
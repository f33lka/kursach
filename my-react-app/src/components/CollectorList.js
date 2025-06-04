import React, { useEffect, useState } from 'react';
import { fetchCollectors, sortCollectorsByRareBrands, sortOwnersByCollectionValue, sortOwnersByMostExpensiveBrand } from '../services/api';

const CollectorList = () => {
    const [collectors, setCollectors] = useState([]);
    const [sortedCollectors, setSortedCollectors] = useState(null);

    useEffect(() => {
        fetchCollectors().then(response => setCollectors(response.data));
    }, []);

    const handleSortCollectors = async (endpoint) => {
        let response;

        try {
            if (endpoint === 'sort_by_rare_brands') {
                response = await sortCollectorsByRareBrands();
            } else if (endpoint === 'sort_by_collection_value') {
                response = await sortOwnersByCollectionValue();
            } else if (endpoint === 'sort_by_most_expensive_brand') {
                response = await sortOwnersByMostExpensiveBrand();
            } else {
                throw new Error('Unknown endpoint');
            }

            setSortedCollectors(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);

            setSortedCollectors({ error: error.message });
        }
    };

    return (
        <div class="w-1/4 p-2 bg-gray-200 rounded-lg text-black flex flex-col">
            <h2 class="my-2 text-center text-lg font-semibold">Collector List</h2>

            <ul class="h-4/13 overflow-auto">
                {collectors.map(collector => (
                    <li class="p-2 my-1 bg-gray-300 rounded-lg"key={collector.id}>
                        <div class="flex justify-between">
                            <span>контакт:</span> <span class="w-full mr-2 text-right">{collector.contact}</span><br />
                        </div>
                    </li>
                ))}
            </ul>

            <div class="w-full h-4/13 flex justify-center">
                <div class="w-2/3 flex flex-col justify-center">
                    <button class="my-1 h-1/5 border-2 border-gray-300 rounded-lg font-sans font-semibold transition-colors duration-200 ease-in-out hover:bg-gray-300 hover:text-red-600" onClick={() => handleSortCollectors('sort_by_rare_brands')}>
                        Sort by Rare Brands
                    </button>
                    
                    <button class="my-1 h-1/5 border-2 border-gray-300 rounded-lg font-sans font-semibold transition-colors duration-200 ease-in-out hover:bg-gray-300 hover:text-red-600" onClick={() => handleSortCollectors('sort_by_collection_value')}>
                        Sort by Collection Value
                    </button>
                    
                    <button class="my-1 h-1/5 border-2 border-gray-300 rounded-lg font-sans font-semibold transition-colors duration-200 ease-in-out hover:bg-gray-300 hover:text-red-600" onClick={() => handleSortCollectors('sort_by_most_expensive_brand')}>
                        Sort by Most Expensive Brand
                    </button>
                </div>
            </div>
            
            {sortedCollectors && (
                <div class="h-4/13 overflow-auto">
                    {typeof sortedCollectors === 'object' && !Array.isArray(sortedCollectors) && sortedCollectors.error ? (
                        <div class="flex justify-between">
                            <span>Error:</span> <span class="w-full mr-2 text-right">{sortedCollectors.error}</span><br />
                        </div>
                    ) : Array.isArray(sortedCollectors) ? (
                        <ul>
                            {sortedCollectors.map(collector => (
                                <li class="p-2 my-1 bg-gray-300 rounded-lg" key={collector.contact || collector.owner}>
                                    <div class="flex justify-between">
                                        <span>контакт:</span> <span class="w-full mr-2 text-right">{collector.contact || collector.owner}</span><br />
                                    </div>

                                    <div class="flex justify-between">
                                        <span>сумма:</span> <span class="w-full mr-2 text-right">{collector.rare_brands_count || collector.collection_value || collector.most_expensive_brand_price}</span><br />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div class="p-2 my-1 bg-gray-300 rounded-lg">
                            <div class="flex justify-between">
                                <span>контакт:</span> <span class="w-full mr-2 text-right">{sortedCollectors.contact || sortedCollectors.owner}</span><br />
                            </div>

                            <div class="flex justify-between">
                                <span>значение:</span> <span class="w-full mr-2 text-right">{sortedCollectors.rare_brands_count || sortedCollectors.collection_value || sortedCollectors.most_expensive_brand_price}</span><br />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CollectorList;
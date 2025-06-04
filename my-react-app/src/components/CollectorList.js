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
        <div className="text-black">
            <h2>Collector List</h2>

            <ul>
                {collectors.map(collector => (
                    <li key={collector.id}>{collector.contact}</li>
                ))}
            </ul>

            <button onClick={() => handleSortCollectors('sort_by_rare_brands')}>Sort by Rare Brands</button>
            
            <button onClick={() => handleSortCollectors('sort_by_collection_value')}>Sort by Collection Value</button>
            
            <button onClick={() => handleSortCollectors('sort_by_most_expensive_brand')}>Sort by Most Expensive Brand</button>
            
            {sortedCollectors && (
                <div>
                    <h3>Sorted Collectors</h3>
                    
                    {typeof sortedCollectors === 'object' && !Array.isArray(sortedCollectors) && sortedCollectors.error ? (
                        <p>Error: {sortedCollectors.error}</p>
                    ) : Array.isArray(sortedCollectors) ? (
                        <ul>
                            {sortedCollectors.map(collector => (
                                <li key={collector.contact || collector.owner}>
                                    {collector.contact || collector.owner} - {collector.rare_brands_count || collector.collection_value || collector.most_expensive_brand_price}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>{sortedCollectors.contact || sortedCollectors.owner} - {sortedCollectors.rare_brands_count || sortedCollectors.collection_value || sortedCollectors.most_expensive_brand_price}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CollectorList;
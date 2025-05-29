import React, { useEffect, useState } from 'react';
import { fetchCollectors, sortCollectorsByRareBrands, sortOwnersByCollectionValue, sortOwnersByMostExpensiveBrand } from '../services/api';

const CollectorList = () => {
    const [collectors, setCollectors] = useState([]);
    const [sortedCollectors, setSortedCollectors] = useState(null);

    useEffect(() => {
        fetchCollectors().then(response => setCollectors(response.data));
    }, []);

    const handleSortCollectors = async (endpoint) => {
        const response = await (endpoint === 'sort_by_rare_brands' ? sortCollectorsByRareBrands() : 
                                endpoint === 'sort_by_collection_value' ? sortOwnersByCollectionValue() : 
                                sortOwnersByMostExpensiveBrand());
        setSortedCollectors(response.data);
    };

    return (
        <div class="text-black">
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
                    {Array.isArray(sortedCollectors) ? (
                        <ul>
                            {sortedCollectors.map(collector => (
                                <li key={collector.contact}>{collector.contact} - {collector.collection_value}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>{sortedCollectors.contact} - {sortedCollectors.rare_brands_count}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CollectorList;
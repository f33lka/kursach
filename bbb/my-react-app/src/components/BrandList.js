import React, { useEffect, useState } from 'react';
import { fetchBrands, groupBrandsByCollector, groupRareBrandsByCollector } from '../services/api';

const BrandList = () => {
    const [brands, setBrands] = useState([]);
    const [groupedBrands, setGroupedBrands] = useState(null);

    useEffect(() => {
        fetchBrands().then(response => setBrands(response.data));
    }, []);

    const handleGroupBrands = async (endpoint) => {
        const response = await (endpoint === 'group_by_collector' ? groupBrandsByCollector() : groupRareBrandsByCollector());
        setGroupedBrands(response.data);
    };

    return (
        <div>
            <h2>Brand List</h2>
            <ul>
                {brands.map(brand => (
                    <li key={brand.id}>
                        {brand.name} - {brand.country} - ${brand.price}
                    </li>
                ))}
            </ul>
            <button onClick={() => handleGroupBrands('group_by_collector')}>Group by Collector</button>
            <button onClick={() => handleGroupBrands('group_rare_by_collector')}>Group Rare by Collector</button>
            {groupedBrands && (
                <div>
                    <h3>Grouped Brands</h3>
                    {Object.entries(groupedBrands).map(([collector, brands]) => (
                        <div key={collector}>
                            <h4>Collector: {collector}</h4>
                            <ul>
                                {brands.map(brand => (
                                    <li key={brand.id}>{brand.name} - ${brand.price}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BrandList;
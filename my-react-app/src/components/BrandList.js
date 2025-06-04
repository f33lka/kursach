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
        <div class="w-1/4 p-2 bg-gray-200 rounded-lg text-black flex flex-col">
            <h2 class="my-2 text-center text-lg font-semibold">Brand List</h2>

            <ul class="h-4/13 overflow-auto">
                {brands.map(brand => (
                    <li class="p-2 my-1 bg-gray-300 rounded-lg" key={brand.id}>
                        <div class="flex justify-between">
                            <span>имя:</span> <span class="w-full mr-2 text-right">{brand.name}</span><br />
                        </div>

                        <div class="flex justify-between">
                            <span>страна:</span> <span class="w-full mr-2 text-right">{brand.country}</span><br />
                        </div>

                        <div class="flex justify-between">
                            <span>цена:</span> <span class="w-full mr-2 text-right">{brand.price.toFixed(2)}</span><br />
                        </div>
                    </li>
                ))}
            </ul>

            <div class="w-full h-4/13 flex justify-center">
                <div class="w-2/3 flex flex-col justify-center">
                    <button class="my-1 h-1/5 border-2 border-gray-300 rounded-lg font-sans font-semibold transition-colors duration-200 ease-in-out hover:bg-gray-300 hover:text-red-600" onClick={() => handleGroupBrands('group_by_collector')}>
                        Group by Collector
                    </button>
                    
                    <button class="my-1 h-1/5 border-2 border-gray-300 rounded-lg font-sans font-semibold transition-colors duration-200 ease-in-out hover:bg-gray-300 hover:text-red-600" onClick={() => handleGroupBrands('group_rare_by_collector')}>
                        Group Rare by Collector
                    </button>                    
                </div>
            </div>
            
            {groupedBrands && (
                <div class="h-4/13 overflow-auto">
                    {Object.entries(groupedBrands).map(([collector, brands]) => (
                        <div class="p-2 my-1 bg-gray-300 rounded-lg" key={collector}>
                            <h4 class="text-center font-sans font-semibold">Collector: {collector}</h4>
                            
                            <ul>
                                {brands.map(brand => (
                                    <li key={brand.id}>
                                        <div class="flex justify-between">
                                            <span>имя:</span> <span class="w-full mr-2 text-right">{brand.name}</span><br />
                                        </div>

                                        <div class="flex justify-between">
                                            <span>цена:</span> <span class="w-full mr-2 text-right">{brand.price}</span><br />
                                        </div>
                                    </li>
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
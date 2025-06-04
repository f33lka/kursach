import React, { useEffect, useState } from 'react';
import { fetchCollections, groupCollectionsByOwner } from '../services/api';

const CollectionList = () => {
    const [collections, setCollections] = useState([]);
    const [groupedCollections, setGroupedCollections] = useState(null);

    useEffect(() => {
        fetchCollections().then(response => setCollections(response.data));
    }, []);

    const handleGroupCollections = async () => {
        const response = await groupCollectionsByOwner();

        setGroupedCollections(response.data);
    };

    return (
        <div class="w-1/4 p-2 bg-gray-200 rounded-lg text-black flex flex-col">
            <h2 class="my-2 text-center text-lg font-semibold">Collection List</h2>

            <ul class="h-4/13 overflow-auto">
                {collections.map(collection => (
                    <li class="p-2 my-1 bg-gray-300 rounded-lg" key={collection.id}>
                        <div class="flex justify-between">
                            <span>владелец:</span> <span class="w-full mr-2 text-right">{collection.owner}</span><br />
                        </div>
                    </li>
                ))}
            </ul>

            <div class="w-full h-4/13 flex justify-center">
                <div class="w-2/3 flex flex-col justify-center">
                    <button class="my-1 h-1/5 border-2 border-gray-300 rounded-lg font-sans font-semibold transition-colors duration-200 ease-in-out hover:bg-gray-300 hover:text-red-600" onClick={handleGroupCollections}>
                        Group by Owner
                    </button>
                </div>
            </div>

            {groupedCollections && (
                <div class="h-4/13 overflow-auto">
                    {Object.entries(groupedCollections).map(([owner, collections]) => (
                        <div class="p-2 my-1 bg-gray-300 rounded-lg" key={owner}>
                            <h4 class="text-center font-sans font-semibold">Owner: {owner}</h4>
                            
                            <ul>
                                {collections.map(collection => (
                                    <li key={collection.id}>
                                        <div class="flex justify-between">
                                            <span>владелец:</span> <span class="w-full mr-2 text-right">{collection.owner}</span><br />
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

export default CollectionList;
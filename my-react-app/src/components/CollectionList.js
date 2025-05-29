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
        <div class="text-black">
            <h2>Collection List</h2>
            <ul>
                {collections.map(collection => (
                    <li key={collection.id}>{collection.owner}</li>
                ))}
            </ul>
            <button onClick={handleGroupCollections}>Group by Owner</button>
            {groupedCollections && (
                <div>
                    <h3>Grouped Collections</h3>
                    {Object.entries(groupedCollections).map(([owner, collections]) => (
                        <div key={owner}>
                            <h4>Owner: {owner}</h4>
                            <ul>
                                {collections.map(collection => (
                                    <li key={collection.id}>{collection.owner}</li>
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
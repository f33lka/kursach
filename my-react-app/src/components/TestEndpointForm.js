import React, { useState, useEffect } from 'react';
import {
    fetchBrands,
    groupBrandsByCollector,
    groupRareBrandsByCollector,
    fetchCollections,
    groupCollectionsByOwner,
    fetchCollectors,
    sortCollectorsByRareBrands,
    sortOwnersByCollectionValue,
    sortOwnersByMostExpensiveBrand
} from '../services/api';

const TestEndpointForm = () => {
    const [testResults, setTestResults] = useState([]);

    const runAllTests = async () => {
        const endpoints = [
            { name: 'Fetch Brands', func: fetchBrands },
            { name: 'Group Brands by Collector', func: groupBrandsByCollector },
            { name: 'Group Rare Brands by Collector', func: groupRareBrandsByCollector },
            { name: 'Fetch Collections', func: fetchCollections },
            { name: 'Group Collections by Owner', func: groupCollectionsByOwner },
            { name: 'Fetch Collectors', func: fetchCollectors },
            { name: 'Sort Collectors by Rare Brands', func: sortCollectorsByRareBrands },
            { name: 'Sort Owners by Collection Value', func: sortOwnersByCollectionValue },
            { name: 'Sort Owners by Most Expensive Brand', func: sortOwnersByMostExpensiveBrand }
        ];

        const results = [];

        for (const endpoint of endpoints) {
            try {
                const response = await endpoint.func();

                results.push({ name: endpoint.name, status: 'Success', data: response.data });
            } catch (error) {
                results.push({ name: endpoint.name, status: 'Failed', error: error.message });
            }
        }

        setTestResults(results);
    };

    useEffect(() => {
        setTestResults([]);
    }, []);

    return (
        <div className="text-black">
            <h2>Test All Endpoints</h2>

            <button onClick={runAllTests}>Run Tests</button>

            <div className="mt-4">
                <h3>Test Results</h3>

                <ul>
                    {testResults.map((result, index) => (
                        <li key={index}>
                            <strong>{result.name}:</strong> {result.status === 'Success' ? 'Success' : `Failed - ${result.error}`}

                            {result.status === 'Success' && (
                                <div>
                                    <strong>Data:</strong>
                                    
                                    <pre>{JSON.stringify(result.data, null, 2)}</pre>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TestEndpointForm;
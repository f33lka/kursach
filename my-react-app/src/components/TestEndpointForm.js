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
        <div class="w-1/4 p-2 bg-gray-200 rounded-lg text-black flex flex-col">
            <h2 class="my-2 text-center text-lg font-semibold">Test All Endpoints</h2>

            <div class="w-full h-4/65 flex justify-center">
                <button class="my-1 w-2/3 border-2 border-gray-300 rounded-lg font-sans font-semibold transition-colors duration-200 ease-in-out hover:bg-gray-300 hover:text-red-600" onClick={runAllTests}>
                    Run Tests
                </button>
            </div>

            <div className="mt-4 h-12/13 overflow-auto">
                <ul>
                    {testResults.map((result, index) => (
                        <li class="p-2 my-1 bg-gray-300 rounded-lg" key={index}>
                            <div class="flex justify-between">
                                <strong>{result.name}:</strong> <strong class="w-full mr-2 text-right">{result.status === 'Success' ? 'Success' : `Failed - ${result.error}`}</strong><br />
                            </div>

                            {result.status === 'Success' && (
                                <div>
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
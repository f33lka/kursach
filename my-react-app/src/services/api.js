import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';

export const fetchBrands = () => axios.get(`${API_URL}/brands`);
export const addBrand = (brandData) => axios.post(`${API_URL}/brands`, brandData);
export const deleteBrand = (brandId) => axios.delete(`${API_URL}/brands/${brandId}`);
export const groupBrandsByCollector = () => axios.get(`${API_URL}/brands/group_by_collector`);
export const groupRareBrandsByCollector = () => axios.get(`${API_URL}/brands/group_rare_by_collector`);
export const fetchCollections = () => axios.get(`${API_URL}/collections`);
export const addCollection = (collectionData) => axios.post(`${API_URL}/collections`, collectionData);
export const deleteCollection = (collectionId) => axios.delete(`${API_URL}/collections/${collectionId}`);
export const groupCollectionsByOwner = () => axios.get(`${API_URL}/collections/group_by_owner`);
export const fetchCollectors = () => axios.get(`${API_URL}/collectors`);
export const addCollector = (collectorData) => axios.post(`${API_URL}/collectors`, collectorData);
export const deleteCollector = (collectorId) => axios.delete(`${API_URL}/collectors/${collectorId}`);
export const sortCollectorsByRareBrands = () => axios.get(`${API_URL}/collectors/sort_by_rare_brands`);
export const sortOwnersByCollectionValue = () => axios.get(`${API_URL}/owners/sort_by_collection_value`);
export const sortOwnersByMostExpensiveBrand = () => axios.get(`${API_URL}/owners/sort_by_most_expensive_brand`);
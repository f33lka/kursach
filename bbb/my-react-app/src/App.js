import React from 'react';
import './App.css';
import BrandList from './components/BrandList';
import CollectionList from './components/CollectionList';
import CollectorList from './components/CollectorList';
import AddBrandForm from './components/AddBrandForm';
import AddCollectionForm from './components/AddCollectionForm';
import AddCollectorForm from './components/AddCollectorForm';
import DeleteBrandForm from './components/DeleteBrandForm';
import DeleteCollectionForm from './components/DeleteCollectionForm';
import DeleteCollectorForm from './components/DeleteCollectorForm';

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>API Client</h1>
            </header>
            <main className="App-main">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h2>Brand Management</h2>
                            <BrandList />
                            <AddBrandForm />
                            <DeleteBrandForm />
                        </div>
                        <div className="col-md-4">
                            <h2>Collection Management</h2>
                            <CollectionList />
                            <AddCollectionForm />
                            <DeleteCollectionForm />
                        </div>
                        <div className="col-md-4">
                            <h2>Collector Management</h2>
                            <CollectorList />
                            <AddCollectorForm />
                            <DeleteCollectorForm />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
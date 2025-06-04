import React, { useState } from 'react';
import BrandList from './components/BrandList';
import CollectionList from './components/CollectionList';
import CollectorList from './components/CollectorList';
import AddBrandForm from './components/AddBrandForm';
import AddCollectionForm from './components/AddCollectionForm';
import AddCollectorForm from './components/AddCollectorForm';
import DeleteBrandForm from './components/DeleteBrandForm';
import DeleteCollectionForm from './components/DeleteCollectionForm';
import DeleteCollectorForm from './components/DeleteCollectorForm';
import TestEndpointForm from './components/TestEndpointForm'; // Импортируем новый компонент

const App = () => {
    const [activeWindow, setActiveWindow] = useState(null);

    const toggleWindow = (windowId) => {
        setActiveWindow(activeWindow === windowId ? null : windowId);
    };

    return (
        <div class="cursor-crosshair w-screen h-screen bg-gradient-to-b from-white via-blue-800 to-red-800 flex justify-center">
            <div class="w-5/12">
                <div class="absolute inset-x-0 top-0 z-10 w-screen h-14 flex justify-between">
                    <div class="w-1/11 flex justify-around">
                        <div class="animate-spin mt-1 w-12 h-12 bg-gradient-to-b from-white via-blue-800 to-red-800 rounded-full">

                        </div>

                        <div class="flex flex-col justify-center">
                            <div class="font-sans font-semibold text-red-600 text-xl">
                                КУРСАЧ
                            </div>
                        </div>
                    </div>

                    <div class="w-7/12 flex justify-end text-center font-sans font-semibold">
                        <div class="w-1/10 flex justify-center">
                            <button class="mt-2 w-10/12 h-10 rounded-lg transition-colors duration-200 ease-in-out hover:bg-gray-300 hover:text-red-600" onClick={() => toggleWindow(1)}>
                                марки
                            </button>
                        </div>

                        <div class="w-1/8 flex justify-center">
                            <button class="mt-2 w-10/12 h-10 rounded-lg transition-colors duration-200 ease-in-out hover:bg-gray-300 hover:text-red-600" onClick={() => toggleWindow(2)}>
                                коллекции
                            </button>
                        </div>

                        <div class="w-1/6 flex justify-center">
                            <button class="mt-2 w-10/12 h-10 rounded-lg transition-colors duration-200 ease-in-out hover:bg-gray-300 hover:text-red-600" onClick={() => toggleWindow(3)}>
                                коллекционеры
                            </button>
                        </div>

                        <div class="w-1/6 flex justify-center">
                            <button class="mt-2 w-10/12 h-10 rounded-lg transition-colors duration-200 ease-in-out hover:bg-gray-300 hover:text-red-600" onClick={() => toggleWindow(4)}>
                                тесты
                            </button>
                        </div>
                    </div>
                </div>

                {activeWindow === 1 && (
                    <div>
                        <div class="absolute inset-x-0 top- w-screen h-screen bg-gradient-to-b from-white via-blue-800 to-red-800">
                        
                        </div>

                        <div class="absolute inset-x-0 top-0 h-screen flex justify-center">
                            <div class="w-9/12">
                                <div class="mt-30 w-full h-1/7 font-serif text-gray-800 text-7xl text-center font-semibold tracking-widest">
                                    марки
                                </div>

                                <div class="h-8/12 bg-gray-300 rounded-lg flex flex-col justify-center">        
                                    <div class="h-11/12 flex justify-around">
                                        <BrandList />
                                        <AddBrandForm />
                                        <DeleteBrandForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeWindow === 2 && (
                    <div>
                        <div class="absolute inset-x-0 top- w-screen h-screen bg-gradient-to-b from-white via-blue-800 to-red-800">
                        
                        </div>

                        <div class="absolute inset-x-0 top-0 h-screen flex justify-center">
                            <div class="w-9/12">
                                <div class="mt-30 w-full h-1/7 font-serif text-gray-800 text-7xl text-center font-semibold tracking-widest">
                                    коллекции
                                </div>

                                <div class="h-8/12 bg-gray-300 rounded-lg flex flex-col justify-center">        
                                    <div class="h-11/12 flex justify-around">                       
                                        <CollectionList />
                                        <AddCollectionForm />
                                        <DeleteCollectionForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeWindow === 3 && (
                    <div>
                        <div class="absolute inset-x-0 top- w-screen h-screen bg-gradient-to-b from-white via-blue-800 to-red-800">
                        
                        </div>

                        <div class="absolute inset-x-0 top-0 h-screen flex justify-center">
                            <div class="w-9/12">
                                <div class="mt-30 w-full h-1/7 font-serif text-gray-800 text-7xl text-center font-semibold tracking-widest">
                                    коллекционеры
                                </div>

                                <div class="h-8/12 bg-gray-300 rounded-lg flex flex-col justify-center">        
                                    <div class="h-11/12 flex justify-around">                     
                                        <CollectorList />
                                        <AddCollectorForm />
                                        <DeleteCollectorForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeWindow === 4 && (
                    <div>
                        <div class="absolute inset-x-0 top- w-screen h-screen bg-gradient-to-b from-white via-blue-800 to-red-800">
                        
                        </div>

                        <div class="absolute inset-x-0 top-0 h-screen flex justify-center">
                            <div class="w-9/12">
                                <div class="mt-30 w-full h-1/7 font-serif text-gray-800 text-7xl text-center font-semibold tracking-widest">
                                    тесты
                                </div>

                                <div class="h-8/12 bg-gray-300 rounded-lg flex flex-col justify-center">        
                                    <div class="h-11/12 flex justify-around overflow-auto">                     
                                        <TestEndpointForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div class="mt-30 w-full h-1/7 font-serif text-gray-800 text-7xl text-center font-semibold tracking-widest">
                    курсач
                </div>
                
                <div class="h-7/12 text-black italic tracking-wide font-serif text-2xl text-center">
                    Каждая курсовая работа предоставляет студенту возможность углубиться в конкретную тему, изучить ее с разных сторон и выработать собственное понимание. Это не просто повторение лекционного материала, а самостоятельное исследование, которое позволяет студенту научиться работать с источниками, проводить анализ и делать выводы. Такой подход способствует развитию критического мышления, умения самостоятельно формулировать вопросы и находить на них ответы. В заключение можно сказать, что курсовые работы — это не просто задание, которое нужно выполнить для получения оценки. Это важный инструмент, который позволяет студентам углубить свои знания, развить свои способности и подготовиться к будущей профессиональной деятельности. Они помогают студентам стать более уверенными в своих знаниях, научиться самостоятельно работать с информацией и применять свои умения на практике.
                </div>
            </div>
        </div>
    );
};

export default App;
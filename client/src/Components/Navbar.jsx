import React, { useState } from 'react';
import AddTaskModal from '../Modals/AddTaskModal';
 
function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
 
    const openModal = () => {
        setIsModalOpen(true);
    };
 
    const closeModal = () => {
        setIsModalOpen(false);
    };
 
    return (
        <nav className="bg-gray-800 py-4">
            <div className="max-w-7xl mx-auto px-4 flex
             justify-between items-center">
                <div>
                    <span className="text-white text-lg
                     font-bold">Task Manager</span>
                </div>
 
                <div>
                    <button className="bg-blue-500 hover:bg-blue-600
                     text-white font-bold py-2 px-4 rounded"
                        onClick={openModal}>
                        Add
                    </button>
                </div>
            </div>
            <AddTaskModal isOpen={isModalOpen} closeModal={closeModal} />
        </nav>
    );
}
 
export default Navbar;
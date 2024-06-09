//src/Modals/DeleteModal.jsx

import React from 'react';
import { useTaskContext } from '../Context/TaskContext';

function DeleteModal({ isOpen, closeModal, taskId }) {
	const { deleteTask } = useTaskContext();

	const handleDelete = () => {
		deleteTask(taskId);
		closeModal();
	};

	return (
		<div className={`modal ${isOpen ? 'block' : 'hidden'}
		fixed inset-0 z-10 overflow-y-auto`}
			style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
			<div className="modal-container bg-white w-full
			md:w-1/3 mx-auto mt-20 p-6 rounded shadow-lg">
				<div className="modal-header flex justify-between
				items-center">
					<h3 className="text-lg font-semibold">Confirm Delete</h3>
					<button className="text-gray-500 hover:text-gray-800"
						onClick={closeModal}>X</button>
				</div>
				<div className="modal-body mt-4">
					<p>Are you sure you want to delete this task?</p>
					<div className="flex justify-end mt-4">
						<button className="bg-red-500 hover:bg-red-600
						text-white font-bold py-2 px-4 rounded mr-2"
							onClick={handleDelete}>Delete</button>
						<button className="bg-gray-300 hover:bg-gray-400
						text-gray-800 font-bold py-2 px-4 rounded"
							onClick={closeModal}>Cancel</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DeleteModal;

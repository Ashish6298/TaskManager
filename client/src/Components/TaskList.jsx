//src/Components/TaskList.jsx

import React, { useState } from 'react';
import { useTaskContext } from '../Context/TaskContext';
import DeleteModal from '../Modals/DeleteModal';
import EditModal from '../Modals/EditModal';

function TaskList() {
	const { filteredTasks, updateTaskStatus } = useTaskContext();
	const [taskId, setTaskId] = useState('');
	const [taskTitle, setTaskTitle] = useState('');
	const [taskDescription, setTaskDescription] = useState('');
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [openDropdownId, setOpenDropdownId] = useState(null);

	const handleDelete = (taskId) => {
		setTaskId(taskId);
		setIsDeleteModalOpen(true);
		setOpenDropdownId(null);
	};

	const handleEdit = (taskId, taskTitle, taskDescription) => {
		setTaskId(taskId);
		setTaskTitle(taskTitle);
		setTaskDescription(taskDescription);
		setIsEditModalOpen(true);
		setOpenDropdownId(null);
	};

	const handleComplete = (taskId) => {
		updateTaskStatus(taskId, 'completed');
		setOpenDropdownId(null);
	};

	const toggleDropdown = (taskId) => {
		setOpenDropdownId(openDropdownId === taskId ? null : taskId);
	};

	const isDropdownOpen = (taskId) => {
		return openDropdownId === taskId;
	};

	const getStatusColor = (status) => {
		switch (status) {
			case 'todo':
				return 'bg-yellow-200';
			case 'completed':
				return 'bg-green-200';
			default:
				return 'bg-gray-200';
		}
	};

	return (
		<div className="my-8 grid gap-4 grid-cols-1 sm:grid-cols-2
		md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
			{filteredTasks.map(task => (
				<div key={task._id} className=
					{`relative rounded-md shadow-md
					${getStatusColor(task.status)}`}>
					<div className="p-4">
						<div className="flex justify-between items-center mb-2">
							<h3 className="text-lg font-semibold">
								{task.title}
							</h3>
							<button onClick={() => toggleDropdown(task._id)}
								className="text-gray-500 hover:text-gray-700">
								<svg className="w-6 h-6" fill="none"
									viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2} 
										d="M4 6h16M4 12h16M4 18h16" />
								</svg>
							</button>
						</div>
						<p className="text-sm text-gray-600 mb-4">
							{task.description}</p>
					</div>
					{isDropdownOpen(task._id) && (
						<div className="absolute top-full right-0 mt-2 w-48
						bg-white border rounded-md shadow-md z-10">
							<button className="block w-full py-2 px-4
							text-left hover:bg-gray-100" onClick={() =>
									handleEdit(task._id, task.title,
											task.description)}>
								Edit</button>
							<button className="block w-full py-2 px-4
							text-left text-red-600 hover:bg-red-100"
								onClick={() => handleDelete(task._id)}>
								Delete</button>
							{task.status !== 'completed' && (
								<button className="block w-full py-2 px-4
													text-left hover:bg-gray-100"
										onClick={() =>
										handleComplete(task._id)}>
										Mark as Completed
								</button>
							)}
						</div>
					)}
				</div>
			))}
			<DeleteModal isOpen={isDeleteModalOpen}
				closeModal={() => setIsDeleteModalOpen(false)}
				taskId={taskId} />
			<EditModal isOpen={isEditModalOpen}
				closeModal={() => setIsEditModalOpen(false)} taskId={taskId}
				initialTitle={taskTitle} initialDescription={taskDescription} />
		</div>
	);
}

export default TaskList;

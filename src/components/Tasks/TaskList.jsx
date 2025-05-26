/**
 * TaskList Component
 * 
 * Provides a drag-and-drop task management interface with the following features:
 * - Add new tasks
 * - Toggle task completion
 * - Remove tasks
 * - Reorder tasks via drag and drop
 * - Persists changes to storage
 * - Integrates with notifications for task actions
 */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
    selectAllTasks,
    addTaskWithNotification,
    toggleTaskWithNotification,
    removeTaskWithNotification,
    reorderTasks
} from '../../features/tasks/tasksSlice';

const DragHandle = () => (
  <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24">
    <rect x="6" y="7" width="12" height="2.2" rx="1" fill="currentColor"/>
    <rect x="6" y="11" width="12" height="2.2" rx="1" fill="currentColor"/>
    <rect x="6" y="15" width="12" height="2.2" rx="1" fill="currentColor"/>
  </svg>
);

const CustomCheckbox = ({ checked, onChange }) => (
  <span className="inline-flex items-center justify-center">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="appearance-none h-6 w-6 border-2 border-blue-500 bg-white checked:bg-blue-500 checked:border-blue-500 focus:ring-0 cursor-pointer"
      style={{ borderRadius: 0 }}
    />
    {checked && (
      <svg className="absolute w-4 h-4 text-white pointer-events-none" viewBox="0 0 20 20" fill="none">
        <polyline points="5 11 9 15 15 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </span>
);

const DEFAULT_TASKS = [
  { id: '1', text: 'Finish report', completed: true },
  { id: '2', text: 'Email client', completed: false },
  { id: '3', text: 'Update website', completed: false },
  { id: '4', text: 'Draft presentation', completed: false },
];

/**
 * SortableTask Component
 * Individual task item that can be dragged and sorted
 * 
 * @param {Object} props
 * @param {number} props.id - Task ID
 * @param {string} props.text - Task text
 * @param {boolean} props.completed - Task completion status
 * @param {Function} props.onToggle - Callback for toggling completion
 */
const SortableTask = ({ id, text, completed, onToggle, isLast }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={`flex items-center h-14 px-4 ${!isLast ? 'border-b border-gray-200' : ''}`}
        >
            <CustomCheckbox checked={completed} onChange={() => onToggle(id, text)} />
            <span className="ml-4 text-lg font-semibold text-gray-900 select-none flex-1">{text}</span>
            <span {...listeners} className="cursor-grab ml-4 flex items-center">
              <DragHandle />
            </span>
        </li>
    );
};

export default function TaskList() {
    const tasksFromStore = useSelector(selectAllTasks);
    const tasks = tasksFromStore && tasksFromStore.length > 0 ? tasksFromStore : DEFAULT_TASKS;
    const dispatch = useDispatch();

    // Configure DnD sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    /**
     * Handles drag end event to reorder tasks
     * @param {Object} event - DnD event object
     */
    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = tasks.findIndex((task) => task.id === active.id);
            const newIndex = tasks.findIndex((task) => task.id === over.id);

            dispatch(reorderTasks({
                sourceIndex: oldIndex,
                destinationIndex: newIndex
            }));
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-6">Tasks</h2>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={tasks.map(task => task.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <ul>
                        {tasks.map((task, idx) => (
                            <SortableTask
                                key={task.id}
                                id={task.id}
                                text={task.text}
                                completed={task.completed}
                                onToggle={(id, text) => dispatch(toggleTaskWithNotification(id, text))}
                                isLast={idx === tasks.length - 1}
                            />
                        ))}
                    </ul>
                </SortableContext>
            </DndContext>
        </div>
    );
}

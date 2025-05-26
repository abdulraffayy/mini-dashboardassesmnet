import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TaskList from '../components/Tasks/TaskList';
import tasksSlice from '../features/tasks/tasksSlice';
import notificationsSlice from '../features/notifications/notificationSlice';

// Mock DnD functionality
jest.mock('@dnd-kit/core', () => ({
    ...jest.requireActual('@dnd-kit/core'),
    DndContext: ({ children }) => children,
    useSensor: () => null,
    useSensors: () => null,
}));

jest.mock('@dnd-kit/sortable', () => ({
    ...jest.requireActual('@dnd-kit/sortable'),
    SortableContext: ({ children }) => children,
    useSortable: () => ({
        attributes: {},
        listeners: {},
        setNodeRef: () => { },
        transform: null,
        transition: null,
    }),
}));

describe('TaskList', () => {
    const createStore = (initialState = {}) => {
        return configureStore({
            reducer: {
                tasks: tasksSlice,
                notifications: notificationsSlice
            },
            preloadedState: {
                tasks: {
                    tasks: initialState.tasks || []
                },
                notifications: {
                    items: initialState.notifications || []
                }
            }
        });
    };

    const renderWithStore = (
        ui,
        { initialState = {}, store = createStore(initialState) } = {}
    ) => {
        return {
            ...render(<Provider store={store}>{ui}</Provider>),
            store,
        };
    };

    test('toggles task completion', async () => {
        const initialState = {
            tasks: [
                { id: '1', text: 'Finish report', completed: false }
            ]
        };
        renderWithStore(<TaskList />, { initialState });
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
        await userEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    });

    test('matches snapshot', () => {
        const initialState = {
            tasks: [
                { id: '1', text: 'Finish report', completed: true },
                { id: '2', text: 'Email client', completed: false }
            ]
        };
        const { container } = renderWithStore(<TaskList />, { initialState });
        expect(container).toMatchSnapshot();
    });
});

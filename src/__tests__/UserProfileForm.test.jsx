import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserProfileForm from '../components/Profile/UserProfileForm';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../features/profile/profileSlice';

function renderWithProvider(ui) {
    const store = configureStore({ reducer: { profile: profileReducer } });
    return render(<Provider store={store}>{ui}</Provider>);
}

describe('UserProfileForm', () => {
    test('allows user to fill and submit firstName and lastName', async () => {
        renderWithProvider(<UserProfileForm />);
        const firstNameInput = screen.getByPlaceholderText(/first name/i);
        const lastNameInput = screen.getByPlaceholderText(/last name/i);
        await userEvent.clear(firstNameInput);
        await userEvent.type(firstNameInput, 'Alice');
        await userEvent.clear(lastNameInput);
        await userEvent.type(lastNameInput, 'Johnson');
        expect(firstNameInput).toHaveValue('Alice');
        expect(lastNameInput).toHaveValue('Johnson');
        await userEvent.click(screen.getByRole('button', { name: /save/i }));
        // No error means submit was triggered
    });
});

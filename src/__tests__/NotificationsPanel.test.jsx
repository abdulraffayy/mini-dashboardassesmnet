import React from 'react';
import { render } from '@testing-library/react';
import NotificationsPanel from '../components/Notifications/NotificationsPanel';

describe('NotificationsPanel', () => {
    test('matches snapshot', () => {
        const sampleNotifications = [
            { id: 1, type: 'comment', text: 'New comment', timestamp: new Date().toISOString() }
        ];
        const { container } = render(<NotificationsPanel notifications={sampleNotifications} />);
        expect(container).toMatchSnapshot();
    });
});

import { render } from '@testing-library/react';
import DashboardCard from '../components/Dashboard/DashboardCard';
import { FaUsers } from 'react-icons/fa';

describe('DashboardCard', () => {
    const mockProps = {
        title: "Users",
        value: "1024",
        icon: <FaUsers />,
        bgColor: "bg-blue-600"
    };

    test('matches snapshot', () => {
        const { container } = render(<DashboardCard {...mockProps} />);
        expect(container).toMatchSnapshot();
    });
});

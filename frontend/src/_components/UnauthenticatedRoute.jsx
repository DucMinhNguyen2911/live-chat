import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { history } from '../_helpers';

export { UnauthenticatedRoute };

function UnauthenticatedRoute({ children }) {
    const { user: authUser } = useSelector((x) => x.auth);

    if (authUser) {
        // logged in so redirect to previous page
        return <Navigate to="/" state={{ from: history.location }} />;
    }

    // unauthorized so return child components
    return children;
}

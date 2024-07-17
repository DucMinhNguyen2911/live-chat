import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { history } from '../_helpers';
import { addNotification } from '../_store';

export { AuthenticatedRoute };

function AuthenticatedRoute({ children }) {
    const { user: authUser } = useSelector((x) => x.auth);
    const dispatch = useDispatch();
    if (!authUser) {
        dispatch(
            addNotification({
                message: 'Unauthorized',
                notificationType: 'error',
            })
        );
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" state={{ from: history.location }} />;
    }

    // authorized so return child components
    return children;
}

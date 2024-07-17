import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { history } from '../_helpers';

export { UserLevelRequiredRoute };

function UserLevelRequiredRoute({ children , userLevelRequired }) {
    const { user: authUser } = useSelector((x) => x.auth);

    if (authUser.userLevel < userLevelRequired) {
        return <Navigate to="/" state={{ from: history.location }} />;
    }

    return children;
}

import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { history } from './history';
export {HistoryWrapper};
function HistoryWrapper({ children })
{
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        history.navigate = navigate;
        history.location = location;
    }, [navigate, location]);

    return children;
};



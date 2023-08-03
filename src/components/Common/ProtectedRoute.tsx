import * as React from 'react'
import { useSession } from '../../providers/Auth'
import { Navigate, Outlet } from 'react-router-dom';

interface IAppProps {
    children?: React.ReactNode
}

const ProtectedRoute: React.FC<IAppProps> = ({ children }) => {

    const { session } = useSession();

    if (!session) {
        return <Navigate to='/' replace />
    }

    return children ?? <Outlet />
}

export default ProtectedRoute;
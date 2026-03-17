import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, role }) {
    const { user, loading } = useAuth();

    if (loading) return null; // Attendre que l'auth soit vérifiée

    if (!user || (role && user.role !== role)) {
        return <Navigate to="/" />; // Redirige si pas admin
    }

    return children;
}
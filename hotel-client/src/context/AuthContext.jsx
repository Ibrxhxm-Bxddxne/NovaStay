import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 1. Récupérer l'utilisateur au chargement
    const getUser = async () => {
        try {
            // Puisque la baseURL a déjà /api, on met juste /user
            const res = await api.get('/user'); 
            setUser(res.data);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // 2. Fonction de Login
    const login = async (email, password) => {
        try {
            // On demande le cookie (on sort du préfixe /api avec ../)
            await api.get('../sanctum/csrf-cookie'); 

            // L'appel devient http://localhost:8000/api/login
            const response = await api.post('/login', { email, password });
            
            setUser(response.data.user);
            navigate('/'); 
        } catch (err) {
            console.error("Erreur login:", err.response?.data);
            throw err.response?.data || err;
        }
    };

    // 3. Fonction d'Inscription
    const register = async (formData) => {
        try {
            await api.get('../sanctum/csrf-cookie'); 
            
            const response = await api.post('/register', formData);
            setUser(response.data.user);
            navigate('/'); // Ajouté pour rediriger après inscription
            return response.data;
        } catch (err) {
            console.error("Erreur register:", err.response?.data);
            throw err.response?.data || err;
        }
    };

    // 4. Déconnexion
    const logout = async () => {
        try {
            await api.post('/logout');
            setUser(null);
            navigate('/login');
        } catch (err) {
            console.error("Erreur logout:", err);
            setUser(null);
            navigate('/login');
        }
    };

    useEffect(() => { getUser(); }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children} 
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
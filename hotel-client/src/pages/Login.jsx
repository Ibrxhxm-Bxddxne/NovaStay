import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (err) {
            setErrors(err.errors || {});
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-8 border border-white/10 bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Connexion</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input 
                        type="email" placeholder="Email" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-blue-500 transition-all"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email[0]}</p>}
                </div>
                <div>
                    <input 
                        type="password" placeholder="Mot de passe" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-blue-500 transition-all"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-transform">
                    Se connecter
                </button>
            </form>
            <p className="mt-6 text-sm text-slate-400">Pas de compte ? <Link to="/register" className="text-blue-400">Créer une identité</Link></p>
        </div>
    );
}
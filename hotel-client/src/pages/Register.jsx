import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Register() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", password_confirmation: "" });
    const { register } = useAuth();
    
    // États pour le feedback
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ type: "", message: "" }); // 'success' ou 'error'
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validation du format Email via Regex
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setStatus({ type: "", message: "" });

        // 1. Validation Client (Champs vides)
        let localErrors = {};
        if (!formData.name) localErrors.name = ["Le nom est requis"];
        if (!formData.email) {
            localErrors.email = ["L'email est requis"];
        } else if (!validateEmail(formData.email)) {
            localErrors.email = ["Le format de l'email est invalide"];
        }
        if (formData.password.length < 8) localErrors.password = ["Le mot de passe doit faire au moins 8 caractères"];
        if (formData.password !== formData.password_confirmation) {
            localErrors.password_confirmation = ["Les mots de passe ne correspondent pas"];
        }

        if (Object.keys(localErrors).length > 0) {
            setErrors(localErrors);
            setStatus({ type: "error", message: "Veuillez corriger les erreurs ci-dessous." });
            return;
        }

        // 2. Envoi au serveur
        setIsSubmitting(true);
        try {
            await register(formData);
            setStatus({ type: "success", message: "Compte créé avec succès ! Redirection..." });
        } catch (err) {
            // 3. Gestion des erreurs Serveur (ex: Email déjà utilisé)
            if (err.errors) {
                setErrors(err.errors);
                setStatus({ type: "error", message: "Échec de l'inscription. Vérifiez les champs." });
            } else {
                setStatus({ type: "error", message: "Le serveur ne répond pas. Réessayez plus tard." });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-8 border border-white/10 bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl relative overflow-hidden">
            
            <h2 className="text-3xl font-bold mb-6 text-white text-center">Inscription Neo-Hotel</h2>

            {/* Message de Status Global */}
            {status.message && (
                <div className={`mb-6 p-4 rounded-xl text-sm font-bold text-center animate-fade-in ${
                    status.type === "success" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}>
                    {status.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Champ Nom */}
                <div>
                    <label className="text-xs text-slate-400 uppercase ml-2">Nom complet</label>
                    <input 
                        type="text" 
                        className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-white outline-none focus:border-emerald-500 transition-all`}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    {errors.name && <p className="text-red-400 text-[10px] mt-1 ml-2">{errors.name[0]}</p>}
                </div>

                {/* Champ Email */}
                <div>
                    <label className="text-xs text-slate-400 uppercase ml-2">Email</label>
                    <input 
                        type="email" 
                        className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-white outline-none focus:border-emerald-500 transition-all`}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    {errors.email && <p className="text-red-400 text-[10px] mt-1 ml-2">{errors.email[0]}</p>}
                </div>

                {/* Champ Password */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-slate-400 uppercase ml-2">Mot de passe</label>
                        <input 
                            type="password" 
                            className={`w-full bg-white/5 border ${errors.password ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-white outline-none focus:border-emerald-500 transition-all`}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="text-xs text-slate-400 uppercase ml-2">Confirmation</label>
                        <input 
                            type="password" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-emerald-500 transition-all"
                            onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                        />
                    </div>
                </div>
                {errors.password && <p className="text-red-400 text-[10px] mt-1 ml-2">{errors.password[0]}</p>}

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl font-black text-white shadow-xl shadow-emerald-900/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                >
                    {isSubmitting ? "TRAITEMENT EN COURS..." : "CRÉER MON COMPTE"}
                </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
                Déjà membre ? <Link to="/login" className="text-emerald-400 hover:underline">Se connecter</Link>
            </p>
        </div>
    );
}
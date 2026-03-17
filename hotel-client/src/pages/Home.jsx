import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Home() {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/hotels')
            .then(res => {
                setHotels(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erreur API:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                    Destinations Futures
                </h1>
                <p className="text-slate-400 mt-4 text-lg">Choisissez votre sanctuaire parmi nos complexes technologiques.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hotels.map((hotel) => (
                    <div 
                        key={hotel.id} 
                        className="group relative border border-white/10 bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/20 hover:-translate-y-2"
                    >
                        {/* Image Section */}
                        <div className="relative h-56 overflow-hidden">
                            <img 
                                src={hotel.image || 'https://images.unsplash.com/photo-1506059612708-99d6c258160e'} 
                                alt={hotel.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Overlay pour le texte */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80"></div>
                            
                            {/* Badge Ville */}
                            <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-widest">
                                {hotel.city}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                {hotel.name}
                            </h2>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                {hotel.description}
                            </p>
                            
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-xs text-slate-500 font-mono italic">
                                    {hotel.address}
                                </span>
                                <Link 
                                    to={`/hotel/${hotel.id}`}
                                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all active:scale-95"
                                >
                                    Explorer
                                </Link>
                            </div>
                        </div>
                        
                        {/* Effet de brillance au survol */}
                        <div className="absolute inset-0 pointer-events-none border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                ))}
            </div>

            {hotels.length === 0 && (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
                    <p className="text-slate-500">Aucun hôtel n'a été trouvé dans le quadrant actuel.</p>
                </div>
            )}
        </div>
    );
}
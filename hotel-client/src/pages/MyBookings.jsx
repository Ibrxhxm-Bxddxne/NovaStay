import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function MyBookings() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            api.get('/my-bookings')
                .then(res => {
                    setBookings(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Erreur de récupération:", err);
                    setLoading(false);
                });
        }
    }, [user]);

    if (loading) return <div className="text-center py-20 text-blue-400 animate-pulse font-mono tracking-widest">CHARGEMENT DE VOTRE JOURNAL DE VOYAGE...</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">Mes Réservations</h1>
                <Link to="/" className="text-blue-400 font-bold hover:underline text-xs uppercase tracking-widest">Nouvelle Exploration</Link>
            </div>

            {bookings.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-[3rem] border border-white/10">
                    <p className="text-slate-400 italic text-lg">Aucun voyage n'est enregistré dans vos archives.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {bookings.map(booking => (
                        <div key={booking.id} className="group p-8 border border-white/10 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-8 hover:bg-white/10 transition-all duration-500">
                            <div className="flex items-center gap-8 w-full">
                                {/* Miniature Hôtel */}
                                <div className="hidden sm:block w-32 h-32 rounded-3xl overflow-hidden border border-white/10 shadow-xl">
                                    <img src={booking.room?.hotel?.image} className="w-full h-full object-cover" alt="Hotel" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black text-white tracking-tight uppercase italic">{booking.room?.hotel?.name}</h3>
                                    <p className="text-blue-400 font-bold text-xs uppercase tracking-widest">Chambre {booking.room?.room_number} — {booking.room?.type}</p>
                                    <p className="text-slate-400 text-sm mt-2">{booking.room?.hotel?.city}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap md:flex-nowrap gap-8 items-center justify-between w-full md:w-auto">
                                <div className="text-center md:text-right px-6 border-x border-white/10">
                                    <span className="block text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Période</span>
                                    <div className="text-white font-mono text-sm">
                                        {booking.check_in} <span className="text-blue-500 mx-2">→</span> {booking.check_out}
                                    </div>
                                </div>
                                <div className="text-center md:text-right">
                                    <span className="block text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Statut</span>
                                    <span className="px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest">Confirmé</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
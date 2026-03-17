import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function HotelDetails() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [bookingMessage, setBookingMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        api.get(`/hotels/${id}`)
            .then(res => {
                setHotel(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erreur de chargement:", err);
                setLoading(false);
            });
    }, [id]);

    const handleBooking = async (roomId) => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (!checkIn || !checkOut) {
            setBookingMessage({ type: 'error', text: 'Veuillez sélectionner vos dates de séjour.' });
            return;
        }

        try {
            await api.get('../sanctum/csrf-cookie');
            
            await api.post('/bookings', {
                room_id: roomId,
                check_in: checkIn,
                check_out: checkOut
            });
            
            setBookingMessage({ type: 'success', text: 'Réservation confirmée ! Redirection vers vos voyages...' });
            
            // Redirection automatique après 2 secondes vers "Mes Réservations"
            setTimeout(() => navigate('/my-bookings'), 2000);

        } catch (err) {
            setBookingMessage({ 
                type: 'error', 
                text: err.response?.data?.message || 'Erreur lors de la réservation.' 
            });
        }
    };

    if (loading) return <div className="text-center py-20 text-blue-400 animate-pulse font-mono tracking-widest uppercase">Initialisation des données...</div>;
    if (!hotel) return <div className="text-center py-20 text-red-400">Hôtel introuvable dans la base.</div>;

    return (
        <div className="max-w-5xl mx-auto space-y-10 pb-20 px-4">
            {/* Header Image */}
            <div className="relative h-96 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                <img src={hotel.image} className="w-full h-full object-cover" alt={hotel.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
                <div className="absolute bottom-10 left-10">
                    <Link to="/" className="text-blue-400 text-xs font-black hover:text-blue-300 transition-colors uppercase tracking-[0.3em]">
                        ← Retour au Hub
                    </Link>
                    <h1 className="text-6xl font-black text-white mt-2 tracking-tighter uppercase italic">{hotel.name}</h1>
                    <p className="text-slate-300 mt-2 font-medium tracking-wide">{hotel.city} — {hotel.address}</p>
                </div>
            </div>

            {/* Date Selector Card */}
            <div className="p-10 border border-white/10 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] shadow-inner">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-1">Date d'Arrivée</label>
                        <input 
                            type="date" 
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500 transition-all hover:bg-white/10"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-1">Date de Départ</label>
                        <input 
                            type="date" 
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500 transition-all hover:bg-white/10"
                        />
                    </div>
                </div>
                
                {bookingMessage.text && (
                    <div className={`mt-8 p-4 rounded-2xl text-xs font-black text-center border tracking-widest uppercase animate-in fade-in slide-in-from-top-4 duration-500 ${
                        bookingMessage.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                        {bookingMessage.text}
                    </div>
                )}
            </div>

            {/* Rooms List */}
            <div className="space-y-8">
                <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic border-l-4 border-blue-600 pl-6">Suites Disponibles</h2>
                <div className="grid gap-6">
                    {hotel.rooms?.map(room => (
                        <div key={room.id} className="group flex flex-col lg:flex-row gap-8 p-8 border border-white/10 bg-white/5 backdrop-blur-xl rounded-[3rem] hover:bg-white/10 transition-all duration-500">
                            <div className="w-full lg:w-96 h-64 rounded-[2rem] overflow-hidden shadow-2xl">
                                <img src={room.image || 'https://images.unsplash.com/photo-1590490359683-658d3d23f972'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Chambre" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic">Unit {room.room_number}</h3>
                                        <span className="px-4 py-1 bg-blue-600/20 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest">{room.type}</span>
                                    </div>
                                    <p className="text-slate-400 mt-6 leading-relaxed font-medium">
                                        Équipée pour le confort absolu : contrôle climatique, interface domotique haute fidélité et isolation acoustique premium.
                                    </p>
                                </div>
                                <div className="flex justify-between items-end mt-8">
                                    <div className="flex flex-col">
                                        <span className="text-4xl font-black text-emerald-400 tracking-tighter">{room.price_per_night}€</span>
                                        <span className="text-slate-500 text-[10px] uppercase font-black tracking-widest">Par Nuitée</span>
                                    </div>
                                    <button 
                                        onClick={() => handleBooking(room.id)}
                                        className="px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-xl shadow-blue-600/30 transition-all hover:-translate-y-1 active:scale-95 text-[10px] uppercase tracking-[0.2em]"
                                    >
                                        Réserver cette unité
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
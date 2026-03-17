import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function AdminDashboard() {
    const [hotels, setHotels] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newHotel, setNewHotel] = useState({ name: '', city: '', address: '', description: '', image: '' });

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        const res = await api.get('/api/hotels');
        setHotels(res.data);
    };

    const handleAddHotel = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/hotels', newHotel);
            setNewHotel({ name: '', city: '', address: '', description: '', image: '' });
            setShowForm(false);
            fetchHotels();
        } catch (err) {
            alert("Erreur lors de l'ajout");
        }
    };

    const deleteHotel = async (id) => {
        if (window.confirm("Supprimer cet hôtel définitivement ?")) {
            await api.delete(`/api/hotels/${id}`);
            fetchHotels();
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-black text-white">Gestion du Parc Hôtelier</h1>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold transition-all"
                >
                    {showForm ? 'Fermer' : '+ Ajouter un Hôtel'}
                </button>
            </div>

            {/* Formulaire d'ajout (Glassmorphism) */}
            {showForm && (
                <form onSubmit={handleAddHotel} className="p-8 border border-white/10 bg-white/5 backdrop-blur-2xl rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Nom de l'hôtel" className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-blue-500" value={newHotel.name} onChange={e => setNewHotel({...newHotel, name: e.target.value})} required />
                    <input type="text" placeholder="Ville" className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-blue-500" value={newHotel.city} onChange={e => setNewHotel({...newHotel, city: e.target.value})} required />
                    <input type="text" placeholder="Adresse" className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-blue-500" value={newHotel.address} onChange={e => setNewHotel({...newHotel, address: e.target.value})} required />
                    <input type="text" placeholder="URL Image" className="bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-blue-500" value={newHotel.image} onChange={e => setNewHotel({...newHotel, image: e.target.value})} />
                    <textarea placeholder="Description" className="md:col-span-2 bg-white/5 border border-white/10 p-3 rounded-xl h-24 outline-none focus:border-blue-500" value={newHotel.description} onChange={e => setNewHotel({...newHotel, description: e.target.value})} required></textarea>
                    <button className="md:col-span-2 py-3 bg-blue-600 rounded-xl font-black uppercase tracking-widest">Enregistrer l'Hôtel</button>
                </form>
            )}

            {/* Liste des hôtels */}
            <div className="overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md rounded-3xl">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-slate-400 text-xs uppercase">
                        <tr>
                            <th className="p-4 font-bold">Hôtel</th>
                            <th className="p-4 font-bold">Localisation</th>
                            <th className="p-4 font-bold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {hotels.map(hotel => (
                            <tr key={hotel.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <div className="font-bold text-white">{hotel.name}</div>
                                </td>
                                <td className="p-4 text-slate-400 text-sm">{hotel.city}</td>
                                <td className="p-4 text-right">
                                    <button 
                                        onClick={() => deleteHotel(hotel.id)}
                                        className="px-4 py-1.5 bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/40 transition-all text-xs font-bold"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
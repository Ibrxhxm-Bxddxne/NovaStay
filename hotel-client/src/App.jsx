import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Importation des pages
import Home from './pages/Home';
import HotelDetails from './pages/HotelDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';

// Importation du composant de protection
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* --- BARRE DE NAVIGATION GLASSMORPHISM --- */}
      <nav className="max-w-6xl mx-auto mb-12 flex flex-wrap justify-between items-center p-5 border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl gap-4">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent transition-transform hover:scale-105">
          NEO-HOTEL
        </Link>
        
        {/* Liens de navigation */}
        <div className="flex items-center gap-4 md:gap-8 text-sm font-semibold">
          <Link to="/" className="text-slate-300 hover:text-white transition-colors">Explorer</Link>
          
          {user ? (
            <>
              {/* Liens pour utilisateurs connectés */}
              <Link to="/my-bookings" className="text-slate-300 hover:text-white transition-colors">
                Mes Voyages
              </Link>

              {/* Lien spécifique Admin */}
              {user.role === 'admin' && (
                <Link to="/admin" className="text-emerald-400 hover:text-emerald-300 border-l border-white/10 pl-4">
                  Admin Panel
                </Link>
              )}
              
              {/* Profil & Déconnexion */}
              <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                <div className="hidden md:block">
                  <span className="text-slate-500 text-[10px] uppercase block leading-none">Voyageur</span>
                  <span className="text-white font-bold">{user.name}</span>
                </div>
                <button 
                  onClick={logout}
                  className="px-4 py-2 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all border border-red-500/20 text-xs uppercase font-black"
                >
                  Quitter
                </button>
              </div>
            </>
          ) : (
            /* Liens pour visiteurs */
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-slate-300 hover:text-white">Connexion</Link>
              <Link 
                to="/register" 
                className="px-6 py-2 bg-blue-600 rounded-full shadow-lg shadow-blue-500/30 hover:bg-blue-500 transition-all text-white"
              >
                Rejoindre
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* --- ZONE DE CONTENU PRINCIPAL --- */}
      <main className="max-w-6xl mx-auto">
        <Routes>
          {/* Routes Publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Routes Client (Nécessitent une connexion) */}
          <Route 
            path="/my-bookings" 
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            } 
          />

          {/* Route Admin (Nécessite rôle admin) */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>

      {/* --- PIED DE PAGE SUBTILE --- */}
      <footer className="max-w-6xl mx-auto mt-20 py-8 border-t border-white/5 text-center">
        <p className="text-slate-600 text-xs font-mono tracking-widest uppercase">
          &copy; 2026 NEO-HOTEL Corp — Systèmes de réservation orbitaux
        </p>
      </footer>
    </div>
  );
}

export default App;
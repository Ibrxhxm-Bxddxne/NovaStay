# 🌌 NovaStay - Modern Hotel Booking Platform

NovaStay est une application Web Fullstack haut de gamme dédiée à la réservation d'hôtels à travers le monde. Alliant la puissance de **Laravel 11** et la fluidité de **React 18**, l'interface propose une expérience utilisateur immersive basée sur le design *Glassmorphism*.



---

## ✨ Fonctionnalités

* **Exploration Interactive** : Liste dynamique de 15+ destinations mondiales avec filtrage temps réel.
* **Système de Réservation** : Sélection de dates via calendrier et validation instantanée.
* **Authentification SPA** : Gestion sécurisée des sessions via Laravel Sanctum (CSRF-protected).
* **Dashboard Voyageur** : Espace "Mes Réservations" pour suivre ses historiques de séjours.
* **Architecture API** : Backend RESTful optimisé avec relations Eloquent (Hotel > Room > Booking).

---

## 🛠️ Stack Technique

| Technologie | Usage |
| :--- | :--- |
| **React 18** | Bibliothèque UI (Vite.js) |
| **Tailwind CSS** | Design & Animations futuristes |
| **Laravel 11** | Framework Backend PHP |
| **Sanctum** | Authentification Web Stateful |
| **SQLite** | Base de données légère et rapide |
| **Axios** | Client HTTP avec gestion de cookies |

---

## 📸 Aperçu de l'Interface

### 🏠 Page d'Accueil (Hub d'Exploration)
La page principale affiche les hôtels disponibles avec des visuels haute résolution provenant d'Unsplash.
> *Emplacement conseillé pour image : `images/Home.png`*

### 🛌 Détails & Chambres
Vue détaillée d'un hôtel incluant le sélecteur de dates et la liste des unités d'habitation disponibles.
> *Emplacement conseillé pour image : `images/Details.png`*

### 📅 Gestion des Réservations
Interface utilisateur permettant de visualiser l'historique des voyages confirmés.
> *Emplacement conseillé pour image : `images/Voyages.png`*

---

## 🚀 Installation & Configuration

### Backend (Laravel)
1. Clonez le projet et entrez dans le dossier backend.
2. Installez les dépendances : `composer install`
3. Configurez le `.env` (Base de données SQLite).
4. Lancez les migrations et le seeder :
   ```bash
   php artisan migrate:fresh --seed
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Ajoute cet import
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // On vérifie si l'utilisateur est connecté et si son rôle est admin
        if (Auth::check() && Auth::user()->role === 'admin') {
            return $next($request);
        }

        return response()->json(['message' => 'Accès refusé. Réservé aux administrateurs.'], 403);
    }
}

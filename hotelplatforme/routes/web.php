<?php
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
    
// Routes d'authentification
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// Route pour récupérer l'utilisateur connecté (indispensable pour ton AuthContext React)
Route::middleware('auth:sanctum')->get('/api/user', function (Request $request) {
    return $request->user();
});
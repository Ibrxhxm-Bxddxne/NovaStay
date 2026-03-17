<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    // Créer une réservation
    public function store(Request $request)
    {
        $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'check_in' => 'required|date|after_or_equal:today',
            'check_out' => 'required|date|after:check_in',
        ]);

        // 1. Vérifier la disponibilité (Logique d'exclusion de dates)
        $isBooked = Booking::where('room_id', $request->room_id)
            ->where(function ($query) use ($request) {
                $query->whereBetween('check_in', [$request->check_in, $request->check_out])
                      ->orWhereBetween('check_out', [$request->check_in, $request->check_out]);
            })->exists();

        if ($isBooked) {
            return response()->json(['message' => 'Cette chambre est déjà réservée pour ces dates.'], 422);
        }

        // 2. Calculer le prix total
        $room = Room::find($request->room_id);
        $nights = date_diff(date_create($request->check_in), date_create($request->check_out))->days;
        $totalPrice = $nights * $room->price_per_night;

        // 3. Enregistrer
        $booking = Booking::create([
            'user_id' => Auth::id(), // ID de l'utilisateur connecté via Sanctum
            'room_id' => $request->room_id,
            'check_in' => $request->check_in,
            'check_out' => $request->check_out,
            'total_price' => $totalPrice,
            'status' => 'pending'
        ]);

        return response()->json($booking, 201);
    }

    // Voir les réservations de l'utilisateur connecté
    public function myBookings()
    {
        return response()->json(Auth::user()->bookings()->with('room.hotel')->get());
    }
}
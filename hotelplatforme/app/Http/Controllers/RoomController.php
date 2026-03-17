<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Hotel;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    /**
     * Affiche toutes les chambres d'un hôtel spécifique (Public).
     */
    public function index($hotelId)
    {
        $hotel = Hotel::find($hotelId);

        if (!$hotel) {
            return response()->json(['message' => 'Hôtel non trouvé'], 404);
        }

        // On récupère les chambres liées à cet hôtel
        $rooms = $hotel->rooms;

        return response()->json($rooms);
    }

    /**
     * Ajoute une nouvelle chambre (Admin uniquement).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'hotel_id'        => 'required|exists:hotels,id',
            'room_number'     => 'required|string',
            'type'            => 'required|string', // ex: Suite, Double, Single
            'price_per_night' => 'required|numeric|min:0',
            'is_available'    => 'boolean'
        ]);

        $room = Room::create($validated);

        return response()->json([
            'message' => 'Chambre ajoutée avec succès',
            'room' => $room
        ], 201);
    }

    /**
     * Affiche les détails d'une chambre spécifique (Public/Admin).
     */
    public function show(Room $room)
    {
        return response()->json($room->load('hotel'));
    }

    /**
     * Met à jour les informations d'une chambre (Admin uniquement).
     */
    public function update(Request $request, Room $room)
    {
        $validated = $request->validate([
            'room_number'     => 'string',
            'type'            => 'string',
            'price_per_night' => 'numeric|min:0',
            'is_available'    => 'boolean'
        ]);

        $room->update($validated);

        return response()->json([
            'message' => 'Chambre mise à jour',
            'room' => $room
        ]);
    }

    /**
     * Supprime une chambre (Admin uniquement).
     */
    public function destroy(Room $room)
    {
        $room->delete();

        return response()->json([
            'message' => 'Chambre supprimée définitivement'
        ]);
    }
}
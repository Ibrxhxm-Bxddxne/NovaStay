<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;

class HotelController extends Controller
{
    // Lister tous les hôtels (avec filtrage par ville optionnel)
    public function index(Request $request)
    {
        $query = Hotel::query();

        if ($request->has('city')) {
            $query->where('city', 'like', '%' . $request->city . '%');
        }

        return response()->json($query->with('rooms')->get());
    }

    // Voir un hôtel précis et ses chambres
    public function show($id)
    {
        $hotel = Hotel::with('rooms')->find($id);

        if (!$hotel) {
            return response()->json(['message' => 'Hôtel non trouvé'], 404);
        }

        return response()->json($hotel);
    }
    // Créer un nouvel hôtel
public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'required|string',
        'address' => 'required|string',
        'city' => 'required|string',
        'image' => 'nullable|url'
    ]);

    $hotel = Hotel::create($validated);
    return response()->json($hotel, 201);
}

// Mettre à jour un hôtel
public function update(Request $request, Hotel $hotel)
{
    $hotel->update($request->all());
    return response()->json($hotel);
}

// Supprimer un hôtel
public function destroy(Hotel $hotel)
{
    $hotel->delete();
    return response()->json(['message' => 'Hôtel supprimé avec succès']);
}
}
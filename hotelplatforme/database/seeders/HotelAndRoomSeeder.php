<?php

namespace Database\Seeders;

use App\Models\Hotel;
use App\Models\Room;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class HotelAndRoomSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        // --- 1. TES HÔTELS MANUELS ---

        // Paris
        $hotel1 = Hotel::create([
            'name' => 'Le Grand Palace',
            'description' => 'Un hôtel de luxe situé au cœur de Paris avec une vue imprenable sur la Tour Eiffel, un service de conciergerie 5 étoiles.',
            'address' => '15 Rue de la Paix',
            'city' => 'Paris',
            'image' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        ]);
        $hotel1->rooms()->createMany([
            ['room_number' => '101', 'type' => 'Standard', 'price_per_night' => 150.00, 'is_available' => true],
            ['room_number' => '102', 'type' => 'Suite Royale', 'price_per_night' => 500.00, 'is_available' => true],
        ]);

        // Casablanca
        $hotel2 = Hotel::create([
            'name' => 'Atlantic View',
            'description' => 'Un établissement ultra-moderne face à l\'océan Atlantique. Idéal pour la détente au bord de la corniche.',
            'address' => 'Boulevard de la Corniche',
            'city' => 'Casablanca',
            'image' => 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
        ]);
        $hotel2->rooms()->createMany([
            ['room_number' => 'A1', 'type' => 'Double Ocean', 'price_per_night' => 120.00, 'is_available' => true],
            ['room_number' => 'A2', 'type' => 'Single Garden', 'price_per_night' => 80.00, 'is_available' => true],
        ]);

        // Marrakech
        $hotel3 = Hotel::create([
            'name' => 'Riad Dar Al-Amira',
            'description' => 'Une oasis de paix nichée dans la Médina. Architecture traditionnelle et patio luxuriant.',
            'address' => 'Medina, Derb Soltane',
            'city' => 'Marrakech',
            'image' => 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
        ]);
        $hotel3->rooms()->createMany([
            ['room_number' => 'R1', 'type' => 'Chambre Atlas', 'price_per_night' => 200.00, 'is_available' => true],
            ['room_number' => 'R2', 'type' => 'Suite Impériale', 'price_per_night' => 450.00, 'is_available' => true],
        ]);

        // --- 2. GÉNÉRATION DE 12 HÔTELS SUPPLÉMENTAIRES ---

        $destinations = [
    ['city' => 'Tokyo', 'img' => 'https://images.unsplash.com/photo-15420518418c7-59a976bb6e09'],
    ['city' => 'New York', 'img' => 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9'], 
    ['city' => 'Dubaï', 'img' => 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c'],
    ['city' => 'Londres', 'img' => 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad'],
    ['city' => 'Rome', 'img' => 'https://images.unsplash.com/photo-1552832230-c0197dd311b5'],
    ['city' => 'Agadir', 'img' => 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b'],
    ['city' => 'Tanger', 'img' => 'https://images.unsplash.com/photo-1563124803-241577908794'],
    ['city' => 'Barcelone', 'img' => 'https://images.unsplash.com/photo-1583422409516-291507467396'],
    ['city' => 'Béni-Mellal', 'img' => 'https://images.unsplash.com/photo-1534008757030-27299c4371b6'],
    ['city' => 'Sydney', 'img' => 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9'],
    ['city' => 'Bali', 'img' => 'https://images.unsplash.com/photo-1537996194471-e657df975ab4'],
    ['city' => 'Berlin', 'img' => 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a'],
];

        foreach ($destinations as $dest) {
            $hotel = Hotel::create([
                'name' => $faker->company() . ' ' . $faker->randomElement(['Resort', 'Plaza', 'Grand Hotel', 'Suites']),
                'description' => $faker->paragraph(3),
                'address' => $faker->streetAddress(),
                'city' => $dest['city'],
                'image' => $dest['img'],
            ]);

            // Ajout de 2 ou 3 chambres par hôtel
            $roomCount = rand(2, 3);
            for ($i = 0; $i < $roomCount; $i++) {
                $hotel->rooms()->create([
                    'room_number' => $hotel->id . '0' . ($i + 1), // Génère 401, 402, etc.
                    'type' => $faker->randomElement(['Standard', 'Deluxe Business', 'Executive Suite']),
                    'price_per_night' => $faker->randomFloat(2, 95, 600), // Nom de colonne exact
                    'is_available' => true,
                    'image' => 'https://images.unsplash.com/photo-1590490359683-658d3d23f972'
                ]);
            }
        }
    }
}
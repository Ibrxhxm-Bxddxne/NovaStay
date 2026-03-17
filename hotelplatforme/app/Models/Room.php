<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = ['hotel_id', 'room_number', 'type', 'price_per_night', 'is_available','image'];

    // Une chambre appartient à un hôtel
    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    // Une chambre peut avoir plusieurs réservations (historique)
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'room_id', 
        'check_in', 
        'check_out', 
        'total_price', 
        'status'
    ];

    // La réservation appartient à un utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // La réservation concerne une chambre spécifique
    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
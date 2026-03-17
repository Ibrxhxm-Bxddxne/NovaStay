<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Hotel;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\AuthController;
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/hotels', [HotelController::class, 'index']);
Route::get('/hotels/{id}', [HotelController::class, 'show']);
Route::get('/hotels/{hotelId}/rooms', [RoomController::class, 'index']);
Route::get('/rooms/{room}', [RoomController::class, 'show']);



Route::middleware('auth:sanctum')->group(function () {
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/my-bookings', [BookingController::class, 'myBookings']);
});
Route::middleware(['auth:sanctum', \App\Http\Middleware\AdminMiddleware::class])->group(function () {
    

    Route::post('/hotels', [HotelController::class, 'store']);
    Route::put('/hotels/{hotel}', [HotelController::class, 'update']);
    Route::delete('/hotels/{hotel}', [HotelController::class, 'destroy']);


    Route::post('/rooms', [RoomController::class, 'store']);
    Route::delete('/rooms/{room}', [RoomController::class, 'destroy']);

    Route::get('/admin/bookings', [BookingController::class, 'index']); 
});
Route::middleware(['auth:sanctum', \App\Http\Middleware\AdminMiddleware::class])->group(function () {
    Route::post('/rooms', [RoomController::class, 'store']);
    Route::put('/rooms/{room}', [RoomController::class, 'update']);
    Route::delete('/rooms/{room}', [RoomController::class, 'destroy']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
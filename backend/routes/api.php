<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Api\DonorController;
use App\Http\Controllers\Api\RecipientController;
use App\Http\Controllers\Api\CategoryController;

Route::apiResource('categories', CategoryController::class);
Route::apiResource('donors', DonorController::class);
Route::apiResource('recipients', RecipientController::class);
Route::apiResource('items', ItemController::class);

Route::patch('/items/{id}/distribute', [ItemController::class, 'distribute']);
Route::get('/dashboard-stats', [ItemController::class, 'dashboardStats']);

use App\Http\Controllers\Api\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
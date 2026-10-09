<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Donor;
use Illuminate\Http\Request;

class DonorController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Donor::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'contact' => 'required|string',
            'address' => 'required|string',
        ]);

        $donor = Donor::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Donatur berhasil ditambahkan',
            'data' => $donor
        ], 201);
    }

    public function destroy($id)
    {
        $donor = Donor::find($id);
        if (!$donor) {
            return response()->json(['success' => false, 'message' => 'Tidak ditemukan'], 404);
        }
        $donor->delete();

        return response()->json(['success' => true, 'message' => 'Donatur berhasil dihapus']);
    }
}
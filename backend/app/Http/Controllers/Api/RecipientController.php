<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Recipient;
use Illuminate\Http\Request;

class RecipientController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Recipient::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'contact' => 'required|string',
            'address' => 'required|string',
            'needs' => 'nullable|string', // Menambahkan kolom needs
        ]);

        $recipient = Recipient::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Penerima berhasil ditambahkan',
            'data' => $recipient
        ], 201);
    }

    public function destroy($id)
    {
        $recipient = Recipient::find($id);
        if (!$recipient) {
            return response()->json(['success' => false, 'message' => 'Tidak ditemukan'], 404);
        }
        $recipient->delete();

        return response()->json(['success' => true, 'message' => 'Penerima berhasil dihapus']);
    }
}
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Donor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ItemController extends Controller
{
    // READ
    public function index(Request $request)
    {
        $query = Item::with(['category', 'donor', 'recipient']);

        // Jika dipanggil dari frontend untuk mengambil seluruh daftar
        if ($request->has('all') || $request->query('all') == 'true') {
            return response()->json([
                'success' => true,
                'data' => $query->latest()->get()
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $query->latest()->get() // Kirim array langsung agar tabel frontend tidak kosong
        ]);
    }

    // CREATE
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required',
            'donor_id' => 'nullable',
            'condition' => 'required',
            'location' => 'nullable|string',
            'status' => 'nullable|string',
        ]);

        // Berikan nilai default jika lokasi/status tidak terisi dari form
        $validated['location'] = $validated['location'] ?? 'Gudang Utama';
        $validated['status'] = $validated['status'] ?? 'Tersedia';

        $item = Item::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Barang donasi berhasil ditambahkan',
            'data' => $item->load(['category', 'donor'])
        ], 201);
    }

    public function destroy($id)
    {
        $item = Item::find($id);
        if (!$item) {
            return response()->json(['success' => false, 'message' => 'Barang tidak ditemukan'], 404);
        }
        $item->delete();

        return response()->json(['success' => true, 'message' => 'Barang berhasil dihapus']);
    }

    public function distribute(Request $request, $id)
    {
        $request->validate([
            'recipient_id' => 'required|exists:recipients,id',
        ]);

        $item = Item::find($id);
        if (!$item) {
            return response()->json(['success' => false, 'message' => 'Barang tidak ditemukan'], 404);
        }

        $item->update([
            'recipient_id' => $request->recipient_id,
            'status' => 'Tersalurkan'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Barang berhasil disalurkan ke penerima!',
            'data' => $item
        ]);
    }

    public function dashboardStats()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'total_items' => Item::count(),
                'total_available' => Item::where('status', 'Tersedia')->count(),
                'total_distributed' => Item::where('status', 'Tersalurkan')->count(),
                'total_donors' => Donor::count(),
                'recent_items' => Item::with(['donor', 'recipient'])->latest()->take(5)->get()
            ]
        ]);
    }
}
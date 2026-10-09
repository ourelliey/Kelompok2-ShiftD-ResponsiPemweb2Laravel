<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description'];

    // Relasi 1:N -> 1 Kategori punya banyak Barang
    public function items()
    {
        return $this->hasMany(Item::class);
    }
}

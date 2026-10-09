<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipient extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'contact', 'address', 'needs'];

    public function items()
    {
        return $this->hasMany(Item::class);
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'donor_id',
        'recipient_id',
        'name',
        'condition',
        'location',
        'photo_path',
        'status'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function donor()
    {
        return $this->belongsTo(Donor::class);
    }

    public function recipient()
    {
        return $this->belongsTo(Recipient::class);
    }
}
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->foreignId('donor_id')->nullable()->constrained('donors')->onDelete('set null');
            $table->foreignId('recipient_id')->nullable()->constrained('recipients')->onDelete('set null');
            $table->string('name');
            $table->enum('condition', ['Baru', 'Sangat Baik', 'Layak Pakai', 'Butuh Perbaikan']);
            $table->string('location');
            $table->string('photo_path')->nullable();
            $table->enum('status', ['Tersedia', 'Direservasi', 'Tersalurkan'])->default('Tersedia');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
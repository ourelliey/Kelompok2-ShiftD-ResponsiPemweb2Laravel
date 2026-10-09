<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Buku', 'description' => 'Buku pelajaran, novel, komik, dll'],
            ['name' => 'Pakaian', 'description' => 'Baju, celana, jaket layak pakai'],
            ['name' => 'Elektronik', 'description' => 'Laptop, HP, kipas angin, dll'],
            ['name' => 'Perlengkapan Sekolah', 'description' => 'Tas, alat tulis, seragam'],
        ];

        foreach ($categories as $cat) {
            Category::create($cat);
        }
    }
}
<?php

namespace Database\Seeders;

use App\Models\Views;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ViewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Views::factory()->count(800)->create();
    }
}

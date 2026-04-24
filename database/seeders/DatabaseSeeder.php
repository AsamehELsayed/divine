<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        if (!\App\Models\User::where('email', 'admin@divinemanagement.org')->exists()) {
            \App\Models\User::factory()->create([
                'name' => 'Admin User',
                'email' => 'admin@divinemanagement.org',
                'password' => bcrypt('password'),
            ]);
        }

        $this->call([
            SiteConfigSeeder::class,
        ]);
    }
}

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


        if (!\App\Models\User::where('email', 'Hanin.elhorbeity@hotmail.com')->exists()) {
            \App\Models\User::factory()->create([
                'name' => 'HaninElhorbeity',
                'email' => 'Hanin.elhorbeity@hotmail.com',
                'password' => bcrypt('Hanin@D2025'),
            ]);
        }

        $this->call([
            SiteConfigSeeder::class,
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserRoleSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        DB::table('user_roles')->insert([
            'user_id' => 1,
            'role_id' => 1,
            "is_default" => true
        ]);

    }
}

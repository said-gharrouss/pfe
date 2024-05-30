<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Instructor;
use App\Models\Student;
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

        Student::factory()->create([
            'name' => 'student',
            'email' => 'student@gmail.com',
            "password" => "student 12345"
        ]);
        Admin::factory()->create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            "password" => "admin 12345"
        ]);
        Instructor::factory()->create([
            'name' => 'instructor',
            'email' => 'instructor@gmail.com',
            "password" => "instructor 12345"
        ]);

    }
}

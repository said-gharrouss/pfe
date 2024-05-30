<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Instructor extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $appends = ["role"];
    public function getRoleAttribute(){
        return "instructor";
    }

    protected $fillable = [
        "name",
        "email",
        "password",
        "text",
    ];

    protected $table = 'instructors';


}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stages extends Model
{
    use HasFactory;

    protected $fillable = [
        "nome_de_etudiant",
        "nome_de_entreprise",
        "adress_de_entreprise",
        "encadrant_pedagogique",
        "phone",
        "encadrant",
        "institulé_de_sujet",
        "description",
        "technologie",
        "note"
    ];
}

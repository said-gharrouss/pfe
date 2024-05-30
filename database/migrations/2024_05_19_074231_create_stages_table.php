<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stages', function (Blueprint $table) {
            $table->id();
            $table->string("nome_de_etudiant");
            $table->string("nome_de_entreprise",50);
            $table->string("adress_de_entreprise",50);
            $table->string("encadrant_pedagogique");
            $table->string("phone")->unique();
            $table->string("encadrant",50);
            $table->string("institulé_de_sujet",50);
            $table->string("description",255);
            $table->string("technologie");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stages');
    }
};

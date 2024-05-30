<?php

use App\Http\Controllers\InstructorController;
use App\Http\Controllers\InstructorsController;
use App\Http\Controllers\StagesController;
use App\Http\Controllers\StagiaireController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AuthenticateStudent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum',"ability:admin"])->prefix("admin")->group(static function (){

    Route::get('/', function (Request $request) {
        return $request->user();
    });

    Route::apiResources([
        "stagiaires" => StagiaireController::class,
        "instructors" => InstructorsController::class
    ]);

});

Route::middleware(['auth:sanctum',"ability:instructor"])->prefix("instructor")->group(static function (){

    Route::get('/', function (Request $request) {
        return $request->user();
    });
    Route::apiResources([
        "stages" => StagesController::class,
    ]);

});

Route::middleware(['auth:sanctum',"ability:student"])->prefix("student")->group(static function (){

    Route::get('/', function (Request $request) {
        return $request->user();
    });

    Route::apiResources([
        "stages" => StagesController::class,
    ]);
});


require __DIR__.'/auth.php';

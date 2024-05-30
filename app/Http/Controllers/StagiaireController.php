<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Hash;

class StagiaireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $fields = $request->validated();
        $fields["password"] = Hash::make($fields["password"]);
        User::create($fields);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $stagiaire)
    {
        $fields = $request->validated();
        $fields["password"] = Hash::make($fields["password"]);
        $stagiaire->update($fields);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $stagiaire)
    {
        $stagiaire->delete();
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Stages;
use App\Http\Requests\StoreStagesRequest;
use App\Http\Requests\UpdateStagesRequest;

class StagesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Stages::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStagesRequest $request)
    {
        $fileds = $request->validated();
        Stages::create($fileds);
    }

    /**
     * Display the specified resource.
     */
    public function show(Stages $stage)
    {
        return $stage;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStagesRequest $request, Stages $stage)
    {
        $stage->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stages $stage)
    {
        $stage->delete();
    }
}

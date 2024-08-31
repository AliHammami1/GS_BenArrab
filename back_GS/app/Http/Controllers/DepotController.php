<?php

namespace App\Http\Controllers;

use App\Models\Depot;
use Illuminate\Http\Request;

class DepotController extends Controller
{/**
     * Display a listing of the resource.
     */
    public function index()
    {
        $depots = Depot::all();
        return $depots;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $depot = new Depot([
            'nomdepot' => $request->input('nomdepot'),
            ]);
            $depot->save();
            return response()->json($depot,201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $depot = Depot::find($id);
        return response()->json($depot);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $depot = Depot::find($id); 
        $depot->update($request->all());
        return response()->json($depot, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $depot = Depot::find($id);
        $depot->delete();
        return response()->json('Depot supprimée !');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\LigneDep;
use Illuminate\Http\Request;

class LigneDepController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lignedeps = LigneDep::with('depots')->get();
        return $lignedeps;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $lignedep = new LigneDep([
            'nomlignedep' => $request->input('nomlignedep'), 
            'depotID' => $request->input('depotID'),
        ]);
        $lignedep->save();
        return response()->json($lignedep, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $lignedep = LigneDep::find($id);
        return response()->json($lignedep);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,$id)
    {
        $lignedep = LigneDep::find($id);
        $lignedep->update($request->all());
        return response()->json($lignedep, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $lignedep = LigneDep::find($id); 
        $lignedep->delete();
        return response()->json('Ligne Depot supprimée !');
    }

    public function showLigneDepByDepot($iddep)
    {
        $lignedep = LigneDep::where('depotID', $iddep)
                                ->with('depots')
                                ->get();
        return response()->json($lignedep);
    }
}

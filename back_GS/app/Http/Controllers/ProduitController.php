<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Http\Request;

class ProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $produits = Produit::with('LigneDeps')->get();
        return $produits;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $produit = new Produit([
            'qualiter' => $request->input('qualiter'),
            'grammage' => $request->input('grammage'),
            'type' => $request->input('type'),
            'poids' => $request->input('poids'),
            'date_stock' => $request->input('date_stock'),
            'qte_stock' => $request->input('qte_stock'),
            'lignedepID' => $request->input('lignedepID'),
            ]); // sna3na instance w sabina fi wostou
        $produit->save(); // souvgarde l instance
        return response()->json([
            'id'=>$produit->id
           // 'token' => $token
        ], 200);
        // return response()->json($produit, 201); // traja3li el produit eli ameltelha souvgarde
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $produit = Produit::with('LigneDeps')->find($id);

        //$produit = Produit::with(['SousCategories'])::find($id); // produit hethy el model
        return response()->json($produit); 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Produit $produit)
    {
        $produit = Produit::find($id); // nlawej bel model (produit)
        $produit->update($request->all());  // nbadel fi les donner
        return response()->json($produit, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Produit $produit)
    {
        $produit = Produit::find($id); // modele nlawej alih w ki t9ah hothouli fi $produit
        $produit->delete(); // efsa5li  $produit
        return response()->json('Produit supprimée !'); 
    }

    public function showProduitsByLigDep($idld) // bech traja3li tous les sous categories mta categorie ili id mte3ou $idcat
    {
        $Produits= Produit::where('lignedepID', $idld)->with('LigneDeps')->get(); // brch trja3li resultaa fi  $Scategorie bech tmchy ll Scategorie w tlawej fi
                    //attribue categorieID  ala valeur $idcat w trja3houli w bad ametlou ->with 5ater 9otlou rajali l'objet kolou ( yani ma hachtich ken bel case heki hachty bel les attribue mte3ou lkol yani l'objet kemel )
        return response()->json($Produits);
    }
}

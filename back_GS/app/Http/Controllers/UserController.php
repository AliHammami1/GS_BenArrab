<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $Users = User::all();
        return $Users;
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $User = User::find($id);
        return response()->json($User);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $User = User::find($id);
        $User->update($request->all());
        return response()->json($User, 200);
    }

    public function rechercheParMail($email)
    {
        $user = User::where('email', $email)->first(); // Utilisation de minuscules pour les variables, selon les conventions de nommage
        return response()->json($user, 200);
    }
}

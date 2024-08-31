<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'tel' => 'required',
            'email' => 'required|email|unique:users,email', // mail unique
            'password' => 'required|min:6', // au moin 6 caractaire
            'type_user'=> 'required'
        ]);
        $user = User::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'tel' => $request->tel,
            'email' => $request->email,
            'password' => Hash::make($request->password), // lezmou ikoun hash
            'type_user'=> $request->type_user,
        ]);
       // $token = $user->createToken('token-name')->plainTextToken; // zeydaa
        return response()->json([
            'status' => true,
            'message' => 'User Created Successfully',
            'id'=>$user->id
           // 'token' => $token
        ], 200);
    }
}

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DepotController;
use App\Http\Controllers\LigneDepController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;

Route::middleware('api')->group(function () {
    Route::resource('depots', DepotController::class);
});
Route::middleware('api')->group(function () {
    Route::resource('lignedeps', LigneDepController::class);
}); 
Route::get('/LigneDep/{iddep}',[LigneDepController::class,'showLigneDepByDepot']);

Route::middleware('api')->group(function () {
    Route::resource('users', UserController::class);
});

Route::get('/rechercheParMail/{email}',[UserController::class,'rechercheParMail']);

Route::middleware('api')->group(function () {
    Route::resource('produits', ProduitController::class);
});

Route::get('/produitbyLigneDep/{id}',[ProduitController::class,'showProduitsByLigDep']);

Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);
Route::middleware('auth:sanctum')->post('/logout', [LoginController::class,'logout']);
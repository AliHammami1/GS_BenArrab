<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LigneDep extends Model
{
    use HasFactory;
    protected $fillable = [
        'nomlignedep','depotID'
    ];
    public function depots()
    {
        return $this->belongsTo(Depot::class,"depotID");
    }
    public function Produits()
    {
        return $this->hasMany(Produit::class ,"lignedepID");
    }
}

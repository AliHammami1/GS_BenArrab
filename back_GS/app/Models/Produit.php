<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;
    protected $fillable = [
        'qualiter','grammage','type','poids','date_stock','qte_stock','lignedepID'
    ];

    public function LigneDeps()
    {
        return $this->belongsTo(LigneDep::class,"lignedepID");
    }

}
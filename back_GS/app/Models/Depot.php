<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Depot extends Model
{
    protected $fillable = [
        'nomdepot'
    ];
    use HasFactory;
    public function LigneDepots()
    {
        return $this->hasMany(LigneDepot::class ,"depotID");
    }
}

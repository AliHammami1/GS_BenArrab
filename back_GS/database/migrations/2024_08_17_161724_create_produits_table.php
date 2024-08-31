<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('produits', function (Blueprint $table) {
            $table->id();
            $table->string('qualiter');
            $table->string('grammage');
            $table->string('type');
            $table->date('date_stock');
            $table->integer('poids')->default(0);
            $table->integer('qte_stock')->default(0);
            $table->unsignedBigInteger('lignedepID'); 
            $table->foreign('lignedepID') 
            ->references('id')
            ->on('ligne_deps')
            ->onDelete('restrict')
            ->onUpdate('restrict');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produits');
    }
};
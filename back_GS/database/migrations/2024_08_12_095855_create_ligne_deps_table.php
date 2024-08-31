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
        Schema::create('ligne_deps', function (Blueprint $table) {
            $table->id();
            $table->string('nomlignedep');
            $table->unsignedBigInteger('depotID');
            $table->foreign('depotID') 
            ->references('id')
            ->on('depots')
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
        Schema::dropIfExists('ligne_deps');
    }
};

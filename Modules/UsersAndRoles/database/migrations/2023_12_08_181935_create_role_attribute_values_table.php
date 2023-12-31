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
        Schema::create("role_attribute_values", function (Blueprint $table){
            $table->id();
            $table->unsignedBigInteger("role_id");
            $table->unsignedBigInteger("attribute_id");
            $table->unsignedBigInteger("user_id");
            $table->text("value")->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("role_attribute_values");
    }
};

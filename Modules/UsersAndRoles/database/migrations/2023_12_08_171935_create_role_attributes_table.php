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
        Schema::create("role_attributes", function (Blueprint $table){
            $table->id();
            $table->unsignedBigInteger("role_id");
            $table->string("key");
            $table->string("name");
            $table->string("input_scenario");
            $table->integer("order")->default(0);
            $table->boolean("is_hidden")->default(false);
            $table->boolean("is_required")->default(false);
            $table->boolean("is_multiple")->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("role_attributes");
    }
};

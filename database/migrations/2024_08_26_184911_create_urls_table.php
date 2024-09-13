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
        Schema::create('urls', function (Blueprint $table) {
            $table->id();
            $table->text('domain')->nullable();
            $table->text('original_url');
            $table->string('shortened_url')->unique();
            $table->text('comments')->nullable();
            $table->string('password')->nullable();

            $table->boolean('is_machine')->default(false);
            $table->boolean('is_subscribed')->default(true);
            $table->boolean('is_build_utm')->default(false);

            $table->string('utm_id')->nullable();
            $table->string('utm_source')->nullable();
            $table->string('utm_medium')->nullable();
            $table->string('utm_campaign')->nullable();
            $table->string('utm_term')->nullable();
            $table->string('utm_content')->nullable();

            $table->unsignedInteger('clicks')->default(0);
            $table->unsignedInteger('scans')->default(0);
            
            $table->unsignedBigInteger('user_id')->nullable();
            $table->boolean('is_active')->default(true);
            $table->datetime('fh_expired')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('urls');
    }
};

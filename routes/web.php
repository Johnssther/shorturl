<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Url;
use Carbon\Carbon;
use App\Http\Controllers\UrlController;

Route::get('/', function () {
    $currentDateTime = Carbon::now();
    $thirtyMinutesAgo = $currentDateTime->subMinutes(30);

    $data = Url::where('user_id', null)
            ->where('created_at', '>=', $thirtyMinutesAgo)
            ->get();
 
    return Inertia::render('Welcome/Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'urls' => $data,
    ]);
})->name('welcome');

Route::get('/i/{shortenedUrl}', [UrlController::class, 'redirect']);
Route::post('/urls', [UrlController::class, 'store'])->name('urls.store');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::get('/urls', [UrlController::class, 'index'])->name('urls.index');

});

require __DIR__.'/auth.php';

<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Url;
use Carbon\Carbon;
use App\Http\Controllers\UrlController;
use Illuminate\Http\Request;

Route::get('/i/{shortenedUrl}', [UrlController::class, 'redirect']);
Route::get('/links', [UrlController::class, 'linksindex'])->name('links.index');
Route::post('/links', [UrlController::class, 'linkstore'])->name('links.store');
Route::post('/links/{id}/verify-password', [UrlController::class, 'verifyPassword'])->name('links.verify-password');


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

Route::get('/dashboard', function (Request $request) {
    $totalLinks = count(Url::where('user_id', $request->user()->id)->get());
    return Inertia::render('Dashboard', compact('totalLinks'));
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::get('/urls/clone/{id}', [UrlController::class, 'clone'])->name('urls.clone');
    Route::resource('urls', UrlController::class);
});

require __DIR__.'/auth.php';

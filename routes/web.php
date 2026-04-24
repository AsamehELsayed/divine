<?php

use App\Http\Controllers\Admin\SiteConfigController;
use App\Models\SiteConfig;
use Inertia\Inertia;

Route::get('/', function () {
    $config = SiteConfig::where('key', 'homepage')->first();
    return Inertia::render('welcome', [
        'config' => $config ? $config->value : null
    ]);
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/admin/dashboard', [SiteConfigController::class, 'index'])->name('admin.dashboard');
    Route::post('/admin/config', [SiteConfigController::class, 'update'])->name('admin.config.update');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

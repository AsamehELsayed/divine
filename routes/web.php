<?php

use App\Http\Controllers\Admin\SiteConfigController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\SitemapController;
use App\Models\SiteConfig;
use Inertia\Inertia;

Route::get('/', function () {
    $config = SiteConfig::where('key', 'homepage')->first();
    return Inertia::render('welcome', [
        'config' => $config ? $config->value : null
    ]);
})->name('home');

Route::get('/sitemap.xml', [SitemapController::class, 'index']);

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        $stats = [
            'total_visits' => \App\Models\Visit::count(),
            'visits_today' => \App\Models\Visit::whereDate('created_at', \Illuminate\Support\Carbon::today())->count(),
            'weekly_stats' => \App\Models\Visit::selectRaw('DATE(created_at) as date, count(*) as count')
                ->where('created_at', '>=', \Illuminate\Support\Carbon::now()->subDays(7))
                ->groupBy('date')
                ->orderBy('date')
                ->get()
        ];
        return Inertia::render('dashboard', [
            'stats' => $stats
        ]);
    })->name('dashboard');

    Route::get('/admin/dashboard', [SiteConfigController::class, 'index'])->name('admin.dashboard');
    Route::post('/admin/config', [SiteConfigController::class, 'update'])->name('admin.config.update');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('users', UserController::class);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

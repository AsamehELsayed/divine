<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\SiteConfig;
use Inertia\Inertia;

class SiteConfigController extends Controller
{
    public function index()
    {
        $config = SiteConfig::where('key', 'homepage')->first();
        
        return Inertia::render('admin/dashboard', [
            'config' => $config ? $config->value : null
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'config' => 'required|array'
        ]);

        SiteConfig::updateOrCreate(
            ['key' => 'homepage'],
            ['value' => $request->config]
        );

        return back()->with('success', 'Configuration updated successfully.');
    }
}

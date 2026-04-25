<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackVisit
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Don't track if it's an AJAX request (like Inertia data fetching) unless it's a main visit
        // Or just track everything but filter by URL/IP later.
        // For now, let's track everything that is a GET request.
        if ($request->isMethod('GET') && !$request->expectsJson() && !str_starts_with($request->path(), 'admin') && !str_starts_with($request->path(), 'dashboard')) {
            \App\Models\Visit::create([
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'url' => $request->fullUrl(),
            ]);
        }

        return $next($request);
    }
}

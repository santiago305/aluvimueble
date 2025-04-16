<?php

namespace App\Http\Middleware;

use App\Models\Views;
use Closure;
use Illuminate\Http\Request;
use Jenssegers\Agent\Agent;
use Symfony\Component\HttpFoundation\Response;

class LogPageView
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $agent = new Agent();

        Views::create([
            'ip' => $request->ip(),
            'route' => $request->path(),
            'viewed_at' => now(),
            'device_type' => $agent->isMobile() ? 'mobile' : ($agent->isTablet() ? 'tablet' : 'desktop'),
            'browser' => $agent->browser(),
        ]);
        return $next($request);
    }
}

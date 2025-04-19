<?php

namespace App\Http\Middleware;

use App\Models\Views;
use Closure;
use Illuminate\Http\Request;
use Jenssegers\Agent\Agent;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Http;

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
        $ip = $request->ip();
    
        // Obtener geolocalización
    
        if ($ip === '127.0.0.1' || $ip === '::1') {
            $country = $region = $city = 'Localhost';
        } else {
            $geo = Http::get("https://apip.cc/api-json/{$ip}")->json();
            $country = $geo['status'] === 'success' ? $geo['CountryName'] : null;
            $region = $geo['status'] === 'success' ? $geo['RegionName'] : null;
            $city = $geo['status'] === 'success' ? $geo['City'] : null;
        }
    
        Views::create([
            'ip' => $ip,
            'route' => $request->path(),
            'viewed_at' => now(),
            'device_type' => $agent->isMobile() ? 'mobile' : ($agent->isTablet() ? 'tablet' : 'desktop'),
            'browser' => $agent->browser(),
            'country' => $country,
            'region' => $region,
            'city' => $city,
        ]);
    
        return $next($request);
    }
}

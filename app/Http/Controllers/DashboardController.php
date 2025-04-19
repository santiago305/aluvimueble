<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Views;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $filter = $request->input('filter', 'dias');
        $viewsQuery = Views::query();

        switch ($filter) {
            case 'dias':
                $viewsQuery->where('viewed_at', '>=', Carbon::now()->subDays(60));
                break;
            case 'meses':
                $viewsQuery->where('viewed_at', '>=', Carbon::now()->subMonths(30));
                break;
            case 'todo':
                // Sin filtro de tiempo
                break;
            default:
                $viewsQuery->where('viewed_at', '>=', Carbon::now()->subDays(50));
                break;
        }

        $views = $viewsQuery->orderBy('viewed_at', 'desc')->get();

        $regions = $views->groupBy('region')->map(function ($group, $region) {
            return [
                'region' => $region,
                'visitors' => $group->count(),
            ];
        })->values();

        $topUrls = $views->groupBy('route')->map(function ($group, $route) {
            return [
                'route' => $route,
                'visits' => $group->count(),
            ];
        })
        ->sortByDesc('visits')
        ->take(5)
        ->values();

        $browsers = $views->groupBy('browser')->map(function ($group, $browser) {
            return [
                'browser' => $browser,
                'visitors' => $group->count(),
            ];
        })->values();

        $deviceData = $views->groupBy(function ($item) {
            return Carbon::parse($item->viewed_at)->format('Y-m-d');
        })->map(function ($group, $date) {
            return [
                'date' => $date,
                'desktop' => $group->where('device', 'desktop')->count(),
                'mobile' => $group->where('device', 'mobile')->count(),
                'tablet' => $group->where('device', 'tablet')->count(),
            ];
        })->values();

        return Inertia::render('dashboard', [
            'views' => $views,
            'filter' => $filter,
            'regions' => $regions,
            'topUrls' => $topUrls,
            'browsers' => $browsers,
            'deviceData' => $deviceData,
        ]);
    }
}

<?php

namespace App\Http\Controllers;
use Carbon\Carbon;
use App\Models\Views;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $filter = $request->input('filter','dias');
        $viewsQuery = Views::query();
        
        switch ($filter) {
            case 'dias':
                $viewsQuery->where('viewed_at', '>=', Carbon::now()->subDays(60));
                break;
            case 'meses':
                $viewsQuery->where('viewed_at', '>=', Carbon::now()->subMonths(30));
                break;
            case 'todo':
                $viewsQuery;
                break;
            default:
                $viewsQuery->where('viewed_at', '>=', Carbon::now()->subDays(50));
                break;
        }

        $views = $viewsQuery->orderBy('viewed_at', 'desc')->get();
    
        return Inertia::render('dashboard',[
            'views' => $views,
            'filter' => $filter,
        ]);
    }
}

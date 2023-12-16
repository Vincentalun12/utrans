<?php

namespace App\Http\Controllers;

use App\Models\ChartOfAccount;
use App\Models\Setting;

use Illuminate\Http\Request;
use Inertia\Inertia;


class SettingsController extends Controller
{
    public function index()
    {
        $data = [
            'accounts' => ChartOfAccount::all(),
        ];

        return Inertia::render('Dashboard/Settings/Index', $data);
    }
}

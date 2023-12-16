<?php

namespace App\Http\Controllers;

use App\Models\COA;
use App\Models\Setting;

use Illuminate\Http\Request;
use Inertia\Inertia;


class SettingsController extends Controller
{
    public function index()
    {
        $data = [
            'accounts' => COA::all(),
        ];

        return Inertia::render('Dashboard/Settings/Index', $data);
    }
}

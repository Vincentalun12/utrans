<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\BrandController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::controller(ProductController::class)->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/products', 'index')->name('products');
        Route::get('/products/create', 'create')->name('products.create');
    });
});

Route::controller(BrandController::class)->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/brand', 'index')->name('brand');
        Route::get('/brand/create', 'create')->name('brand.create');
    });
});

Route::controller(PurchaseController::class)->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/purchases', 'index')->name('purchases');
        Route::get('/purchases/detail', 'detail')->name('purchases.detail');
        Route::get('/purchases/create', 'create')->name('purchases.create');
    });
});

Route::controller(SaleController::class)->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/sales', 'index')->name('sales');
        Route::get('/sales/detail', 'detail')->name('sales.detail');
        Route::get('/sales/create', 'create')->name('sales.create');
    });
});

Route::controller(PartnerController::class)->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/partners', 'index')->name('partners');
    });
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/balancesheet', function () {
    return Inertia::render('Dashboard/Reports/BalanceSheet/Index');
})->middleware(['auth', 'verified'])->name('balancesheet');

Route::get('/pos', function () {
    return Inertia::render('Dashboard/Pos/Index');
})->middleware(['auth', 'verified'])->name('pos');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

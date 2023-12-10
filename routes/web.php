<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CustomersController;
use App\Http\Controllers\VendorsController;
use App\Http\Controllers\JournalsController;
use App\Http\Controllers\JournalentriesController;
use App\Http\Controllers\COAController;
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

Route::controller(VendorsController::class)->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/vendors', 'index')->name('vendors');
        Route::get('/vendors/create', 'create')->name('vendors.create');
    });
});

Route::controller(BrandController::class)->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/brand', 'index')->name('brands');
        Route::get('/brand/create', 'create')->name('brands.create');
        Route::post('/brand/store', 'store')->name('brands.store');
        Route::get('/brand/edit/{id}', 'edit')->name('brands.edit');
        Route::patch('/brand/update/{id}', 'update')->name('brands.update');
        Route::delete('/brand/destroy/{id}', 'destroy')->name('brands.destroy');
    });
});

Route::controller(CustomersController::class)->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/customers', 'index')->name('customers');
        Route::get('/customers/create', 'create')->name('customers.create');
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

Route::controller(JournalsController::class)->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/journals', 'index')->name('journals');
        Route::get('/journals/create', 'create')->name('journals.create');
    });
});

Route::controller(JournalentriesController::class)->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/journalentries', 'index')->name('journalentries');
        Route::get('/journalentries/create', 'create')->name('journalentries.create');
    });
});

Route::controller(COAController::class)->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/coa', 'index')->name('coa');
        Route::get('/coa/create', 'create')->name('coa.create');
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

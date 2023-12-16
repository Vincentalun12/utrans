<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\JournalsController;
use App\Http\Controllers\JournalEntryController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\InventorymenuController;
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
        Route::post('/products/store', 'store')->name('products.store');
        Route::get('/products/edit/{id}', 'edit')->name('products.edit');
        Route::patch('/products/update/{id}', 'update')->name('products.update');
        Route::delete('/products/destroy/{id}', 'destroy')->name('products.destroy');
    });
});

Route::controller(VendorController::class)->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/vendors', 'index')->name('vendors');
        Route::get('/vendors/create', 'create')->name('vendors.create');
        Route::post('/vendors/store', 'store')->name('vendors.store');
        Route::get('/vendors/edit/{id}', 'edit')->name('vendors.edit');
        Route::patch('/vendors/update/{id}', 'update')->name('vendors.update');
        Route::delete('/vendors/destroy/{id}', 'destroy')->name('vendors.destroy');
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

Route::controller(CustomerController::class)->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/customers', 'index')->name('customers');
        Route::get('/customers/create', 'create')->name('customers.create');
        Route::post('/customers/store', 'store')->name('customers.store');
        Route::get('/customers/edit/{id}', 'edit')->name('customers.edit');
        Route::patch('/customers/update/{id}', 'update')->name('customers.update');
        Route::delete('/customers/destroy/{id}', 'destroy')->name('customers.destroy');
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
        Route::post('/journals/store', 'store')->name('journals.store');
        Route::get('/journals/edit/{id}', 'edit')->name('journals.edit');
        Route::patch('/journals/update/{id}', 'update')->name('journals.update');
        Route::delete('/journals/destroy/{id}', 'destroy')->name('journals.destroy');
    });
});

Route::controller(SettingsController::class)->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/settings', 'index')->name('settings');
    });
});

Route::controller(InventorymenuController::class)->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/inventorymenu', 'index')->name('inventorymenu');
    });
});

Route::controller(JournalEntryController::class)->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/journalentries', 'index')->name('journalentries');
        Route::get('/journalentries/create', 'create')->name('journalentries.create');
        Route::get('/journalentries/detail', 'detail')->name('journalentries.detail');
    });
});

Route::controller(COAController::class)->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/coa', 'index')->name('coa');
        Route::get('/coa/create', 'create')->name('coa.create');
        Route::post('/coa/store', 'store')->name('coa.store');
        Route::get('/coa/edit/{id}', 'edit')->name('coa.edit');
        Route::patch('/coa/update/{id}', 'update')->name('coa.update');
        Route::delete('/coa/destroy/{id}', 'destroy')->name('coa.destroy');
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

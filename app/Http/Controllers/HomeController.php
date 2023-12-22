<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Customer;
use App\Models\Vendor;
use App\Models\Product;
use App\Models\Brand;
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderLine;
use App\Models\SaleOrder;
use App\Models\SaleOrderLine;
use App\Models\User;
use App\Models\ChartOfAccount;

class HomeController extends Controller
{
    public function index()
    {   

        $data = [
            'customers' => Customer::all(),
            'vendors' => Vendor::all(),
            'products' => Product::all(),
            'brands' => Brand::all(),
            'purchase_orders' => PurchaseOrder::all(),
            'sale_orders' => SaleOrder::all(),
            'users' => User::all(),
            'chart_of_accounts' => ChartOfAccount::all(),
        ];

        return Inertia::render('Dashboard/Home/Index', $data);
    }

}
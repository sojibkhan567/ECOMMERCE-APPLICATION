<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // get lastest product in home page
    public function lastestProducts()
    {
        $products = Product::orderBy('created_at', 'DESC')
            ->where('status', 1)
            ->limit(8)
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $products
        ], 200);
    }

    // get featured product for home page
    public function featuredProducts()
    {
        $products = Product::orderBy('created_at', 'DESC')
            ->where('status', 1)
            ->where('is_featured', 'yes')
            ->limit(8)
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $products
        ], 200);
    }

    // get categories for shop page
    public function getCategories()
    {
        $categories = Category::orderBy('name', 'ASC')
            ->where('status', 1)
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $categories
        ], 200);
    }

    // get brands for shop page
    public function getBrands()
    {
        $brands = Brand::orderBy('name', 'ASC')
            ->where('status', 1)
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $brands
        ], 200);
    }

    // get product by category and brand for shop page
    public function getProducts(Request $request)
    {
        //dd($request->all());
        $products = Product::orderBy('created_at', 'DESC')
            ->where('status', 1);

        // filter product by category
        if (!empty($request->category)) {
            $catArray = explode(",", $request->category);
            $products = $products->whereIn('category_id', $catArray);
        }

        // filter product by brand
        if (!empty($request->brand)) {
            $brandArray = explode(",", $request->brand);
            $products = $products->whereIn('brand_id', $brandArray);
        }

        $products = $products->get();

        return response()->json([
            'status' => 200,
            'data' => $products
        ], 200);
    }
}

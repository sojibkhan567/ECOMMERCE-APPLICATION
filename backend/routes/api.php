<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\SizeController;
use App\Http\Controllers\Admin\TempImageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/admin/login', [AuthController::class, 'authenticate'])->name('auth.login');

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/categories', [CategoryController::class, 'index'])->name('category');
    Route::post('/categories', [CategoryController::class, 'store'])->name('category.store');
    Route::get('/categories/{id}', [CategoryController::class, 'show'])->name('category.category');
    Route::put('/categories/{id}', [CategoryController::class, 'update'])->name('category.update');
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->name('category.delete');

    Route::resource('/brands', BrandController::class);
    Route::resource('/sizes', SizeController::class);
    Route::resource('/products', ProductController::class);
    Route::post('/save-product-image', [ProductController::class, 'saveProductImage']);
    Route::get('/change-product-default-image', [ProductController::class, 'updateDefaultImage']);
    Route::delete('/delete-product-image/{id}', [ProductController::class, 'deleteProductImage']);

    Route::post('/temp-images', [TempImageController::class, 'store']);
});

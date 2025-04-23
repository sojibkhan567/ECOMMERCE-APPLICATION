<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductSize;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::orderBy('created_at', 'DESC')
            ->with(['product_images', 'product_sizes'])
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $products
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //validate request data
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'price' => 'required|numeric',
            'category_id' => 'required|integer',
            'sku' => 'required|unique:products,sku',
            'status' => 'required',
            'is_featured' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        }

        // store the product
        $product = new Product();
        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->sku = $request->sku;
        $product->qty = $request->qty;
        $product->description = $request->content;
        $product->short_description = $request->short_description;
        $product->status = $request->status;
        $product->barcode = $request->barcode;
        $product->is_featured = $request->is_featured;
        $product->save();

        // Save the product image
        if (!empty($request->gallery)) {
            foreach ($request->gallery as $key => $tempImageId) {

                $tempImage = TempImage::find($tempImageId);

                // Large thumbnail
                $extArray = explode('.', $tempImage->name);
                $ext = end($extArray);


                //$imageName = Str::random(4) . time() . '.' . $ext;
                $imageName =  'product_' . $tempImageId . '_' . now()->timestamp . Str::random(4) . '.' . $ext;


                $manager = new ImageManager(Driver::class);
                $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));

                $img->scaleDown(1200);
                $img->save(public_path('uploads/products/large/' . $imageName));

                /// Small thumbnail
                $manager = new ImageManager(Driver::class);
                $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                $img->coverDown(400, 460);
                $img->save(public_path('uploads/products/small/' . $imageName));

                // save product image to product_images table
                $productImage = new ProductImage();
                $productImage->image = $imageName;
                $productImage->product_id = $product->id;
                $productImage->save();

                if ($key == 0) {
                    $product->image = $imageName;
                    $product->save();
                }
            }
        }

        return response()->json([
            'status' => 200,
            'message' => 'Product has been created successfully.',
        ], 200);
    }
    /**
     * save product image to product table when update product
     */
    public function saveProductImage(Request $request)
    {
        //validate the request
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        }

        // move image to upload file
        $image = $request->file('image');
        $imageName = $request->product_id . '-' . time() . '.' . $image->extension(); // 3534354.jpg

        // large thumbnail
        $manager = new ImageManager(Driver::class);
        $img = $manager->read($image->getPathname());
        $img->scaleDown(1200);
        $img->save(public_path('uploads/products/large/' . $imageName));

        // small thumbnail
        $manager = new ImageManager(Driver::class);
        $img = $manager->read($image->getPathname());
        $img->scaleDown(400, 460);
        $img->save(public_path('uploads/products/small/' . $imageName));

        // Store the image
        $productImage = new ProductImage();
        $productImage->image = $imageName;
        $productImage->product_id = $request->product_id;
        $productImage->save();

        return response()->json([
            'status' => 200,
            'message' => 'Image has been uploaded successfully.',
            'data' => $productImage,
        ], 200);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::with(['product_images', 'product_sizes'])->find($id);

        if ($product == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found.',
                'data' => []
            ], 404);
        }

        $productSizes = $product->product_sizes()->pluck('size_id');

        return response()->json([
            'status' => 200,
            'data' => $product,
            'productSizes' => $productSizes,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //fetch product by id
        $product = Product::find($id);

        if ($product == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found.',
            ], 404);
        }

        //validate request data
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'price' => 'required|numeric',
            'category_id' => 'required|integer',
            'sku' => 'required|unique:products,sku,' . $id . ',id',
            'status' => 'required',
            'is_featured' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        }

        // store the product
        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->sku = $request->sku;
        $product->qty = $request->qty;
        $product->description = $request->content;
        $product->short_description = $request->short_description;
        $product->status = $request->status;
        $product->is_featured = $request->is_featured;
        $product->save();

        // store product sizes
        if (!empty($request->sizes)) {
            ProductSize::where('product_id', $product->id)->delete();
            foreach ($request->sizes as $key => $sizeId) {
                $productSize = new ProductSize();
                $productSize->size_id = $sizeId;
                $productSize->product_id = $product->id;
                $productSize->save();
            }
        }

        // // Save the product image
        // if (!empty($request->gallery)) {
        //     foreach ($request->gallery as $key => $tempImageId) {
        //         $tempImage = TempImage::find($tempImageId);

        //         // Large thumbnail
        //         $extArray = explode('.', $tempImage->name);
        //         $ext = end($extArray);

        //         $imageName = 'product_img_' . time() . '.' . $ext;
        //         $manager = new ImageManager(Driver::class);
        //         $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
        //         $img->scaleDown(1200);
        //         $img->save(public_path('uploads/products/large/' . $imageName));

        //         // Small thumbnail
        //         $manager = new ImageManager(Driver::class);
        //         $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
        //         $img->coverDown(400, 460);
        //         $img->save(public_path('uploads/products/small/' . $imageName));



        //         if ($key == 0) {
        //             $product->image = $imageName;
        //             $product->save();
        //         }
        //     }
        // }

        return response()->json([
            'status' => 200,
            'message' => 'Product has been updated successfully.',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::with('product_images')->find($id);

        if ($product == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found.',
                'data' => []
            ], 404);
        }

        if ($product->product_images) {
            foreach ($product->product_images as $productImage) {
                $largePath = public_path('uploads/products/large/' . $productImage->image);
                $smallPath = public_path('uploads/products/small/' . $productImage->image);

                if (File::exists($largePath)) {
                    File::delete($largePath);
                }

                if (File::exists($smallPath)) {
                    File::delete($smallPath);
                }
            }
        }

        // Now delete the product and its related images from DB
        $product->product_images()->delete();
        $product->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Product has been deleted successfully.',
            'data' => $product
        ], 200);
    }

    // default product image method
    public function updateDefaultImage(Request $request)
    {
        $product = Product::find($request->product_id);
        $product->image = $request->image;
        $product->save();

        return response()->json([
            'status' => 200,
            'message' => "Product default image changed successfully.",
        ], 200);
    }

    // delete products images
    public function deleteProductImage($id)
    {
        $productImage = ProductImage::find($id);

        if ($productImage == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found.'
            ], 404);
        }

        File::delete(public_path('uploads/products/large/' . $productImage->image));
        File::delete(public_path('uploads/products/small/' . $productImage->image));

        $productImage->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Product image deleted successfully.'
        ], 200);
    }
}

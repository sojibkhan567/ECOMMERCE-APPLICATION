<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Size;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SizeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sizes = Size::orderBy('name', 'ASC')->get();

        return response()->json([
            'status' => 200,
            'data' => $sizes
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:sizes'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ], 400);
        }

        $size = new Size();
        $size->name = $request->name;
        $size->save();

        return response()->json([
            'status' => 200,
            'message' => 'Product size has been created successfully.',
            'data' => $size
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $size = Size::find($id);

        if ($size == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Size not found.',
                'data' => []
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $size
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
        $size = Size::find($id);

        if ($size == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Brand not found.',
                'data' => []
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ], 400);
        }

        $size->name = $request->name;
        $size->save();

        return response()->json([
            'status' => 200,
            'message' => 'Product size has been updated successfully.',
            'data' => $size
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $size = Size::find($id);

        if ($size == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Size not found.',
                'data' => []
            ], 404);
        }

        $size->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Product size has been deleted successfully.',
        ], 200);
    }
}

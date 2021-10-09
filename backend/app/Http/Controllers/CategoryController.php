<?php

namespace App\Http\Controllers;

use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * HTTP Method : GET
     * URL : /categories
     */
    public function list()
    {
        return response()->json(Category::all(), 200);
    }
}

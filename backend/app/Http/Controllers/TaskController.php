<?php

namespace App\Http\Controllers;

use App\Models\Task;

class TaskController extends Controller
{
    /**
     * HTTP Method : GET
     * URL : /tasks
     */
    public function list()
    {
        return response()->json(Task::all()->load('category'), 200);
    }
}

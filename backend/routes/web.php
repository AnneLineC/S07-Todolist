<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

//======================================
// MainController
//======================================

$router->get(
    '/',
    [
        'uses' => 'MainController@home',
        'as'   => 'main-home'
    ]
  );


//======================================
// CategoryController
//======================================

$router->get(
    '/categories',
    [
        'uses' => 'CategoryController@list',
        'as'   => 'category-list'
    ]
);

//======================================
// TaskController
//======================================

$router->get(
    '/tasks',
    [
        'uses' => 'TaskController@list',
        'as'   => 'task-list'
    ]
);

$router->post(
    '/tasks',
    [
        'uses' => 'TaskController@add',
        'as'   => 'task-add'
    ]
);

$router->patch(
    '/tasks/{id}',
    [
        'uses' => 'TaskController@update',
        'as'   => 'task-update'
    ]
);

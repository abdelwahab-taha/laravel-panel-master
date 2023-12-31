<?php

use Illuminate\Support\Facades\Route;
use Modules\MasterUi\app\Http\Controllers\MasterUiController;
use Modules\MasterUi\app\Http\Middleware\MasterAuthKeeper;

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

Route::middleware(MasterAuthKeeper::class)->group(function () {
    Route::get("master/login", [MasterUiController::class, 'login']);
    Route::get("master/dashboard", [MasterUiController::class, 'dashboard']);
    Route::get("master/", [MasterUiController::class, 'dashboard']);
});

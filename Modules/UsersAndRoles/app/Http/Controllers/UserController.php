<?php

namespace Modules\UsersAndRoles\app\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use app\Services\Response\ResponseService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Modules\UsersAndRoles\app\Models\User;

class UserController extends Controller
{
    public array $data = [];

    public function auth(AuthRequest $request): JsonResponse
    {
        dd();
        return ResponseService::jsonError($request);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $list = User::filter($request);
        return ResponseService::json($this->data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        //

        return ResponseService::json($this->data);
    }

    /**
     * Show the specified resource.
     */
    public function show($id): JsonResponse
    {
        //

        return ResponseService::json($this->data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        //

        return ResponseService::json($this->data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        //

        return ResponseService::json($this->data);
    }
}

<?php

namespace app\Services\Response;

use Illuminate\Http\JsonResponse;

class ResponseService
{

    public static function json(object|array $response): JsonResponse
    {
        return response()->json($response);
    }

    public static function jsonError(string $response): JsonResponse
    {
        $response = ['pass' => false, 'message' => $response];
        return response()->json($response);
    }

    public static function jsonSuccess(string $response): JsonResponse
    {
        $response = ['pass' => true, 'message' => $response];
        return response()->json($response);
    }

}

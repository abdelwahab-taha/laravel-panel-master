<?php

namespace Modules\MasterUi\app\Http\Middleware;

use Illuminate\Support\Facades\Auth;

class MasterAuthKeeper
{

    public function handle($request, $next)
    {
        if(!str_contains($request->url(), "master/login") && (!Auth::check() || !Auth::user()->hasRole('master')))
            return redirect("master/login");
        return $next($request);
    }


}

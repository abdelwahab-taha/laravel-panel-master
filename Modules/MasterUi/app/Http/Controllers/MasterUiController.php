<?php

namespace Modules\MasterUi\app\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Application;
use Illuminate\View\Factory;
use Illuminate\View\View;

class MasterUiController extends Controller
{
    private string $module ="masterui";

    public function dashboard(): View|Application|Factory
    {
        return $this->loadView("dashboard");
    }

    public function login(): View|Application|Factory
    {
        return $this->loadView("login");
    }

    private function loadView(string $name): View|Application|Factory
    {
        return view($this->module . '::' . $name);

    }

}

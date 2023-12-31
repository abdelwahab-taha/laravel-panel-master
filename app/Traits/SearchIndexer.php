<?php

namespace App\Traits;

use app\Services\ModelsDataHandler\SearchFilterService;
use Illuminate\Database\Eloquent\Builder;

trait SearchIndexer
{
    public function scopeFilter($query, $request): Builder
    {
        $searches = [];
        foreach ($this->fillable as $item){
            if($request->{$item}) $searches[$item] = $request->{$item};
        }
        return SearchFilterService::prepare($query, $searches);
    }
}

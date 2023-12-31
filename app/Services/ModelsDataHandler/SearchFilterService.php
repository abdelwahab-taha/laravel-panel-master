<?php

namespace app\Services\ModelsDataHandler;

use Illuminate\Database\Eloquent\Builder;

class SearchFilterService
{
    private static array $searchCases = [
        'like' => '/^like:(.*)$/',
        'between' => '/^between:(.*),(.*)$/',
        '>' => '/^graterThan:(.*)$/',
        '<' => '/^lessThan:(.*)$/',
        '>=' => '/^graterThanOrEquals:(.*)$/',
        '<=' => '/^lessThanOrEquals:(.*)$/',
        '<>' => '/^notEquals:(.*)$/',
        'in' => '/^in:(.*)$/',
        'not_in' => '/^notIn:(.*)$/',
        'has' => '/^has:(.*),(.*)$/'
    ];

    public static function prepare(Builder $query, array $searches): Builder
    {
        foreach ($searches as $key => $search){
            self::prepareSearchCase($query, $key, $search);
        }
        return $query;
    }

    private static function prepareSearchCase(Builder $query, string $key, string $search): void
    {
        $searchCase = self::getSearchCase($search);
        switch ($searchCase["operator"]){
            case 'like':
                $query->where($key, 'LIKE', $searchCase["matches"]);
                break;
            case 'between':
                $query->whereBetween($key, $searchCase["matches"]);
                break;
            case 'in':
                $query->whereIn($key, self::arrayValues($searchCase["matches"]));
                break;
            case 'not_in':
                $query->whereNotIn($key, self::arrayValues($searchCase["matches"]));
                break;
            case 'has':
                $values = self::prepareSecondLevelQuery($searchCase["matches"]);
                $query->whereHas($key, function ($subQuery) use($values){
                     self::prepareSearchCase($subQuery, $values["key"], $values["values"]);
                });
                break;
            case 'null':
                $query->whereNull($key);
                break;
            case 'not_null':
                $query->whereNotNull($key);
                break;
            default:
                $query->where($key, $searchCase["operator"], $searchCase["matches"]);
        }
    }

    private static function prepareSecondLevelQuery(string $string): array
    {
        $string = explode("=", $string);
        return ["key" => $string[0], "value" => str_replace(['[', ']'], '', $string[1])];
    }

    private static function getSearchCase(string $value): array
    {
        if($value == "null" || $value == "not_null") return ["operator" => $value, "matches" => []];
        foreach (self::$searchCases as $operator => $case){
            if($value && preg_match($case, $value, $matches)) return ["operator" => $operator, "matches" => $matches];
        }
        return ["operator" => "=", "matches" => $value];
    }

    private static function arrayValues(string $values): array
    {
        return array_map(fn($value) => trim($value), explode(",", $values));
    }

}

<?php

namespace Modules\UsersAndRoles\app\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property mixed|string[] $translatable
 */
class Role extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $table = "roles";

    protected $fillable = [
        'key',
        "name"
    ];

    public function users(): HasManyThrough
    {
        return $this->hasManyThrough(User::class, UserRole::class);
    }

    public function attributes(): HasMany
    {
        return $this->hasMany(RoleAttribute::class);
    }

    public function values(): HasMany
    {
        return $this->hasMany(RoleAttributeValue::class);
    }

}

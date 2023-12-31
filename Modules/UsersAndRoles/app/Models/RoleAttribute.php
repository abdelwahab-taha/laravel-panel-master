<?php

namespace Modules\UsersAndRoles\app\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property mixed|string[] $translatable
 */
class RoleAttribute extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $table = "role_attributes";

    protected $fillable = [
        'role_id',
        'key',
        'name',
        'input_scenario',
        'order',
        "is_hidden",
        'is_required',
        'is_multiple'
    ];

    protected $casts = [
        'is_hidden' => 'boolean',
        'is_required' => 'boolean',
        'is_multiple' => 'boolean'
    ];

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

}

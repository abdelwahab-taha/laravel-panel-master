<?php

namespace Modules\UsersAndRoles\app\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property mixed|string[] $translatable
 */
class RoleAttributeValue extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $table = "role_attribute_values";

    protected $fillable = [
        'role_id',
        'attribute_id',
        'value'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function attribute(): BelongsTo
    {
        return $this->belongsTo(RoleAttribute::class);
    }

}

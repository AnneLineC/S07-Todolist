<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /**
     * Relation one to many (inversée) avec les les catégeories
     */
    public function categories()
    {
      return $this->belongsTo( 'App\Models\Category' );
    }
}

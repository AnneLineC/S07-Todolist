<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /**
     * Relation one to many avec les tâches
     */
    public function task()
    {
      return $this->hasMany( 'App\Models\Task' );
    }
}

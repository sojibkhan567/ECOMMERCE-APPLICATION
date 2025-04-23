<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use Sluggable;

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if ($this->image == "") {
            return "";
        }

        return asset('/uploads/products/small/' . $this->image);
    }

    // get product images
    public function product_images()
    {
        return $this->hasMany(ProductImage::class);
    }
    // get product size
    public function product_sizes()
    {
        return $this->hasMany(ProductSize::class);
    }
}

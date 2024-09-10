<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Url extends Model
{
    use HasFactory;

    protected $fillable = [
        'original_url', 
        'shortened_url',
        'is_build_utm',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content',
        'utm_id',
        'user_id',
        'comments',
        'password',
    ];

    public function buildUtmUrl($data) {
        if (empty($data['original_url'])) {
            return null;
        }
    
        if (empty($data['is_build_utm']) || !$data['is_build_utm']) {
            return $data['original_url']; // Si no se debe construir UTM, devolver la URL original
        }
    
        $hasQuery = strpos($data['original_url'], '?') !== false;
    
        $utmKeys = ['utm_id', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
        $utmParams = array_filter(
            array_map(function($key) use ($data) {
                return !empty($data[$key]) ? $key . '=' . urlencode($data[$key]) : '';
            }, $utmKeys)
        );
    
        $utmString = implode('&', $utmParams);
    
        if (empty($utmString)) {
            return $data['original_url'];
        }
    
        return $data['original_url'] . ($hasQuery ? '&' : '?') . $utmString;
    }
    
}

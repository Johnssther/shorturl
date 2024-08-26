<?php

namespace App\Http\Controllers;

use App\Models\Url;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UrlController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'original_url' => 'required|url',
        ]);

        $shortenedUrl = Str::random(6);

        Url::create([
            'original_url' => $request->original_url,
            'shortened_url' => $shortenedUrl,
        ]);

        return response()->json(['shortened_url' => url($shortenedUrl)], 201);
    }

    public function redirect($shortenedUrl)
    {
        $url = Url::where('shortened_url', $shortenedUrl)->firstOrFail();
        return redirect($url->original_url);
    }
}

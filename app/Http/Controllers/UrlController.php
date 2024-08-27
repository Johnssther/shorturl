<?php

namespace App\Http\Controllers;

use App\Models\Url;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use DB, Log;

class UrlController extends Controller
{
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $shortenedUrl = Str::random(6);
    
            Url::create([
                'original_url' => $request->originalUrl,
                'shortened_url' => $shortenedUrl,
            ]);

            DB::commit();
            return redirect(route('welcome'));

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Error store role {$e->getMessage()}");
        }
    }

    public function redirect($shortenedUrl)
    {
        $url = Url::where('shortened_url', $shortenedUrl)->firstOrFail();
        return redirect($url->original_url);
    }
}

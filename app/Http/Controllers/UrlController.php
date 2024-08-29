<?php

namespace App\Http\Controllers;

use App\Models\Url;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use DB, Log;
use Inertia\Inertia;

class UrlController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $data = Url::where('user_id', $user->id)->get();
        return Inertia::render('Urls/Index', [
            'urls' => $data,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Urls/Create');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $shortenedUrl = Str::random(6);

            if($request->filled('shortened_url')) {
                $lowercase = strtolower($request->shortened_url);
                $result = str_replace(' ', '_', $lowercase);
                $shortenedUrl = trim($result);
            }
            if($request->user() == null) {
                $userId = null;
            } else {
                $userId = $request->user()->id;
            }
            
            Url::create([
                'original_url' => $request->originalUrl,
                'shortened_url' => $shortenedUrl,
                'user_id' => $userId,
            ]);

            DB::commit();
            return redirect(route('urls.index'));

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Error store role {$e->getMessage()}");
        }
    }

    public function redirect(Request $request, $shortenedUrl)
    {
        $url = Url::where('shortened_url', $shortenedUrl)->firstOrFail();
        return redirect($url->original_url);
    }

    /**
     * Display a listing of the resource.
     */
    public function linksindex(Request $request)
    {
        $user = $request->user();

        $data = Url::where('user_id', $user->id)->get();
        return Inertia::render('Urls/Index', [
            'urls' => $data,
        ]);
    }

    public function linkstore(Request $request)
    {
        DB::beginTransaction();
        try {
            $shortenedUrl = Str::random(6);

            if($request->filled('shortened_url')) {
                $lowercase = strtolower($request->shortened_url);
                $result = str_replace(' ', '_', $lowercase);
                $shortenedUrl = trim($result);
            }
            if($request->user() == null) {
                $userId = null;
            } else {
                $userId = $request->user()->id;
            }
            
            Url::create([
                'original_url' => $request->originalUrl,
                'shortened_url' => $shortenedUrl,
                'user_id' => $userId,
            ]);

            DB::commit();
            return redirect(route('welcome'));

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Error store role {$e->getMessage()}");
        }
    }
}

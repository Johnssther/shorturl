<?php

namespace App\Http\Controllers;

use App\Models\Url;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Http\RedirectResponse;
use DB, Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

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
     * Store the form for editing the specified resource.
     */
    public function store(Request $request)
    {
        $request->validate([
            'original_url' => 'required|string',
            'shortened_url' => 'nullable|max:16',
        ]);

        DB::beginTransaction();
        try {
            $shortenedUrl = Str::random(6);

            if ($request->filled('shortened_url')) {
                $lowercase = strtolower($request->shortened_url);
                $result = str_replace(' ', '_', $lowercase);
                $shortenedUrl = trim($result);
            }
            if ($request->user() == null) {
                $userId = null;
            } else {
                $userId = $request->user()->id;
            }

            $url = new Url();
            $url->original_url = $request->original_url;
            $url->shortened_url = $shortenedUrl;
            $url->user_id = $userId;
            $url->is_build_utm = $request->is_build_utm;
            $url->utm_id = $request->utm_id;
            $url->utm_source = $request->utm_source;
            $url->utm_medium = $request->utm_medium;
            $url->utm_campaign = $request->utm_campaign;
            $url->utm_term = $request->utm_term;
            $url->utm_content = $request->utm_content;
            $url->comments = $request->comments;
            $url->password = $request->password;
            $url->save();

            DB::commit();
            return redirect(route('urls.index'));
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Error store role {$e->getMessage()}");
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Url $url)
    {
        return Inertia::render('Urls/Create', [
            'url' => $url
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function update(Url $url, Request $request)
    {
        $request->validate([
            'original_url' => 'required|string',
            'shortened_url' => 'nullable|max:16',
        ]);

        DB::beginTransaction();
        try {
            $url->original_url = $request->original_url;
            $url->is_build_utm = $request->is_build_utm;
            $url->utm_source = $request->utm_source;
            $url->utm_medium = $request->utm_medium;
            $url->utm_campaign = $request->utm_campaign;
            $url->utm_term = $request->utm_term;
            $url->utm_content = $request->utm_content;
            $url->utm_id = $request->utm_id;
            $url->comments = $request->comments;
            // $url->password = Hash::make($request->password);
            $url->password = $request->password;
            $url->save();

            DB::commit();
            return redirect(route('urls.index'));
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Error update url {$e->getMessage()}");
        }
    }

    public function destroy(Request $request, Url $url): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $url->delete();
        return redirect(route('urls.index'));
    }

    public function clone($id)
    {
        $url = Url::findOrFail($id);
        $clonedUrl = $url->replicate();
        $clonedUrl->shortened_url = Str::random(6);
        $clonedUrl->save();
        return redirect()->route('urls.edit', $clonedUrl->id);
    }

    public function redirect(Request $request, $shortenedUrl)
    {
        $url = Url::where('shortened_url', $shortenedUrl)->firstOrFail();
        $urlredirect = $url->buildUtmUrl($url->toArray());

        if($request->filled('r')) {
            if($request->r == 'qr') {
                $url->scans = $url->scans + 1;
            }
        } else {
            $url->clicks = $url->clicks + 1;
        }
        $url->save();

        $password = (bool) $url->password;
        if ($password) {
            return Inertia::render('Urls/RedirectPass', [
                'url' => $url,
                'urlredirect' => $urlredirect
            ]);
        }
        $expired = false;
        if ($expired) {
            return Inertia::render('Urls/RedirectExpired', [
                'url' => $url,
                'urlredirect' => $urlredirect
            ]);
        }

        if ($url instanceof Url) {
            return redirect($urlredirect);
        }
        abort(404);
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

            if ($request->filled('shortened_url')) {
                $lowercase = strtolower($request->shortened_url);
                $result = str_replace(' ', '_', $lowercase);
                $shortenedUrl = trim($result);
            }
            if ($request->user() == null) {
                $userId = null;
            } else {
                $userId = $request->user()->id;
            }

            Url::create([
                'original_url' => $request->original_url,
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

    public function verifyPassword(Request $request, $id)
    {
        $url = Url::findOrFail($id);
        
        if($url->password == $request->password) {
            $urlredirect = $url->buildUtmUrl($url->toArray());
            return Inertia::location($urlredirect);
        } else {
            return back()->withErrors(['password' => 'Invalid password.']);
        }

    }
}

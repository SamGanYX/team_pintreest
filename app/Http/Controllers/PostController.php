<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): View
    {
        return view('posts.index', [
            'posts' => Post::with('user')->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request, post $post)
    {
        
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'message' => 'required|string|max:255',
            'image' => 'required|image',
        ]);
 
        $imageName = time().'.'.$request->image->extension();
        $request->image->move(public_path('images'), $imageName);

        $data = [
            'title'=>$request->title,
            'message'=>$request->message,
            'image_name' => $imageName,
        ];

        $request->user()->posts()->create($data);
 
        return redirect(route('posts.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(post $post)
    {
        return view('posts.show', [
            'post' => $post,
            'slug' => $post->id,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(post $post) :view
    {
        $this->authorize('update', $post);
 
        return view('posts.edit', [
            'post' => $post,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, post $post): RedirectResponse
    {
        $this->authorize('update', $post);
 
        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);
 
        $post->update($validated);
 
        return redirect(route('posts.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post): RedirectResponse
    {
        $this->authorize('delete', $post);
 
        $post->delete();
 
        return redirect(route('posts.index'));
    }
}

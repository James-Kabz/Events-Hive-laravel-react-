<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        // $roles = Role::get();
        return Inertia::render('roles/index', [
            'roles' => Role::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('roles/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required',
            'string',
            'unique:roles,name'],
        ]);

        Role::create([
            'name'=> $request->name,
        ]);

        return Inertia::render('roles/index');
    }

    // delete role
    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();
        return Inertia::render('roles.index');
    }
}

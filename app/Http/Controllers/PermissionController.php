<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller 
{
    // public static function middleware():array
    // {
    //     return [
    //         new Middleware('permission:view permission',only: ['index']),
    //         new Middleware('permission:delete permission',only: ['destroy']),
    //         new Middleware('permission:create permission',only: ['create','store']),
    //         new Middleware('permission:edit permission',only: ['update','store']),
    //     ];
    // }
    public function index ()
    {
        $permissions = Permission::latest()->get();

        return Inertia::render('Permissions/Index', [
            'permissions' => $permissions
        ]);
    }

    public function create ()
    {
        return Inertia::render('Permissions/Create');
    }

    public function store (Request $request)
    {
        $request->validate([
            'name' => [
                'required',
                'string',
                'unique:permissions,name'
            ]
        ]);

        Permission::create([
            'name' => $request->name
        ]);

        return redirect()->route('permissions.index')->with('success', 'Permission created successfully!');
    }

    public function edit($id)
    {
        $permission = Permission::findOrFail($id);

        return Inertia::render('Permissions/Edit', [
            'permission' => $permission
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => [
                'required',
                'string',
                'unique:permissions,name,' . $id
            ]
        ]);

        $permission = Permission::findOrFail($id);
        $permission->update([
            'name' => $request->name
        ]);

        return redirect()->route('permissions.index')->with('success', 'Permission updated successfully!');
    }

    public function destroy ($id)
    {
        $permission = Permission::findOrFail($id);
        $permission->delete();

        return redirect()->route('permissions.index')->with('success', 'Permission deleted successfully!');
    }

}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        
        return Inertia::render('Users/Index', [
            'users'=> $users
        ]);
    }

    public function assignRole($userId)
    {
        $user = User::find($userId);

        $roles = Role::all();

        $userRoles = $user->roles->pluck('name')->toArray();

        return Inertia::render('Users/AssignRole' ,[
            'user' => $user,
            'roles'=> $roles,
            'userRoles'=> $userRoles
        ]);
    }

    public function updateRole($userId, Request $request)
    {
        $request->validate(['roles' =>'array']);

        $user = User::findOrFail($userId);
        $user->syncRoles($request->roles);

        return redirect()->route('users.index');
    }
}

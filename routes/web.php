<?php

use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('roles' ,RoleController::class);
    Route::get('roles/{id}/delete',[ RoleController::class, 'destroy']);
    
    // permissions
    Route::resource('permissions', PermissionController::class);
    Route::get('permissions/{id}/delete', [PermissionController::class,'destroy']);

    // role-permission
    Route::get('roles/{roleId}/give-permissions', [RoleController::class, 'addPermissionToRole']);
    Route::put('roles/{roleId}/give-permissions', [RoleController::class, 'givePermissionToRole']);

    // assign-roles
    Route::get('users', [UserController::class,'index'])->name('users.index');
    Route::get('/users/{user}/assign-role', [UserController::class, 'assignRole'])->name('users.assign-role');
    Route::put('/users/{user}/assign-role', [UserController::class, 'updateRole'])->name('users.update-role');
});

// roles routes


// Route::get('/roles/{id}/edit', function () {
//     return Inertia::render('role-permission/roles/edit');
// })->name('role-permission.roles.edit');
// Route::delete('/roles/{id}', function () {
//     return Inertia::render('role-permission/roles');
// })->name('role-permission.role.delete');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

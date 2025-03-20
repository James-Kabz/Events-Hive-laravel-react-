<?php

use App\Http\Controllers\RoleController;
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
    // Route::get('roles', function () {
    //     return Inertia::render('roles/index');
    // })->name('roles.index');
    // Route::get('/roles/create', function () {
    //     return Inertia::render('roles/create');
    // })->name('roles.create');
    // Route::post('roles', function (){
    //     return Inertia::render('');
    // })->name('roles.store');
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

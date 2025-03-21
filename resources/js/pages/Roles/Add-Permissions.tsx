import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Permission {
    id: number;
    name: string;
}

interface Role {
    id: number;
    name: string;
}

interface PageProps extends InertiaPageProps {
    roles: Role; // Changed from role to roles to match controller
    permissions: Permission[];
    rolePermissions: Record<string, number>; // Changed to match the pluck structure
    status?: string;
    errors: {
        permission?: string;
    };
}

const breadcrumbs = [
    {
        title: "Roles",
        href: "/roles",
    },
    {
        title: "Edit Permissions",
        href: "#",
    },
];

export default function RolePermissionsPage() {
    // Destructure roles (not role) to match your controller
    const { roles: role, permissions, rolePermissions, errors } = usePage<PageProps>().props;

    // Get permission IDs as numbers from the object keys
    const rolePermissionIds = Object.keys(rolePermissions || {}).map(Number);

    const { data, setData, put, processing } = useForm({
        permission: permissions
            .filter(p => rolePermissionIds.includes(p.id))
            .map(p => p.name),
    });

    const handlePermissionChange = (permissionName: string, checked: boolean) => {
        const updatedPermissions = checked
            ? [...data.permission, permissionName]
            : data.permission.filter(p => p !== permissionName);

        setData('permission', updatedPermissions);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/roles/${role.id}/give-permissions`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Role: ${role.name}`} />

            <div className="container mt-5">
                <div className="w-full">
                   

                    <Card className="bg-white shadow-md rounded-md overflow-hidden">
                        <CardHeader className="px-4 py-5 flex justify-between items-center border-b border-gray-200">
                            <h4 className="text-xl font-semibold text-gray-700">
                                Role: {role.name}
                            </h4>
                            <Button
                                variant="destructive"
                                onClick={() => window.location.href = '/roles'}
                            >
                                Back
                            </Button>
                        </CardHeader>

                        <CardContent className="px-4 py-5">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    {errors.permission && (
                                        <span className="text-red-500">{errors.permission}</span>
                                    )}

                                    <Label className="text-gray-700 font-medium block mb-2">
                                        Permissions
                                    </Label>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        {permissions.map((permission) => (
                                            <div key={permission.id} className="flex items-center">
                                                <Checkbox
                                                    id={`permission-${permission.id}`}
                                                    name="permission[]"
                                                    value={permission.name}
                                                    checked={data.permission.includes(permission.name)}
                                                    onCheckedChange={(checked) =>
                                                        handlePermissionChange(permission.name, checked as boolean)
                                                    }
                                                    className="w-4 h-4 mr-3 text-red-600 focus:ring-red-500 rounded-sm"
                                                />
                                                <Label
                                                    htmlFor={`permission-${permission.id}`}
                                                    className="text-gray-700 font-medium"
                                                >
                                                    {permission.name}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <Button
                                        type="submit"
                                        className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 shadow-sm"
                                        disabled={processing}
                                    >
                                        Update
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
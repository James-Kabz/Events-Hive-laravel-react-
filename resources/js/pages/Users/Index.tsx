import { usePage, Link, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { BreadcrumbItem, User } from '@/types';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

interface PageProps extends InertiaPageProps {
    users: User[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Users', href: '/users' },
];

export default function UserIndex() {
    const { users } = usePage<PageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">User Management</h1>
                <Link href="/users/create">
                    <Button className="bg-blue-500 text-white px-4 py-2 rounded">
                        Create User
                    </Button>
                </Link>
            </div>

            <Table className="mt-4">
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Roles</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                {user.roles.map((role) => (
                                    <span key={role.id} className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded mr-1">
                                        {role.name}
                                    </span>
                                ))}
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                                <Link href={`/users/${user.id}/assign-role`}>
                                    <Button className="bg-green-500 text-white px-2 py-1 rounded">
                                        Assign Roles
                                    </Button>
                                </Link>
                                {/* <Link href={`/users/${user.id}/edit`}>
                                    <Button className="bg-yellow-500 text-white px-2 py-1 rounded">
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => alert(`Delete User ID: ${user.id}`)}
                                >
                                    Delete
                                </Button> */}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AppLayout>
    );
}

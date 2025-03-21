import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@headlessui/react";
import { MouseEvent } from "react";

// Define the Role interface
interface Role {
    id: number;
    name: string;
}

// Extend Inertia's PageProps
interface PageProps extends InertiaPageProps {
    roles: Role[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Roles",
        href: "/Roles",
    },
];

export default function RolesPage() {
    const { roles } = usePage<PageProps>().props;
    const { delete: destroy } = useForm();
    
    const handleDelete = (e: MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        
        if (confirm("Are you sure you want to delete this role?")) {
            destroy(route('roles.destroy', id));
        }
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Roles</h1>
                <Link href="/roles/create">
                    <Button className="bg-blue-500 text-white px-4 py-2 rounded">
                        Create Role
                    </Button>
                </Link>
            </div>
            
            <Table className="mt-4">
                <TableHeader>
                    <TableRow>
                        <TableHead>Role Name</TableHead>
                        <TableHead className="w-80 text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {roles?.map((role) => (
                        <TableRow key={role.id}>
                            <TableCell>{role.name}</TableCell>
                            <TableCell className="text-right space-x-2">
                            <Link href={`/roles/${role.id}/give-permissions`}>
                                    <Button className="bg-green-500 text-white px-2 py-1 rounded">
                                       Add/Edit RolePemission
                                    </Button>
                                </Link>
                                <Link href={`/roles/${role.id}/edit`}>
                                    <Button className="bg-yellow-500 text-white px-2 py-1 rounded">
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={(e) => handleDelete(e, role.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AppLayout>
    );
}
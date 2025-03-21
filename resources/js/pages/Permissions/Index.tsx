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

// Define the Permission interface
interface Permission {
    id: number;
    name: string;
}

// Extend Inertia's PageProps
interface PageProps extends InertiaPageProps {
    permissions: Permission[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Permissions",
        href: "/Permissions",
    },
];

export default function PermissionsPage() {
    const { permissions } = usePage<PageProps>().props;
    const { delete: destroy } = useForm();
    
    const handleDelete = (e: MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        
        if (confirm("Are you sure you want to delete this permission?")) {
            destroy(route('permissions.destroy', id));
        }
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permissions" />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Permissions</h1>
                <Link href="/permissions/create">
                    <Button className="bg-blue-500 text-white px-4 py-2 rounded">
                        Create Permission
                    </Button>
                </Link>
            </div>
            
            <Table className="mt-4">
                <TableHeader>
                    <TableRow>
                        <TableHead>Permission Name</TableHead>
                        <TableHead className="w-80 text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {permissions?.map((permission) => (
                        <TableRow key={permission.id}>
                            <TableCell>{permission.name}</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Link href={`/permissions/${permission.id}/edit`}>
                                    <Button className="bg-yellow-500 text-white px-2 py-1 rounded">
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={(e) => handleDelete(e, permission.id)}
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
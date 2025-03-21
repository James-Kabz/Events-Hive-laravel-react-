import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Role } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { PageProps as InertiaPageProps } from "@inertiajs/core";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
    {
        title: 'Edit Role',
        href: '/roles/edit',
    },
];
interface PageProps extends InertiaPageProps {
    role: Role;
}

interface RoleForm {
    name: string;
}

export default function RoleEdit() {
    const { role } = usePage<PageProps>().props;
    const { data, setData, put, processing, errors } = useForm<Required<RoleForm>>({
        name: role.name || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('roles.update', role.id), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Role" />
            <form onSubmit={submit} method="post">
                <div>
                    <label htmlFor="name">Name</label>
                    <Input
                        id="name"
                        type="text"
                        required
                        autoFocus
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} />
                </div>

                <Button type="submit" className="mt-4 w-full" disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Update Role
                </Button>
            </form>
        </AppLayout>
    );
}

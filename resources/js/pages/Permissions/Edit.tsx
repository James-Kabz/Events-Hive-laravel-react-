import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Permission } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { PageProps as InertiaPageProps } from "@inertiajs/core";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Permission',
        href: '/permissions',
    },
    {
        title: 'Edit Permission',
        href: '/permissions/edit',
    },
];
interface PageProps extends InertiaPageProps {
    permission: Permission;
}

interface PermissionForm {
    name: string;
}

export default function PermissionEdit() {
    const { permission } = usePage<PageProps>().props;
    const { data, setData, put, processing, errors } = useForm<Required<PermissionForm>>({
        name:  permission.name || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('permissions.update', permission.id), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Permission" />
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
                    Update Permission
                </Button>
            </form>
        </AppLayout>
    );
}

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { 
        title: 'Permissions',
        href: '/Permissions' 
    },{ 
        title: 'Permissions Create',
        href: '/Permissions/Create' 
    }];
interface PermissionForm {
    name: string;
}
export default function PermissionCreate() {
    const {data, setData,post, processing, errors} = useForm<Required<PermissionForm>>({
        name: '',
    })
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('permissions.store'), {
            // preserveScroll:true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Permission" />
            <form onSubmit={submit} method="post">
                <div>
                    <label htmlFor="name">Name</label>
                    <Input
                    id='name'
                    type='text'
                    required
                    autoFocus
                    tabIndex={1}
                    autoComplete='name'
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message= {errors.name}/>
                </div>

                <Button type='submit' className='mt-4 w-full' tabIndex={2} disabled={processing}>
                    {processing && <LoaderCircle className='h-4 w-4 animated-spin' />}
                    Create Permission
                </Button>
            </form>
        </AppLayout>
    );
}

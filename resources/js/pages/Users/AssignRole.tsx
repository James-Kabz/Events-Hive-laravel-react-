import { useForm, usePage, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { BreadcrumbItem, Role, User } from '@/types';

interface PageProps extends InertiaPageProps {
    user: User;
    roles: Role[];
    userRoles: string[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Users', href: '/users' },
    { title: 'Assign Role', href: '/users/assign-role' },
];

export default function AssignRole() {
    const { user, roles, userRoles } = usePage<PageProps>().props;
    const { data, setData, put, processing } = useForm({
        roles: userRoles || [],
    });

    const handleCheckboxChange = (roleName: string) => {
        setData('roles', data.roles.includes(roleName)
            ? data.roles.filter(role => role !== roleName)
            : [...data.roles, roleName]
        );
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('users.update-role', user.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Assign Roles to ${user.name}`} />

            <div className="bg-white shadow-md rounded-md p-5">
                <h2 className="text-xl font-semibold mb-4">Assign Roles to {user.name}</h2>

                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {roles.map((role) => (
                            <label key={role.id} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={role.name}
                                    checked={data.roles.includes(role.name)}
                                    onChange={() => handleCheckboxChange(role.name)}
                                    className="w-4 h-4 text-blue-600"
                                />
                                {role.name}
                            </label>
                        ))}
                    </div>

                    <Button type="submit" disabled={processing} className="mt-4">
                        {processing ? 'Assigning...' : 'Assign Roles'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}

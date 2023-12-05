import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { List, ListItem, Card } from "@material-tailwind/react";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="flex justify-center py-12 max-w-fit mx-auto sm:px-6 lg:px-8">

                <Card className="mx-2 h-40">
                    <List>
                        <ListItem selected>Account</ListItem>
                        <ListItem>Website</ListItem>
                        <ListItem>More</ListItem>
                    </List>
                </Card>

                <div className="space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-fit"
                        />

                    <UpdatePasswordForm className="max-w-fit space-y-3" />

                    <DeleteUserForm className="max-w-fit" />

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

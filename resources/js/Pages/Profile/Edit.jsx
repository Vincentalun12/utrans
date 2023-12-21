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

            <div className="flex justify-center py-12 max-w-fit mx-auto sm:px-6 lg:px-8 sm:mt-24 lg:ml-[300px]">
                
                <Card className="mx-2 h-40 w-auto lg:flex hidden">
                    <List>
                        <ListItem selected>Account</ListItem>
                        <ListItem>Preferences</ListItem>
                        <ListItem>More</ListItem>
                    </List>
                </Card>
 
            
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-fit"
                    />

                    <hr className="my-4" />

                    <UpdatePasswordForm className="max-w-fit" />

                    <hr className="my-4" />

                    <DeleteUserForm className="max-w-fit"/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

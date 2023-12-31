import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabelLogin from '@/Components/InputLabelLogin';
import ButtonLogin from '@/Components/ButtonLogin';
import TextInputLogin from '@/Components/TextInputLogin';
import { Head, Link, useForm } from '@inertiajs/react';

import { Language } from '@/Languages/LoginPage/Login';

export default function Login({ status, canResetPassword }) {

    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('language') || 'en');

    useEffect(() => {
        Language.setLanguage(selectedLanguage);
    }, [selectedLanguage]);


    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabelLogin htmlFor="email" value="Email" />

                    <TextInputLogin
                        id="email"
                        type="email"
                        name="email"    
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabelLogin htmlFor="password" value={Language.password} />

                    <TextInputLogin
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-black">{Language.remember}</span>
                    </label>
                        {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-black hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {Language.forgot}
                        </Link>
                    )}
                </div>

                  <div className="flex items-center mt-6">
                    <ButtonLogin className="w-full h-10" disabled={processing}>
                      <span className="flex items-center justify-center">{Language.login}
                        </span>  
                    </ButtonLogin>
                </div>
            </form>
            <div className="footer text-sm absolute bottom-0 right-0 m-10 md:mr-32 mr-10">
                <p>&copy; 2023 QWER all rights reserved</p>
            </div>
        </GuestLayout>
    );
}

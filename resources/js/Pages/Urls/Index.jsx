import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import UrlCard from '@/Components/UrlCard';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { useForm } from '@inertiajs/react';

export default function Index({ auth, urls }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        originalUrl: '',
        shortened_url: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('urls.store'), {
            onFinish: () => reset('originalUrl', 'shortened_url'),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Urls</h2>}
        >
            <Head title="Urls" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6">
                            <div className="flex flex-col w-3/4 bg-white p-4 rounded-lg shadow-md">
                                <form onSubmit={submit} className="w-full">
                                    <div className="w-full mb-3">
                                        <div className="flex items-center gap-2">
                                            <InputLabel htmlFor="name" value="Name" />
                                        </div>
                                        <div className="flex items-center rounded-md border-gray-300">
                                            <TextInput
                                                id="originalUrl"
                                                name="originalUrl"
                                                value={data.originalUrl}
                                                className="mt-1 block w-full pl-2"
                                                autoComplete="originalUrl"
                                                isFocused={true}
                                                onChange={(e) => setData('originalUrl', e.target.value)}
                                            />
                                        </div>
                                        <InputError message={errors.originalUrl} className="mt-2" />
                                    </div>
                                    <div className="w-full mb-3">
                                        <div className="flex items-center gap-2">
                                            <InputLabel htmlFor="shortened_url" value="shortened_url" />
                                        </div>
                                        <div className="flex items-center rounded-md border-gray-300">
                                            <TextInput
                                                id="shortened_url"
                                                name="shortened_url"
                                                value={data.shortened_url}
                                                className="mt-1 block w-full pl-2"
                                                autoComplete="shortened_url"
                                                isFocused={true}
                                                onChange={(e) => setData('shortened_url', e.target.value)}
                                            />
                                        </div>
                                        <InputError message={errors.shortened_url} className="mt-2" />
                                    </div>

                                    <button type="submit" className="p-3 w-full bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition duration-300">
                                        <FontAwesomeIcon icon={faLink} className=" mr-3" />
                                        Acortar</button>
                                </form>
                                <div className="flex flex-col w-full mt-6 space-y-4">
                                    {urls.map((url) => <UrlCard key={url.id} urlData={url} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

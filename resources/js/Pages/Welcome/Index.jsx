import { Link, Head } from '@inertiajs/react';
import React, { useState } from 'react';
import axios from 'axios';
import UrlCard from '@/Components/UrlCard';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLink, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

export default function Index({ auth, laravelVersion, phpVersion, urls }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        original_url: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('links.store'), {
            onFinish: () => reset('original_url'),
        });
    };

    return (
        <div className="bg-white text-gray-800">
            <Head title="Welcome" />
            <nav className="flex justify-between items-center bg-gradient-to-r from-yellow-400 to-orange-500 p-4 shadow-lg">
                <div className="text-gray-900 font-bold text-2xl">
                    <Link href="/" className="transition duration-200 hover:text-gray-600">ShortURL</Link>
                </div>
                <div className="-mx-3 flex flex-1 justify-end">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="rounded-md px-4 py-2 text-white bg-gray-800 transition duration-200 transform hover:scale-105"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <div className="flex gap-2">
                            <Link
                                href={route('login')}
                                className="rounded-md px-4 py-2 text-gray-800 bg-gray-200 transition duration-200 transform hover:scale-105"
                            >
                                <FontAwesomeIcon icon={faUser} className=" mr-3" />
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="rounded-md px-4 py-2 text-white bg-gray-800 transition duration-200 transform hover:scale-105"
                            >
                                <FontAwesomeIcon icon={faSignInAlt} className=" mr-3" />
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            <div className="lg:w-2/3 text-center mx-auto mt-10">
                <h1 className="text-gray-900 mb-6 dark:text-white font-extrabold text-5xl md:text-6xl xl:text-7xl">Transforma tus enlaces
                    <span className="text-yellow-500 dark:text-white"> en oportunidades.</span>
                </h1>
                <p className="text-lg mb-6">ShortURL simplifica la gestión de enlaces, ideal para equipos de marketing que quieren maximizar el impacto de sus campañas. ¡Transforma tus enlaces hoy!</p>
            </div>

            <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Acortador de URLs</h1>
                <div className="flex flex-col w-1/2 bg-white p-4 rounded-lg shadow-md">
                    <form onSubmit={submit} className="w-full">
                        <div className="w-full mb-3">
                            <div className="flex items-center gap-2">
                                <InputLabel htmlFor="name" value="Name" />
                            </div>
                            <div className="flex items-center rounded-md border-gray-300">
                                <TextInput
                                    id="original_url"
                                    name="original_url"
                                    value={data.original_url}
                                    className="mt-1 block w-full pl-2"
                                    autoComplete="original_url"
                                    isFocused={true}
                                    onChange={(e) => setData('original_url', e.target.value)}
                                />
                            </div>
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        {/* <input
                            type="url"
                            placeholder="Ingrese la URL original"
                            value={original_url}
                            onChange={(e) => setOriginalUrl(e.target.value)}
                            className="p-3 w-full mb-4 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        /> */}
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
    );
}

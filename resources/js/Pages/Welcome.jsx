import { Link, Head } from '@inertiajs/react';
import React, { useState } from 'react';
import axios from 'axios';
import UrlCard from '@/Components/UrlCard';

export default function Welcome({ auth, laravelVersion, phpVersion, urls }) {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost/shorturl/public/urls', { original_url: originalUrl });
            setShortenedUrl(response.data.shortened_url);
        } catch (error) {
            console.error('Error acortando la URL:', error);
        }
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
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="rounded-md px-4 py-2 text-white bg-gray-800 transition duration-200 transform hover:scale-105"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            <main className="container mx-auto mt-10 text-center w-1/2">
                <h3 className="text-6xl font-extrabold mb-6 text-yellow-500">Transforma Tus Enlaces <span className="text-slate-800">en Oportunidades</span></h3>
                <p className="text-lg mb-6">ShortURL simplifica la gestión de enlaces, ideal para equipos de marketing que quieren maximizar el impacto de sus campañas. ¡Transforma tus enlaces hoy!</p>
            </main>


            <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Acortador de URLs</h1>
                <div className="flex flex-col w-1/2 bg-white p-4 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit} className="w-full">
                        <input
                            type="url"
                            placeholder="Ingrese la URL original"
                            value={originalUrl}
                            onChange={(e) => setOriginalUrl(e.target.value)}
                            className="p-3 w-full mb-4 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                        <button type="submit" className="p-3 w-full bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition duration-300">Acortar</button>
                    </form>
                    <div className="flex flex-col w-full mt-6 space-y-4">
                        {urls.map((url) => <UrlCard key={url.id} urlData={url} />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

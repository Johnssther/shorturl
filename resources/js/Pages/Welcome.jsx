import { Link, Head } from '@inertiajs/react';
import React, { useState } from 'react';
import axios from 'axios';
import UrlCard from '@/Components/UrlCard';

export default function Welcome({ auth, laravelVersion, phpVersion, urls }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };
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
<>
    <Head title="Welcome" />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Acortador de URLs</h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-1/2 bg-white p-4 rounded-lg shadow-md">
            <input
                type="url"
                placeholder="Ingrese la URL original"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <button type="submit" className="p-3 bg-slate-800 text-gray-100 font-bold rounded-lg hover:bg-slate-700 transition duration-300">Acortar</button>
        </form>
        <div className="flex flex-col w-1/2 mt-6 space-y-4">
            {urls.map((url) => <UrlCard key={url.id} urlData={url} />)}
        </div>
    </div>
</>

    );
}

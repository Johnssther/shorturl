import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import UrlCard from '@/Components/UrlCard';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, urls }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Urls</h2>}
        >
            <Head title="Urls" />

            <div className="py-1 bg-gray-100">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className=" sm:rounded-lg p-6">
                        <div className="w-full flex justify-end items-center mb-4">
                            <Link href={route('urls.create')}>
                                <PrimaryButton className="flex items-center space-x-2">
                                    <FontAwesomeIcon icon={faPlus} className="text-white" />
                                    <span>Create Url</span>
                                </PrimaryButton>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1">
                            {urls.map((url) => (
                                <UrlCard key={url.id} urlData={url} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

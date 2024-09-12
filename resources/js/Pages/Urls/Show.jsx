import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function Show({ auth, url = null }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-3xl text-gray-900 leading-tight tracking-wide">
                <FontAwesomeIcon icon={faEye} className="mr-3 text-green-600" />
                URL Details
            </h2>}
        >
            <Head title="URL Details" />

            <div className="py-10 w-full bg-gray-50">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                        {/* Header Section */}
                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-5">
                            <h3 className="text-lg leading-6 font-semibold text-white">URL Information</h3>
                        </div>

                        {/* URL Info Section */}
                        <div className="p-8 space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">ID</dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">{url.id}</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Original URL</dt>
                                    <dd className="mt-1 text-lg font-semibold text-blue-500 break-words">
                                        <a href={url.original_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            {url.original_url}
                                        </a>
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Shortened URL</dt>
                                    <dd className="mt-1 text-lg font-semibold text-blue-500 break-words">
                                        <a href={url.shortened_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            {url.shortened_url}
                                        </a>
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Build UTM</dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">{url.is_build_utm ? 'Yes' : 'No'}</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">UTM URL</dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">{url.utm_url || 'N/A'}</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">UTM ID</dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">{url.utm_id || 'N/A'}</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">UTM Source</dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">{url.utm_source || 'N/A'}</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">UTM Medium</dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">{url.utm_medium || 'N/A'}</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">UTM Campaign</dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">{url.utm_campaign || 'N/A'}</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">UTM Term</dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">{url.utm_term || 'N/A'}</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">UTM Content</dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">{url.utm_content || 'N/A'}</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Clicks</dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">{url.clicks || 'N/A'}</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Scan</dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">{url.scans || 'N/A'}</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500"></dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900"></dd>
                                </div>

                                <div className="lg:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">Comments</dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">{url.comments || 'No comments'}</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Password</dt>
                                    <dd className="mt-1 text-lg font-semibold text-gray-900">{url.password ? '*******' : 'No password set'}</dd>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

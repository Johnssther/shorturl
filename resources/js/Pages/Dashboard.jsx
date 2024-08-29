import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard({ auth, totalLinks }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

                            {/* <!-- Total Links --> */}
                            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faLink} className="text-green-500 text-3xl mr-4"/>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-700">Total Links</h2>
                                        <p className="text-2xl font-semibold text-gray-900">{ totalLinks }</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

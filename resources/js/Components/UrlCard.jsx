import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faKey, faSave, faLink, faEdit, faTrash, faEye, faEllipsisV, faMousePointer, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/react';
import DeleteUrlForm from '@/Pages/Urls/partials/DeleteUrlForm';
import ShowQR from '@/Pages/Urls/partials/ShowQR';
import { Transition } from '@headlessui/react';
import Dropdown from './Dropdown';

const UrlCard = ({ urlData }) => {
    const user = usePage().props.auth.user;
    const { id, original_url, shortened_url, is_build_utm, password, created_at } = urlData;
    const created_at_f = new Date(created_at).toLocaleString();
    const [showMessage, setShowMessage] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`http://localhost/shorturl/public/i/${shortened_url}`)
            .then(() => {
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 2000);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    };

    return (
        <div className="relative flex w-full cursor-pointer items-center justify-between rounded-lg bg-white shadow-lg p-4 hover:shadow-xl transition-shadow duration-200 flex-wrap md:flex-nowrap">
            <div className="flex w-full gap-4 items-center flex-wrap md:flex-nowrap">
                {/* Avatar */}
                <div className="flex-none rounded-full border border-gray-200 bg-white p-2 h-10 w-10">
                    <img alt="59.137" draggable="false" loading="lazy" width="20" height="20" decoding="async" data-nimg="1" className="blur-0 rounded-full h-4 w-4 shrink-0 transition-[width,height] sm:h-6 sm:w-6" src="https://avatar.vercel.sh/59.137"></img>
                </div>

                {/* URL Info */}
                <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                        <a
                            className="font-semibold text-blue-600 hover:text-blue-800 hover:underline truncate text-sm md:text-base"
                            href={`http://localhost/shorturl/public/i/${shortened_url}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {`http://localhost/shorturl/public/i/${shortened_url}`}
                        </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 truncate">
                        <FontAwesomeIcon icon={faLink} className="h-4 w-4 text-gray-400" />
                        <a
                            href={`${original_url}`}
                            target="_blank"
                            className="truncate hover:text-gray-800 hover:underline text-xs md:text-sm"
                        >
                            {original_url.slice(0, 40)}...
                        </a>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                        <span>{created_at_f}</span>
                        {is_build_utm && <span className="bg-green-900 text-white px-2 py-1 rounded">UTM</span>}
                        {!!password && (
                            <span className="bg-yellow-500 text-white px-2 py-1 rounded">
                                <FontAwesomeIcon icon={faKey} />
                            </span>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 items-center mt-4 md:mt-0 flex-wrap md:flex-nowrap">
                    <Transition
                        show={showMessage}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600">Copied!</p>
                    </Transition>

                    <div className="flex items-center px-3 py-1.5 border border-gray-200 rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-xs">
                        <FontAwesomeIcon icon={faQrcode} className="text-gray-800 mr-2 text-xs" />
                        <span className="font-medium text-gray-600 text-xs">{urlData.scans} scans</span>
                    </div>
                    <div className="flex items-center px-3 py-1.5 border border-gray-200 rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-xs">
                        <FontAwesomeIcon icon={faMousePointer} className="text-gray-800 mr-2 text-xs" />
                        <span className="font-medium text-gray-600 text-xs">{urlData.clicks} clicks</span>
                    </div>

                    <ShowQR shortened_url={shortened_url} />

                    {user && (
                        <>
                            <DeleteUrlForm id={id} />
                        </>
                    )}

                    {/* Dropdown Actions */}
                    <Dropdown>
                        <Dropdown.Trigger>
                            <div className="h-8 w-8 bg-gray-300 rounded-full flex justify-center items-center">
                                <button title="Copy Url" className="relative group h-full w-full rounded-full transition-all duration-75 border border-gray-200 bg-gray-50 hover:bg-yellow-100 hover:border-yellow-200">
                                    <span className="sr-only">faEllipsisV</span>
                                    <FontAwesomeIcon icon={faEllipsisV} />
                                </button>
                            </div>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Link href={route('urls.clone', id)}>
                                <div className="flex gap-2 justify-start items-center">
                                    <div className="h-8 w-8 bg-gray-300 rounded-full flex justify-center items-center">
                                        <Link title="Clone Url" href={route('urls.clone', id)} className="flex justify-center items-center relative group h-full w-full rounded-full transition-all duration-75 border border-gray-200 bg-gray-50 hover:bg-yellow-100 hover:border-yellow-200">
                                            <span className="sr-only">Clone</span>
                                            <FontAwesomeIcon icon={faSave} />
                                        </Link>
                                    </div>
                                    <p>Clone Url</p>
                                </div>
                            </Dropdown.Link>
                            <Dropdown.Link onClick={handleCopy}>
                                <div className="flex gap-2 justify-start items-center">
                                    <div className="h-8 w-8 bg-gray-300 rounded-full flex justify-center items-center">
                                        <button title="Copy Url" className="relative group h-full w-full rounded-full transition-all duration-75 border border-gray-200 bg-gray-50 hover:bg-yellow-100 hover:border-yellow-200">
                                            <span className="sr-only">Copy</span>
                                            <FontAwesomeIcon icon={faCopy} />
                                        </button>
                                    </div>
                                    <p>Copy Url</p>
                                </div>
                            </Dropdown.Link>
                            {user && (
                                <>
                                    <Dropdown.Link href={route('urls.show', id)}>
                                        <div className="flex gap-2 justify-start items-center">
                                            <div className="h-8 w-8 bg-gray-300 rounded-full flex justify-center items-center">
                                                <button title="Show Url" className="relative group h-full w-full rounded-full transition-all duration-75 border border-gray-200 bg-gray-50 hover:bg-yellow-100 hover:border-yellow-200">
                                                    <span className="sr-only">Show</span>
                                                    <FontAwesomeIcon icon={faEye} />
                                                </button>
                                            </div>
                                            <p>Show Url</p>
                                        </div>
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('urls.edit', id)}>
                                        <div className="flex gap-2 justify-start items-center">
                                            <div className="h-8 w-8 bg-gray-300 rounded-full flex justify-center items-center">
                                                <button title="Edit Url" className="relative group h-full w-full rounded-full transition-all duration-75 border border-gray-200 bg-gray-50 hover:bg-yellow-100 hover:border-yellow-200">
                                                    <span className="sr-only">Edit</span>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                            </div>
                                            <p>Edit Url</p>
                                        </div>
                                    </Dropdown.Link>
                                </>
                            )}
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};

export default UrlCard;

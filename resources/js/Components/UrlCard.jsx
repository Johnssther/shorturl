import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faKey, faChartBar, faLink, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/react';
import DeleteUrlForm from '@/Pages/Urls/partials/DeleteUrlForm';
import ShowQR from '@/Pages/Urls/partials/ShowQR';
import { Transition } from '@headlessui/react';

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
        <div className="relative flex w-full cursor-grab items-center justify-between rounded-xl border border-gray-200 bg-white p-3 shadow-lg active:cursor-grabbing">
            <div className="flex w-full gap-3 justify-between">
                <div className="flex-none rounded-full border border-gray-200 bg-white p-2 h-10 w-10">
                    <img alt="59.137" draggable="false" loading="lazy" width="20" height="20" decoding="async" data-nimg="1" className="blur-0 rounded-full h-4 w-4 shrink-0 transition-[width,height] sm:h-6 sm:w-6 group-data-[variant=loose]/card-list:sm:h-5 group-data-[variant=loose]/card-list:sm:w-5" src="https://avatar.vercel.sh/59.137"></img>
                </div>
                <div className="w-full">
                    <div className="flex justify-between">
                        <a className="font-semibold text-blue-600 hover:text-blue-600 hover:underline" href={`http://localhost/shorturl/public/i/${shortened_url}`} target="_blank" rel="noreferrer">{`http://localhost/shorturl/public/i/${shortened_url}`}</a>
                    </div>
                    <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faLink} className="h-4 w-4 text-gray-400" />
                        <a href={`${original_url}`} target="_blank" className="max-w-60 truncate text-sm text-gray-400 underline-offset-4 transition-all hover:text-gray-700 hover:underline sm:max-w-72">{`${original_url.slice(0, 40)}`}</a>
                    </div>
                    <div className="flex gap-1">
                        <span className="text-xs text-gray-200 bg-black px-2 py-1 rounded-full">{created_at_f}</span> {/*created_at_f    -     Expire 30 min.*/}
                        {is_build_utm ? <span className="text-xs bg-green-900 text-white font-bold py-1 px-2 rounded-md">utm</span>:null}
                        {!!password ? <span className="text-xs bg-yellow-500 text-white font-bold py-1 px-2 rounded-md"><FontAwesomeIcon icon={faKey} /></span>:null}
                    </div>
                </div>
                
                <div>
                    <div className="flex gap-2">
                    <Transition
                        show={showMessage}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Copy</p>
                    </Transition>
                        <div className="h-8 w-8 bg-gray-300 rounded-full flex justify-center items-center">
                            <button onClick={handleCopy} className="relative group h-full w-full rounded-full transition-all duration-75 border border-gray-200 bg-gray-50 hover:bg-yellow-100 hover:border-yellow-200">
                                <span className="sr-only">Copy</span>
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        <ShowQR shortened_url={shortened_url}/>
                        { user === null ? null:(
                            <>                       
                            <div className="h-8 w-8 bg-gray-300 rounded-full flex justify-center items-center">
                                <Link title="Edit Url" href={route('urls.edit', id)} className="flex justify-center items-center relative group h-full w-full rounded-full transition-all duration-75 border border-gray-200 bg-gray-50 hover:bg-yellow-100 hover:border-yellow-200">
                                    <span className="sr-only">Edit</span>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Link>
                            </div>
                            <DeleteUrlForm id={id}/>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UrlCard;

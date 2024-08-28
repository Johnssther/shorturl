import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faQrcode, faChartBar, faLink, faEdit } from '@fortawesome/free-solid-svg-icons';

const UrlCard = ({ urlData }) => {
    const { original_url, shortened_url, created_at } = urlData;
    const created_at_f = new Date(created_at).toLocaleString();
    console.log(urlData);
    return (
        <div className="relative flex w-full cursor-grab items-center justify-between rounded-xl border border-gray-200 bg-white p-3 shadow-lg active:cursor-grabbing">
            <div className="flex w-full gap-3 justify-between">
                <div className="flex-none rounded-full border border-gray-200 bg-white p-2 h-10 w-10">
                    {/* <img alt="logo" width="20" height="20" className="blur-0 rounded-full object-cover" src="https://www.google.com/s2/favicons?sz=64&domain_url=youtube.com" /> */}
                    <img alt="59.137" draggable="false" loading="lazy" width="20" height="20" decoding="async" data-nimg="1" className="blur-0 rounded-full h-4 w-4 shrink-0 transition-[width,height] sm:h-6 sm:w-6 group-data-[variant=loose]/card-list:sm:h-5 group-data-[variant=loose]/card-list:sm:w-5" src="https://avatar.vercel.sh/59.137"></img>
                </div>
                {/* <div className="w-full">
                    <div className="flex justify-between">
                        <a className="font-semibold text-gray-800 hover:text-black" href={original_url} target="_blank" rel="noreferrer">{original_url.slice(0, 40)}...</a>
                    </div>
                    <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faLink} className="h-4 w-4 text-gray-400" />
                        <a href={`http://localhost/shorturl/public/i/${shortened_url}`} target="_blank" rel="noopener noreferrer" className="max-w-60 truncate text-sm text-gray-400 underline-offset-4 transition-all hover:text-gray-700 hover:underline sm:max-w-72">{`http://localhost/shorturl/public/i/${shortened_url}`}</a>
                    </div>
                    <span className="text-xs text-gray-200 bg-black px-2 py-.5 rounded-full">{created_at_f}</span>
                </div> */}
                <div className="w-full">
                    <div className="flex justify-between">
                        <a className="font-semibold text-blue-600 hover:text-blue-600 hover:underline" href={`http://localhost/shorturl/public/i/${shortened_url}`} target="_blank" rel="noreferrer">{`/i/${shortened_url}`}</a>
                    </div>
                    <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faLink} className="h-4 w-4 text-gray-400" />
                        <a href={`${original_url}`} target="_blank" className="max-w-60 truncate text-sm text-gray-400 underline-offset-4 transition-all hover:text-gray-700 hover:underline sm:max-w-72">{`${original_url.slice(0, 40)}`}</a>
                    </div>
                    <span className="text-xs text-gray-200 bg-black px-2 py-1 rounded-full">{created_at_f}</span> {/*created_at_f    -     Expire 30 min.*/}
                </div>
                <div>
                    <div className="flex gap-2">
                        <div className="h-8 w-8 bg-gray-300 rounded-full flex justify-center items-center">
                            <button className="relative group h-full w-full rounded-full transition-all duration-75 border border-gray-200 bg-gray-50 hover:bg-yellow-100 hover:border-yellow-200">
                                <span className="sr-only">Copy</span>
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>
                        <div className="h-8 w-8 bg-gray-300 rounded-full flex justify-center items-center">
                            <button className="relative group h-full w-full rounded-full transition-all duration-75 border border-gray-200 bg-gray-50 hover:bg-yellow-100 hover:border-yellow-200">
                                <span className="sr-only">Show QR Code</span>
                                <FontAwesomeIcon icon={faQrcode} />
                            </button>
                        </div>
                        <div className="h-8 w-8 bg-gray-300 rounded-full flex justify-center items-center">
                            <button className="relative group h-full w-full rounded-full transition-all duration-75 border border-gray-200 bg-gray-50 hover:bg-yellow-100 hover:border-yellow-200">
                                <span className="sr-only">Copy</span>
                                <FontAwesomeIcon icon={faChartBar} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <button type="button" className="rounded-md border border-white px-1 py-2 transition-all duration-75 hover:bg-gray-50 focus:outline-none focus:ring-0 active:bg-gray-100">
                <span className="sr-only">Edit</span>
                <FontAwesomeIcon icon={faEdit} className="h-5 w-5 text-gray-500" />
            </button> */}
        </div>
    );
};

export default UrlCard;

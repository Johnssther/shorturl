import React, { useState } from 'react';

export default function RedirectExpired({ url, urlredirect }) {
    const redirect = () => {
        // window.location.href = urlredirect;
    }
    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-lg max-w-sm w-full">
                <h1 className="text-2xl font-bold text-center mb-6">Link Expired</h1>

                    <div className="mb-4">
                        <p>Link </p>
                
                    </div>

                    <button onClick={redirect} type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2 px-4 rounded">
                        Back
                    </button>
            </div>
        </div>
    );
}

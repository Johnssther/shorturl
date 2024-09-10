import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/react';
import QRCodeGenerator from './QrCodeGenerator';

export default function ShowQR({ shortened_url, className = ''}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        closeModal()
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
           
            <div className="h-8 w-8 bg-gray-300 rounded-full flex justify-center items-center" >
                <button onClick={confirmUserDeletion} className="flex justify-center items-center relative group h-full w-full rounded-full transition-all duration-75 border border-gray-200 bg-gray-50 hover:bg-yellow-100 hover:border-yellow-200">
                    <span className="sr-only">faQrcode</span>
                    <FontAwesomeIcon icon={faQrcode} />
                </button>
            </div>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                    Are you sure you want to delete this record?
                    </h2>

                    <div className="mt-6 flex justify-center items-center">
                        <QRCodeGenerator value={`http://localhost/shorturl/public/i/${shortened_url}`}/>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            OK
                        </DangerButton>
                        
                    </div>
                </form>
            </Modal>
        </section>
    );
}

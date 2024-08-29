import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import Checkbox from '@/Components/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faClipboardList, faLink, faSave } from '@fortawesome/free-solid-svg-icons';

export default function Create({ auth, url = null }) {
    const isEditing = Boolean(url);
    const { data, setData, post, put, processing, errors, reset } = useForm({
        original_url: url ? url.original_url : '',
        shortened_url: url ? url.shortened_url : '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('urls.update', url.id), {
                onFinish: () => reset('original_url', 'shortened_url'),
            });
        } else {
            console.log('xx', route('urls.store'));
            post(route('urls.store'), {
                onFinish: () => reset('original_url', 'shortened_url'),
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                <FontAwesomeIcon icon={isEditing ? faEdit : faClipboardList} className="mr-2" />
                {isEditing ? `Urls / ${url.id} / Edit` : 'Urls / Create'}
            </h2>}
        >
            <Head title="Urls" />

            <div className="py-4 w-full">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <form onSubmit={submit} className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="flex gap-2">
                            <div className="w-full">
                                <div className="flex items-center gap-2">
                                    <InputLabel htmlFor="original_url" value="Original URL" />
                                </div>
                                <div className="flex items-center rounded-md border-gray-300">
                                    <TextInput
                                        id="original_url"
                                        name="original_url"
                                        value={data.original_url}
                                        className="mt-1 block w-full pl-2"
                                        autoComplete="original_url"
                                        isFocused={true}
                                        onChange={(e) => setData('original_url', e.target.value)}
                                    />
                                </div>
                                <InputError message={errors.original_url} className="mt-2" />
                            </div>
                            <div className="w-1/4">
                                <div className="flex items-center gap-2">
                                    <InputLabel htmlFor="shortened_url" value="Shortened url" />
                                </div>
                                <div className="flex items-center rounded-md border-gray-300">
                                    <TextInput
                                        id="shortened_url"
                                        name="shortened_url"
                                        value={data.shortened_url}
                                        className="mt-1 block w-full pl-2"
                                        autoComplete="shortened_url"
                                        onChange={(e) => setData('shortened_url', e.target.value)}
                                        required
                                    />
                                </div>
                                <InputError message={errors.shortened_url} className="mt-2" />
                            </div>
                        </div>
                        {/* <div className="flex mt-4">
                            <div className="flex items-center">
                                <Checkbox
                                    name="completed"
                                    checked={data.completed}
                                    onChange={(e) => setData('completed', e.target.checked)}
                                />
                                <InputLabel htmlFor="completed" value="Completed" className="ml-2" />
                            </div>
                            <InputError message={errors.completed} className="mt-2 ml-4" />
                        </div> */}
                        <div className="flex justify-end mt-4">
                            <PrimaryButton disabled={processing}>
                                <FontAwesomeIcon icon={faSave} className="mr-2" />
                                Save
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

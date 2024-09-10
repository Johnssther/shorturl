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
import QRCodeGenerator from './partials/QrCodeGenerator';

export default function Create({ auth, url = null }) {
    const isEditing = Boolean(url);
    const { data, setData, post, put, processing, errors, reset } = useForm({
        original_url: url ? url.original_url : '',
        shortened_url: url ? url.shortened_url : '',
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_term: '',
        utm_content: ''
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('urls.update', url.id), {
                onFinish: () => reset('original_url', 'shortened_url'),
            });
        } else {
            post(route('urls.store'), {
                onFinish: () => reset('original_url', 'shortened_url'),
            });
        }
    };

    const buildUtmUrl = () => {
        // Check if the original URL is present and not empty
        if (!data.original_url || data.original_url === '') return null;

        // Check if the original URL already contains parameters
        const hasQuery = data.original_url.includes('?');

        // Filter and encode UTM parameters that are not empty
        const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
            .map(key => data[key] ? `${key}=${encodeURIComponent(data[key])}` : '')
            .filter(param => param !== '')
            .join('&');

        // Verify if there are UTM parameters to add
        if (utmParams === '') return data.original_url; // Return the original URL if there are no UTM parameters

        // Concatenate the URL with UTM parameters, using ? or & as appropriate
        return `${data.original_url}${hasQuery ? '&' : '?'}${utmParams}`;
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
                    <form onSubmit={submit} id="form-data">
                        <div className="">
                            <div className="bg-white shadow sm:rounded-lg p-4 sm:p-8">
                                <div className="flex gap-2 ">
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
                                                className={`mt-1 block w-full pl-2 ${isEditing ? 'bg-gray-100 text-gray-400' : ''} `}
                                                autoComplete="shortened_url"
                                                onChange={(e) => setData('shortened_url', e.target.value)}
                                                disabled={isEditing}
                                            />
                                        </div>
                                        <InputError message={errors.shortened_url} className="mt-2" />
                                    </div>
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
                            <div className="w-1/2 shadow sm:rounded-lg p-4 sm:p-8 bg-white mt-3">
                                <p className="mt-2 text-3xl font-bold">UTM Builder</p>
                                <div className="w-full mt-2">
                                    <div className="flex items-center gap-2">
                                        <InputLabel htmlFor="utm_id" value="UTM ID" />
                                    </div>
                                    <div className="flex flex-col rounded-md border-gray-300">
                                        <TextInput
                                            id="utm_id"
                                            name="utm_id"
                                            className="mt-1 block w-full pl-2"
                                            autoComplete="utm_id"
                                            isFocused={true}
                                            onChange={(e) => setData('utm_id', e.target.value)}

                                        />
                                        <p className="text-xs text-gray-500">The ads campaign id.</p>
                                    </div>
                                    <InputError message={errors.utm_id} className="mt-2" />
                                </div>
                                <div className="w-full mt-2">
                                    <div className="flex items-center gap-2">
                                        <InputLabel htmlFor="utm_source" value="UTM Source" />
                                    </div>
                                    <div className="flex flex-col rounded-md border-gray-300">
                                        <TextInput
                                            id="utm_source"
                                            name="utm_source"
                                            className="mt-1 block w-full pl-2"
                                            autoComplete="utm_source"
                                            isFocused={true}
                                            onChange={(e) => setData('utm_source', e.target.value)}

                                        />
                                        <p className="text-xs text-gray-500">The referrer (e.g. <b>google, newsletter</b>)</p>
                                    </div>
                                    <InputError message={errors.utm_source} className="mt-2" />
                                </div>
                                <div className="w-full mt-2">
                                    <div className="flex items-center gap-2">
                                        <InputLabel htmlFor="utm_medium" value="UTM medium" />
                                    </div>
                                    <div className="flex flex-col rounded-md border-gray-300">
                                        <TextInput
                                            id="utm_medium"
                                            name="utm_medium"
                                            className="mt-1 block w-full pl-2"
                                            autoComplete="utm_medium"
                                            isFocused={true}
                                            onChange={(e) => setData('utm_medium', e.target.value)}
                                        />
                                        <p className="text-xs text-gray-500">Marketing medium (e.g. <b>cpc, banner, email</b>)</p>
                                    </div>
                                    <InputError message={errors.utm_medium} className="mt-2" />
                                </div>
                                <div className="w-full mt-2">
                                    <div className="flex items-center gap-2">
                                        <InputLabel htmlFor="utm_campaign" value="UTM Campaign" />
                                    </div>
                                    <div className="flex flex-col rounded-md border-gray-300">
                                        <TextInput
                                            id="utm_campaign"
                                            name="utm_campaign"
                                            className="mt-1 block w-full pl-2"
                                            autoComplete="utm_campaign"
                                            isFocused={true}
                                            onChange={(e) => setData('utm_campaign', e.target.value)}
                                        />
                                        <p className="text-xs text-gray-500">Product, promo code, or slogan (e.g. <b>spring_sale</b>) One of campaign name or campaign id are required.</p>
                                    </div>
                                    <InputError message={errors.utm_campaign} className="mt-2" />
                                </div>
                                <div className="w-full mt-2">
                                    <div className="flex items-center gap-2">
                                        <InputLabel htmlFor="utm_term" value="UTM Term (optional)" />
                                    </div>
                                    <div className="flex flex-col rounded-md border-gray-300">
                                        <TextInput
                                            id="utm_term"
                                            name="utm_term"
                                            className="mt-1 block w-full pl-2"
                                            autoComplete="utm_term"
                                            isFocused={true}
                                            onChange={(e) => setData('utm_term', e.target.value)}
                                        />
                                        <p className="text-xs text-gray-500">Identify the paid keywords</p>
                                    </div>
                                    <InputError message={errors.utm_term} className="mt-2" />
                                </div>
                                <div className="w-full mt-2">
                                    <div className="flex items-center gap-2">
                                        <InputLabel htmlFor="utm_content" value="UTM Content (optional)" />
                                    </div>
                                    <div className="flex flex-col rounded-md border-gray-300">
                                        <TextInput
                                            id="utm_content"
                                            name="utm_content"
                                            className="mt-1 block w-full pl-2"
                                            autoComplete="utm_content"
                                            isFocused={true}
                                            onChange={(e) => setData('utm_content', e.target.value)}
                                        />
                                        <p className="text-xs text-gray-500">Use to differentiate ads</p>
                                    </div>
                                    <InputError message={errors.utm_content} className="mt-2" />
                                </div>
                                {
                                    data.original_url === '' ? null :
                                        <p className="font-bold text-ls">{buildUtmUrl()}</p>

                                }
                                
                            </div>
                        </div>
                    </form>
                    {
                        isEditing ? <QRCodeGenerator value={`http://localhost/shorturl/public/i/${url.shortened_url}`} /> : null
                    }

                </div>
                <div className="flex justify-end mt-4">
                                    <PrimaryButton disabled={processing} form="form-data">
                                        <FontAwesomeIcon icon={faSave} className="mr-2" />
                                        Save
                                    </PrimaryButton>
                                </div>
            </div>
        </AuthenticatedLayout>
    );
}

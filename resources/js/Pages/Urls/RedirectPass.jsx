import { useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

export default function SectionPassword({ url }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        post(route('links.verify-password', { id: url.id }), {
            onFinish: () => reset('password'),
            onError: (errors) => console.error(errors),
        });
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-lg max-w-sm w-full">
                <h1 className="text-2xl font-bold text-center mb-6">Enter your Password</h1>

                <form onSubmit={handlePasswordSubmit} id="form-data">
                    <div className="w-full">
                        <div className="flex items-center gap-2">
                            <InputLabel htmlFor="password" value="Password" />
                        </div>
                        <div className="flex items-center rounded-md border-gray-300">
                            <TextInput
                                id="password"
                                name="password"
                                type="password"
                                value={data.password}
                                className="mt-1 block w-full pl-2"
                                autoComplete="password"
                                isFocused={true}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                        </div>
                        <InputError message={errors.password} className="mt-2" />
                    </div>
                    <PrimaryButton disabled={processing} className='w-1/4 mt-3'>
                        {/* <FontAwesomeIcon icon={faSave} className="mr-2" /> */}
                        Send
                    </PrimaryButton>
                </form>

            </div>
        </div>
    );
}

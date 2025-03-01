import React, { useEffect, useState } from "react";
import InputLabel from '@/Components/InputLabel'; // Componente InputLabel para las etiquetas
import TextInput from '@/Components/TextInput'; // Componente TextInput para entradas de texto
import CheckboxSwitch from '@/Components/CheckboxSwitch'; // Componente CheckboxSwitch
import InputError from '@/Components/InputError'; // Componente InputError para manejar los errores

export default function SectionPassword({ props, data, setData, errors, className=' ' }) {
    const [enabled, setEnabled] = useState(!!data.password);

    useEffect(() => {
        if (!enabled) {
            setData({ ...data, password: null });
        }
    }, [enabled]);

    console.log(data);
    

    return (
        <div className={`w-full bg-white rounded-lg mt-2 ${className}`}>
            <div className="w-full flex gap-4 items-center">
                <div className="flex items-center rounded-md border-gray-300">
                    <CheckboxSwitch
                        id="password"
                        name="password"
                        checked={enabled}
                        className=""
                        onChange={(e) => {
                            setEnabled(e.target.checked);
                            if (!e.target.checked) {
                                setData('password', null); // Limpiar comentarios si se desactiva
                            }
                        }}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <InputLabel htmlFor="password" value="Password" />
                </div>
            </div>

            {enabled && (
                <div className="flex gap-2 mt-2">
                    <div className="w-full">
                        <div className="flex items-center rounded-md border-gray-300">
                            <TextInput
                                id="password"
                                name="password"
                                type="password"
                                value={data.password || ''}
                                className="mt-1 block w-full pl-2"
                                autoComplete="password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Input password"
                            />
                        </div>
                        <InputError message={errors.password} className="mt-2" />
                    </div>
                </div>
            )}
        </div>
    );
}

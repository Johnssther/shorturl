import React, { useEffect, useState } from "react";
import InputLabel from '@/Components/InputLabel'; // Componente InputLabel para las etiquetas
import TextInput from '@/Components/TextInput'; // Componente TextInput para entradas de texto
import CheckboxSwitch from '@/Components/CheckboxSwitch'; // Componente CheckboxSwitch
import InputError from '@/Components/InputError'; // Componente InputError para manejar los errores

export default function SectionComments({ props, data, setData, errors, className=' ' }) {
    const [enabled, setEnabled] = useState(!!data.comments);

    useEffect(() => {
        if (!enabled) {
            setData({ ...data, comments: null });
        }
    }, [enabled]);

    return (
        <div className={`w-full bg-white rounded-lg mt-2 ${className}`}>
            <div className="w-full flex gap-4 items-center">
                <div className="flex items-center rounded-md border-gray-300">
                    <CheckboxSwitch
                        id="comments"
                        name="comments"
                        checked={enabled}
                        className=""
                        onChange={(e) => {
                            setEnabled(e.target.checked);
                            if (!e.target.checked) {
                                setData('comments', null); // Limpiar comentarios si se desactiva
                            }
                        }}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <InputLabel htmlFor="comments" value="Comments" />
                </div>
            </div>

            {enabled && (
                <div className="flex gap-2 mt-2">
                    <div className="w-full">
                        <div className="flex items-center rounded-md border-gray-300">
                            <TextInput
                                id="comments"
                                name="comments"
                                value={data.comments || ''}
                                className="mt-1 block w-full pl-2"
                                autoComplete="comments"
                                onChange={(e) => setData('comments', e.target.value)}
                                placeholder="Add Comments"
                            />
                        </div>
                        <InputError message={errors.comments} className="mt-2" />
                    </div>
                </div>
            )}
        </div>
    );
}

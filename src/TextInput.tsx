import { ChangeEvent, useState } from "react";
import cn from 'classnames';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type Props = {
    label: string;
    id: string;
    type?: 'text' | 'email';
    onChange: (val: string) => void;
    value: string;
}

export const TextInput = ({label, id, type='text', onChange, value}: Props) => {
    const [touched, setTouched] = useState(false);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    }

    const onInputBlur = () => {
        setTouched(true);
    }

    return (
        <>
            <label
                htmlFor={id}
                className="mb-2 block text-base text-[#000853]"
            >
                {label}
            </label>
            <input
                type={type}
                id={id}
                className={cn(
                    "focus:bg-[#FAF9FA]  focus:border-2 focus:border-[#761BE4] rounded-lg w-full h-[48px] px-4 py-[18px] focus:ring-0 focus:ring-offset-0 focus:outline-0",
                    {'bg-[#FEECEC] border-2 border-[#ED4545]': type === 'text' && touched && !value},
                    {'border border-[#CBB6E5]': type === 'text' && (!touched || !!value)},
                    {'bg-[#FEECEC] border-2 border-[#ED4545]': type === 'email' && touched && !emailRegex.test(value)},
                    {'border border-[#CBB6E5]': type === 'email' && (!touched || emailRegex.test(value))},
                )}
                onChange={onInputChange}
                onBlur={onInputBlur}
                value={value}
            />
        </>
    )
}
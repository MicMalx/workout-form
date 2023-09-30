import { useEffect, useState } from 'react';
import { RangeInput } from './RangeInput';
import { TextInput } from './TextInput';
import axios from 'axios';
import { Calendar } from './Calendar';
import { ImageUploader } from './ImageUploader';

export type SpecialDate = {
    country: string;
    date: string;
    day: string;
    iso: string;
    name: string;
    type: string;
    year: number;
};

function App() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(8);
    const [dateAndTime, setDateAndTime] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [specialDates, setSpecialDates] = useState<SpecialDate[]>([]);

    useEffect(() => {
        const apiRequest = async () => {
            try {
                const res = await axios.get('https://api.api-ninjas.com/v1/holidays', {
                    headers: {'X-Api-Key': '8DX8eEe67njS1lbThFsdSw==rQQNpQ8PYbPZBjrx'},
                    params: {
                        country: 'PL',
                        year: 2023,
                    }
                });
                setSpecialDates(res.data);
            } catch(error) {
                console.log(error);
            }
        }
        apiRequest();
    }, []);


    const sendToAPI = async () => {
        const formData = new FormData;
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('age', age.toString());
        formData.append('file', file!);
        formData.append('dateAndTime', dateAndTime);

        try {
            const res = await axios.post('http://letsworkout.pl/submit', formData);
            console.log(res.data);
        } catch (error) {
            console.log('Failed as expected');
        }
        
    }

    return (
        <div className="App">
            <div className='px-[25px] w-full sm:px-0 sm:w-[426px] pt-[120px] mx-auto text-left'>
                <p className='text-[#000853] font-medium text-2xl'>Personal info</p>

                <TextInput label='First Name' id='first_name' onChange={setFirstName} value={firstName} />
                <TextInput label='Last Name' id='last' onChange={setLastName} value={lastName} />
                <TextInput label='Email' id='email' type="email" onChange={setEmail} value={email} />
                <RangeInput onChange={setAge} />
                <div className='mt-10'>
                    <ImageUploader onChange={setFile} />
                </div>
                <p className='mt-[46px] mb-[32px] text-2xl text-[#000853] font-medium'>Your workout</p>
                <div className='mt-10'>
                    {specialDates.length ? <Calendar specialDays={specialDates} onChange={setDateAndTime} /> : <p>Loading calendar...</p>}
                </div>
                <button
                    type='submit'
                    className='my-5 w-full py-4 text-white bg-[#761BE4] hover:bg-[#6A19CD] disabled:bg-[#CBB6E5] rounded'
                    disabled={!(firstName && lastName && email && file && dateAndTime)}
                    onClick={() => sendToAPI()}
                >
                    Send Application
                </button>

            </div>
        </div>
    );
}

export default App;

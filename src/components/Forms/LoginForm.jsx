import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import axios from 'axios';
import {useState} from 'react';
import Header from '../Header';

const yupSchema = yup.object().shape({
    username: yup
    .string()
    .required("username wymagany"),

    password: yup
    .string()
    .required("hasło wymagane")
});

export default function LoginForm() {
    
    const [apiError, setApiError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(yupSchema)});

    

    const onSubmit = async (data) => {
        console.log(data);
        setApiError(null);
        setSuccess("zalogowano pomyślnie");
        try {
            const response = await axios.post('https://fakestoreapi.com/auth/login', data)
            console.log(response);
            if(response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
        }
        catch (error) {
            if(error.status === 401) {
                setApiError("Niepoprawne dane logowania");
            }
            console.error("Błąd:", error);
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="float-left flex p-10 bg-center flex-col gap-4 m-10 border-2 border-gray-200"> 
            <h1>Logowanie</h1>
            {apiError && <span className='text-red-600 text-xs'>{apiError}</span>}
            {success && <span className='text-red-600 text-xs'>{success}</span>}
            <input 
            autoFocus
            {...register('username')}
            placeholder="Username" className={errors.username ? "border-red-500 border-2 border-r-2 m-4 p-2" : "border-gray-500 m-4 p-2"} />

            {errors.username && <span className='text-red-600 text-xs'>{errors.username.message}</span>}

            <input 
            autoFocus type='password'
            {...register('password')}
            placeholder="Password" className={errors.password ? "border-red-500 border-2 border-r-2 m-4 p-2" : "border-gray-500 m-4 p-2"} />

            {errors.password && <span className='text-red-600 text-xs'>{errors.password.message}</span>}

            <button type="submit" className="btn btn-primary bg-blue-500">Login</button>
        </form>
    );
}
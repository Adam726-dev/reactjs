import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import axios from 'axios';

const yupSchema = yup.object().shape({
    username: yup
    .string()
    .required("username wymagany"),

    password: yup
    .string()
    .required("hasło wymagane")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "hasło musi mieć min 8 znaków, jedną dużą literę i jedną cyfrę")
    .min(8, "hasło musi mieć min 8 znaków"),

    email: yup
    .string()
    .email("niepoprawny email")
    .required("email wymagany"),

    confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], "hasła muszą być takie same")
    .required("potwierdzenie hasła wymagane")
});

export default function RegisterForm() {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(yupSchema)
    });

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await axios.post('https://fakestoreapi.com/users', {
                username: data.username,
                email: data.email,
                password: data.password,

        })
            console.log(response);
        }
        catch (error) {
            console.error("Błąd:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="float-right flex p-10 bg-center flex-col gap-4 m-10 border-2 border-gray-200">
            <h1>Rejestracja</h1>
            <input 
            autoFocus
            {...register('username')} 
            placeholder="Username" 
            className={errors.username ? "border-red-500 border-2 border-r-2 p-2" : "border-black m-4 p-2"} />

            {errors.username && <span className='text-red-600 text-xs'>{errors.username.message}</span>}

            <input 
            autoFocus
            {...register('email')} 
            placeholder="email" 
            className={errors.email ? "border-red-500 border-2 border-r-2 p-2" : "border-black m-4 p-2"} />

            {errors.email && <span className='text-red-600 text-xs'>{errors.email.message}</span>}

            <input 
            type="password"
            autoFocus
            {...register('password')} 
            placeholder="Password" 
            className={errors.password ? "border-red-500 border-2 border-r-2 p-2" : "border-black m-4 p-2"} />

            {errors.password && <span className='text-red-600 text-xs'>{errors.password.message}</span>}

            <input 
            type="password"
            autoFocus
            {...register('confirmPassword')} 
            placeholder="Confirm Password" 
            className={errors.confirmPassword ? "border-red-500 border-2 border-r-2 p-2" : "border-black m-4 p-2"} />

            {errors.confirmPassword && <span className='text-red-600 text-xs'>{errors.confirmPassword.message}</span>}

            <button type="submit" className="btn btn-primary bg-blue-500">Register</button>
        </form>
    );
}

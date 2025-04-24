import React from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useState} from 'react';


const yupSchema = yup.object().shape({
    title: yup
    .string()
    .required("nazwa wymagana")
    .min(3, "nazwa musi mieć min 3 znaki"),

    price: yup
    .number()
    .required("podaj cene")
    .positive("cena musi być dodatnia"),

    description: yup
    .string()
    .min(10, "opis musi mieć min 10 znaków")
    .max(200, "opis nie może mieć więcej niż 200 znaków"),

    category: yup
    .string()
    .required("kategoria wymagana"),

    url: yup
    .string().url(),
        
    });
    

const AddProduct = () => {

    const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(yupSchema)});
    const [success, setSuccess] = useState(null);

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await axios.post('https://fakestoreapi.com/products', data)
            console.log(response);
            setSuccess("dodano pomyślnie");
        }
        catch (error) {
           
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="float-left flex p-10 bg-center flex-col gap-4 m-10 border-2 border-gray-200"> 
            <h1>Dodawanie Produktu</h1>
            {success && <span className='text-green-500 text-l'>{success}</span>}
            <input className='m-3 p-3 border-2 rounded-md' autoFocus type='text' placeholder='Nazwa' {...register('title')} />
            {errors.title && <span className='text-red-600 text-xs'>{errors.title.message}</span>}
            <input className='m-3 p-3 border-2 rounded-md' autoFocus type='number' placeholder='Cena' step="0.1" min="0" {...register('price')}/>
            {errors.price && <span className='text-red-600 text-xs'>{errors.price.message}</span>}
            <input className='m-3 p-3 border-2 rounded-md' autoFocus type='text' placeholder='Opis' {...register('description')}/>
            {errors.description && <span className='text-red-600 text-xs'>{errors.description.message}</span>}
            <select className='m-3 p-3 border-2 rounded-md' autoFocus type='text' placeholder='Kategoria' {...register('category')}>
                <option value="electronics">Elektronika</option>
                <option value="jewelery">Biżuteria</option>
                <option value="jewelery">Odzież</option>
            </select>
            <input className='m-3 p-3 border-2 rounded-md' autoFocus type='text' placeholder='Obrazek (url)'{...register('url')} />

            <button type="submit" className="btn btn-primary bg-blue-500">Dodaj</button>
        </form>
        </div>
    );
}

export default AddProduct;

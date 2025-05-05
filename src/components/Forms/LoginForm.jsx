import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const yupSchema = yup.object().shape({
  username: yup.string().required("username wymagany"),
  password: yup.string().required("hasło wymagane"),
});

export default function LoginForm() {
  const [success, setSuccess] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(yupSchema),
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleRegister = () => {
    navigate("/register");
  };

  const onSubmit = async (data) => {
    setSuccess(null);
    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', data);
      console.log("API Response:", response.data);
      if (response.data.token) {
        login(response.data, response.data.token);
        setSuccess("zalogowano pomyślnie");
        localStorage.setItem("username", response.data.name.firstname);
        navigate("/header");
        console.log(data);
      } else {
        // handle failure if needed
      }
    } catch (error) {
      // handle error if needed
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="float-left flex p-10 bg-center flex-col gap-4 m-10 border-2 border-gray-200"> 
      <h1>Logowanie</h1>
      {success && <span className="text-green-600 text-xs">{success}</span>}
      
      <input 
        autoFocus
        {...register('username')}
        placeholder="Username" 
        className={errors.username ? "border-red-500 border-2 m-4 p-2" : "border-gray-500 m-4 p-2"} 
      />
      {errors.username && <span className="text-red-600 text-xs">{errors.username.message}</span>}

      <input 
        type="password"
        {...register('password')}
        placeholder="Password" 
        className={errors.password ? "border-red-500 border-2 m-4 p-2" : "border-gray-500 m-4 p-2"} 
      />
      {errors.password && <span className="text-red-600 text-xs">{errors.password.message}</span>}

      <button type="submit" className="btn btn-primary bg-blue-500" disabled={false}>
        Login
      </button>
      <button onClick={handleRegister} type="button" className="btn btn-secondary bg-gray-500">
        Zarejestruj się
      </button>
    </form>
  );
}

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();
  const [errorToast, setErrorToast] = useState(false);

  const signinSchema = z.object({
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(5, { message: 'Password must be at least 5 characters.' }),
    role: z.enum(['user', 'admin'], { errorMap: () => ({ message: 'Role must be either user or admin' }) }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      role:'user'
    },
    resolver: zodResolver(signinSchema)
  });

  const onSubmit = async (data) => {
    const { email, password, role } = data;
    try {
      
      console.log('Login data', { email, password });
      
      const response = await axios.post('http://localhost:3000/auth/login',{
        email, password, userType:role
      });
      
      console.log(response);
      if(response.data.token){
        localStorage.setItem('token',response.data.token);
        navigate('/users');
      }
      setErrorToast(false);
    } catch (error) {
      console.log('Error logging in user', error);
      setErrorToast(true);
    }
  };

  useEffect(()=>{
    const isAuthenticated = localStorage.getItem('token');

    if (isAuthenticated) {
      navigate('/users');
    }
  },[])

  return (
    <div className=" relative z-10 w-full min-h-screen h-full flex justify-center items-center">
      {errorToast && (
        <div className="toast bg-red-500 text-white p-2 rounded-md">
          <p>Sign In Failed: Incorrect Username or Password</p>
        </div>
      )}
      <div className="w-[90%] md:w-1/3 rounded-lg text-white p-6 bg-gradient-to-br from-violet-500 to-violet-600">
        <h1 className="text-3xl font-bold mb-2">Sign In</h1>
        <p className="text-sm mb-4">Hop aboard to save your favorite items.</p>
        <form className="flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className="w-full text-start mt-2">Email</label>
          <input
            id="email"
            {...register('email')}
            className={`rounded-lg text-black p-2 my-1 outline-none border-b border-black w-full ${errors.email ? 'border-red-500' : ''}`}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && <p className="text-red-500 text-sm text-left w-full">{errors.email.message}</p>}

          <label htmlFor="password" className="w-full text-start mt-2">Password</label>
          <input
            id="password"
            {...register('password')}
            type="password"
            className={`rounded-lg text-black p-2 my-1 outline-none border-b border-black w-full ${errors.password ? 'border-red-500' : ''}`}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          {errors.password && <p className="text-red-500 text-sm text-left w-full">{errors.password.message}</p>}

          <div className="mt-2 w-full ">
            <label className="block text-sm font-medium w-full">Role</label>
            <select
                {...register("role")}
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-violet-700 text-black"
            >
                <option value="" disabled>Select role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            {errors.role && <p className="text-red-600">{errors.role.message}</p>}
          </div>

          <button
            className="w-full py-2 rounded-lg mt-6 bg-[#fe4463] hover:bg-rose-600"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Let's Go"}
          </button>
        </form>

        <p className="text-center mt-4">
          Don&apos;t have an account yet? <a href="/sign-up" className="font-semibold">Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

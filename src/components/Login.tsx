import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { BeatLoader } from 'react-spinners';
import Error from './Error';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/server';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setUserLogin } from '@/store/slices/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [error, setError] = useState<any>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get('createNew');
  const { isPending, mutate: loginMutate } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      if (res) {
        if (res.data.success) {
          navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ''}`);
          console.log(res.data);
          dispatch(setUserLogin(res.data.userData));
        }
      }
    },
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleLogin = async () => {
    setError([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      });
      await schema.validate(formData, { abortEarly: false });
      //then we call the api
      await loginMutate(formData);
    } catch (e: any) {
      const newError = {};

      e?.inner?.forEach((err) => {
        newError[err.path] = err.message;
      });

      setError(newError);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>to your account if you already have one</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Enter Email"
              onChange={handleInputChange}
            />
          </div>
          {error.email && <Error message={error.email} />}
          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={handleInputChange}
            />
          </div>
          {error.password && <Error message={error.password} />}
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin}>
            {isPending ? <BeatLoader size={10} color="#36d7b7" /> : 'Login'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

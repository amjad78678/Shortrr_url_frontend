import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import Error from './Error';
import * as Yup from 'yup';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { useMutation } from '@tanstack/react-query';
import { signup } from '@/api/server';
import { setUserLogin } from '@/store/slices/authSlice';

const Signup = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get('createNew');

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const { isPending, mutate: SignupMutate } = useMutation({
    mutationFn: signup,
    onSuccess: (res) => {
      console.log(res);
      if (res) {
        navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ''}`);
        setUserLogin(res.data);
      }
    },
  });

  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      });

      await schema.validate(formData, { abortEarly: false });
      await SignupMutate(formData);
    } catch (error) {
      const newErrors = {};
      if (error?.inner) {
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });

        setErrors(newErrors);
      } else {
        setErrors({ api: error.message });
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>Create a new account if you haven&rsquo;t already</CardDescription>
        {errors && <Error message={errors?.api} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input name="name" type="text" placeholder="Enter Name" onChange={handleInputChange} />
        </div>
        {errors.name && <Error message={errors.name} />}
        <div className="space-y-1">
          <Input name="email" type="email" placeholder="Enter Email" onChange={handleInputChange} />
        </div>
        {errors.email && <Error message={errors.email} />}
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
        </div>
        {errors.password && <Error message={errors.password} />}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup}>
          {isPending ? <BeatLoader size={10} color="#36d7b7" /> : 'Create Account'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;

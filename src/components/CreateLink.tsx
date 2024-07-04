import React, { useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import Error from './Error';
import { QRCode } from 'react-qrcode-logo';
import { BeatLoader } from 'react-spinners';
import { useMutation } from '@tanstack/react-query';
import { createLink } from '@/api/server';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const CreateLink = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const { userDetails } = useSelector((state: RootState) => state.auth);

  const ref = useRef(null);
  const navigate = useNavigate();
  const longLink = searchParams.get('createNew');
  const [errors, setErrors] = useState({});
  const { isPending, mutate: createLinkMutate } = useMutation({
    mutationFn: createLink,
    onSuccess: (res) => {
      if (res) {
        if (res.data.success) {
          console.log(res.data);
          navigate(`/link/${res.data.data._id}`);
        }
      }
    },
  });
  const [formValues, setFormValues] = useState({
    title: '',
    longUrl: longLink ? longLink : '',
    customUrl: '',
  });

  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    longUrl: yup.string().url('Must be a valid URL').required('Long URL is required'),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };
  const createNewLink = async () => {
    setErrors([]);
    try {
      await schema.validate(formValues, { abortEarly: false });
      const canvas = ref.current.canvasRef.current;
      const blob: File = await new Promise((resolve) => canvas.toBlob(resolve));
      const shortUrl = Math.random().toString(36).substring(2, 6);

      const formData = new FormData();

      Object.keys(formValues).forEach((key) => {
        formData.append(key, formValues[key]);
      });

      formData.append('user_id', userDetails._id);

      formData.append('qrCode', blob, 'qrCode.png');

      formData.append('shortUrl', shortUrl);

      createLinkMutate(formData);
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };
  return (
    <div>
      <Dialog defaultOpen={longLink ? true : false} onOpenChange={() => setSearchParams({})}>
        <DialogTrigger>
          <Button variant={'destructive'}>Create Link</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>Create New</DialogHeader>
          {formValues.longUrl && <QRCode value={formValues.longUrl} size={250} ref={ref} />}
          <Input
            id="title"
            placeholder="Short Link's Title"
            value={formValues.title}
            onChange={handleChange}
          />
          {errors.title && <Error message={errors.title} />}
          <Input
            id="longUrl"
            placeholder="Enter your Loooong URL"
            value={formValues.longUrl}
            onChange={handleChange}
          />
          {errors.longUrl && <Error message={errors.longUrl} />}
          <div className="flex items-center gap-2">
            <Card className="p-2">shortrr.in</Card> /
            <Input
              id="customUrl"
              placeholder="Custom Link (optional)"
              value={formValues.customUrl}
              onChange={handleChange}
            />
          </div>
          {/* {error && <Error message={errors.message} />} */}
          <DialogFooter className="sm:justify-start">
            <Button type="button" variant="destructive" onClick={createNewLink} disabled={false}>
              {isPending ? <BeatLoader size={10} color="white" /> : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateLink;

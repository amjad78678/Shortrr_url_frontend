import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [longUrl, setLongUrl] = useState('');
  const navigate = useNavigate();
  const handleShortenSubmit = (e) => {
    e.preventDefault();

    if (longUrl) {
      navigate(`/auth?createNew=${longUrl}`);
    }
  };
  return (
    <div>
      <h2 className=" my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The only URL Shortener <br /> you&rsquo;ll ever need! 👇
      </h2>
      <form onSubmit={handleShortenSubmit}>
        <div className="flex flex-col sm:flex-row w-full justify-center ">
          <Input
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            type="url"
            placeholder="Shorten a link here..."
            className="w-full sm:w-2/3"
          />
          <Button type="submit" variant={'destructive'}>
            Shorten!
          </Button>
        </div>
      </form>
      <img
        className="top-0 left-0 my-11 mx-auto rounded-lg size-2/3"
        src="./bannerLogo.jpg"
        alt=""
      />

      <div className="w-10/12 mx-auto">
        <Accordion type="multiple" className="w-full md:px-11">
          <AccordionItem value="item-1">
            <AccordionTrigger>How does the Trimrr URL shortener works?</AccordionTrigger>
            <AccordionContent>
              When you enter a long URL, our system generates a shorter version of that URL. This
              shortened URL redirects to the original long URL when accessed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Do I need an account to use the app?</AccordionTrigger>
            <AccordionContent>
              Yes. Creating an account allows you to manage your URLs, view analytics, and customize
              your short URLs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What analytics are available for my shortened URLs?</AccordionTrigger>
            <AccordionContent>
              You can view the number of clicks, geolocation data of the clicks and device types
              (mobile/desktop) for each of your shortened URLs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Landing;

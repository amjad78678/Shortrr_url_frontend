import { Copy, Download, LinkIcon, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { BeatLoader } from 'react-spinners';
import { useMutation } from '@tanstack/react-query';
import { deleteLink } from '@/api/server';
const clientUrl = import.meta.env.VITE_CLIENT_URL;

const LinkCard = ({ url, refetchUrls, refetchClicks }) => {
  const downloadImage = () => {
    const imageUrl = url?.qrCode;
    const fileName = url?.title; // Desired file name for the downloaded image

    // Create an anchor element
    const anchor = document.createElement('a');
    anchor.href = imageUrl;
    anchor.download = fileName;

    // Append the anchor to the body
    document.body.appendChild(anchor);

    // Trigger the download by simulating a click event
    anchor.click();

    // Remove the anchor from the document
    document.body.removeChild(anchor);
  };

  const { isPending, mutate: deleteLinkMutate } = useMutation({
    mutationFn: deleteLink,
    onSuccess: (res) => {
      if (res) {
        if (res?.data.success) {
          refetchUrls();
          refetchClicks();
        }
      }
    },
  });

  const handleDelete = (urlId) => {
    deleteLinkMutate(urlId);
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      <img
        src={url?.qrCode}
        className="h-32 object-contain ring ring-blue-500 self-start"
        alt="qr code"
      />
      <Link to={`/link/${url?._id}`} className="flex flex-col flex-1">
        <span className="text-3xl font-extrabold hover:underline cursor-pointer">{url?.title}</span>
        <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
          {clientUrl}/link/{url?.custom_url ? url?.custom_url : url.short_url}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer">
          <LinkIcon className="p-1" />
          {url?.original_url}
        </span>
        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url?.createdAt).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          onClick={() => navigator.clipboard.writeText(`${clientUrl}/${url?.short_url}`)}>
          <Copy />
        </Button>
        <Button variant="ghost" onClick={downloadImage}>
          <Download />
        </Button>
        <Button variant="ghost" onClick={() => handleDelete(url._id)} disable={isPending}>
          {isPending ? <BeatLoader size={5} color="white" /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;

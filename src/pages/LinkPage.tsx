import { deleteLink, fetchClicksForUrl, fetchLinkData } from '@/api/server';
import DeviceStats from '@/components/DeviceStats';
import LocationStats from '@/components/LocationStats';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RootState } from '@/store/store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Copy, Download, Trash } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BarLoader, BeatLoader } from 'react-spinners';
const clientUrl = import.meta.env.VITE_CLIENT_URL;

const LinkPage = () => {
  const { id } = useParams();
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const { isPending, data: urlData } = useQuery({
    queryKey: ['linkDataforLinkPage'],
    queryFn: () => fetchLinkData(id, userDetails._id),
  });

  const { isPending: isPendingClicks, data: clicksData } = useQuery({
    queryKey: ['linksClicksData'],
    queryFn: () => fetchClicksForUrl(id),
  });

  console.log('aim url data', urlData);
  console.log('iam clicks data', clicksData);
  let link = '';
  if (urlData) {
    link = urlData?.data.data.custom_url
      ? urlData?.data.data.custom_url
      : urlData?.data.data.short_url;
  }
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

  const { isPending: isPendingDelete, mutate: deleteLinkMutate } = useMutation({
    mutationFn: deleteLink,
    onSuccess: (res) => {
      if (res) {
        console.log(res);
      }
    },
  });

  const handleDelete = (urlId) => {
    deleteLinkMutate(urlId);
  };
  return (
    <div>
      {(isPending || isPendingClicks) && (
        <BarLoader className="mb-4" width={'100%'} color="#36d7b7" />
      )}
      <div className="flex flex-col sm:flex-row justify-between gap-8 ">
        <div className="flex flex-col items-start rounded-lg sm:w-2/5 gap-8">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {urlData?.data.data.title}
          </span>
          <a
            className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
            target="_blank"
            href={clientUrl + '/' + link}>
            {clientUrl + '/' + link}
          </a>
          <a className="p-1" target="_blank" href={urlData?.data.data.original_url}>
            {urlData?.data.data.original_url}
          </a>
          <span className="flex items-end font-extralight text-sm">
            {new Date(urlData?.data.data.createdAt).toLocaleString()}
          </span>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(`${clientUrl}/${urlData?.data.data?.short_url}`)
              }>
              <Copy />
            </Button>
            <Button variant="ghost" onClick={downloadImage}>
              <Download />
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleDelete(urlData?.data.data._id)}
              disable={isPendingDelete}>
              {isPending ? <BeatLoader size={5} color="white" /> : <Trash />}
            </Button>
          </div>
          <img
            className="w-full self-center sm:self-center ring ring-blue-500 p-1 object-contain"
            src={urlData?.data.data.qrCode}
            alt=""
          />
        </div>
        <div className="sm:w-3/5">
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
            </CardHeader>
            {clicksData && clicksData?.data.data.length > 0 ? (
              <CardContent className="flex flex-col gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Clicks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{clicksData?.data.data?.length}</p>
                  </CardContent>
                </Card>
                <CardTitle>Location Data</CardTitle>
                <LocationStats stats={clicksData.data.data} />
                <CardTitle>Device Info</CardTitle>
                <DeviceStats stats={clicksData.data.data} />
              </CardContent>
            ) : (
              <CardContent>
                <p>{isPendingClicks ? 'Loading statistics...' : 'No clicks yet'}</p>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LinkPage;

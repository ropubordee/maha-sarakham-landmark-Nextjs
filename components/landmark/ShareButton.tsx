'use client'
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Share2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share";
const ShareButton = ({
  landmarkId,
  name,
}: {
  landmarkId: string;
  name: string;
}) => {
    const url = process.env.NEXT_PUBLIC_WEBSITE_URL
    const shareLink = `${url}/landmark/${landmarkId}`

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <Share2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" align="end" className="flex w-full gap-x-2">
        <FacebookShareButton url={shareLink} name={name}>
            <FacebookIcon size='36px' />
        </FacebookShareButton>

        <TwitterShareButton url={shareLink} name={name}>
            <TwitterIcon size={'36px'}/>
        </TwitterShareButton>

      </PopoverContent>
    </Popover>
  );
};

export default ShareButton;

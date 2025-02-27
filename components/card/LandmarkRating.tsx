'use client'
import { fetchRatingAverage } from "@/backend/actions";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";

const LandmarkRating = ({ landmarkId }: { landmarkId: string }) => {

  const [ratingAvg, setRatingAvg] = useState<number | null>(0 || null);
  const [loading, setLoading] = useState<boolean>(true);


   const loadRating = async () => {
      setLoading(true);
      const avgRating  = await fetchRatingAverage({ landmarkId });
      if (avgRating === null || avgRating === undefined) {
        return setRatingAvg(0)
      } else {
        setRatingAvg(avgRating); 
      }
      setLoading(false);
    };

    useEffect(()=>{
      loadRating()
    },[landmarkId])


    const renderStars = (rating: number | null) => {
      if (rating === null) {
        return <div>Loading...</div>;
      }
  
      let stars = 0;
      switch (true) {
        case rating >= 1 && rating < 2:
          stars = 1;
          break;
        case rating >= 2 && rating < 3:
          stars = 2;
          break;
        case rating >= 3 && rating < 4:
          stars = 3;
          break;
        case rating >= 4 && rating < 5:
          stars = 4;
          break;
        case rating === 5:
          stars = 5;
          break;
        default:
          stars = 5;
          break;
      }
  
      return (
        <div className="flex items-center space-x-1">
          {Array.from({ length: stars }).map((_, index) => (
            <Star key={index} fill="yellow" stroke="yellow" />
          ))}
        </div>
      );
    };

    if(loading) return <div>Loading...</div>

  return (
<div className="flex items-center space-x-2">
      {renderStars(ratingAvg)}
      <div className="text-[14px] text-muted-foreground ">{ratingAvg}</div>
    </div>
  
  );
};

export default LandmarkRating;

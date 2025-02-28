"use client";
import { createRating, fetchRatingDetail } from "@/backend/actions/ratings";
import { RatingStar } from "@/utils/mockdata/ratingdata";

import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";

const LandmarkRatingDetail = ({ landmarkId }: { landmarkId: string }) => {
  const [rating, setRating] = useState(0);
  // console.log(landmarkId);

  const saveRating = async (landmarkId: string, score: number) => {
    try {
      await createRating({ landmarkId, score });
      await fetchRating()
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRating = async () => {
    const fetchedRating = await fetchRatingDetail({ landmarkId });
    setRating(fetchedRating || 0);
  };

  useEffect(() => {
    fetchRating();
  }, [landmarkId]);

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="text-[20px] font-bold text-end">ให้คะแนนรีวิว</div>

        <div className="flex items-center gap-2">
          {RatingStar.map((score) => (
          
              <Star
              key={score}
                fill={score <= rating ? "yellow" : "none"}
                stroke={score <= rating ? "yellow" : "black"}
                 className="cursor-pointer hover:scale-125 transition-transform duration-200"
                onClick={() => saveRating(landmarkId, score)}
              />
         
          ))}

          <span className="text-lg font-semibold">{rating}/5</span>
        </div>
      </div>
    </div>
  );
};

export default LandmarkRatingDetail;

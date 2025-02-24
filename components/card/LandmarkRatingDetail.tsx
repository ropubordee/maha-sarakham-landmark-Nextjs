"use client";
import { createRating, fetchRatingDetail } from "@/blackend/actions";

import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";

const LandmarkRatingDetail = ({ landmarkId }: { landmarkId: string }) => {
  const [rating, setRating] = useState(0);
  console.log(landmarkId);

  const saveRating = async (landmarkId: string, score: number) => {
    try {
      await createRating({ landmarkId, score });
      setRating(score);
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
          {[1, 2, 3, 4, 5].map((score) => (
            <Star
              key={score}
              fill={score <= rating ? "yellow" : "none"}
              stroke="black"
              className="cursor-pointer hover:scale-110 transition-transform"
              onClick={() => saveRating(landmarkId, score)}
              size={30}
            />
          ))}

          <span className="text-lg font-semibold">{rating}/5</span>
        </div>
      </div>
    </div>
  );
};

export default LandmarkRatingDetail;

"use client";

import { IPerson } from "@/types/person-interface";
import UserAvatar from "../ui/user-avatar";
import { Dot } from "lucide-react";
import { IReview } from "@/types/review-interface";
import { formatDistance } from "date-fns";

interface Props {
  review: IReview;
}

function timeElapsedFrom(date: Date): string {
  const now = new Date();
  return formatDistance(date, now) + " ago";
}

export default function Review({ review }: Readonly<Props>) {
  const person = { name: "John Doe" } as IPerson;
  return (
    <div className="flex flex-row space-x-5">
      <div className="my-auto">
        <UserAvatar src={person.avatar} alt={person.name} />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <span className="text-sm font-medium leading-none">
            {person.name}
          </span>
          <Dot size={25} />
          <span className="text-sm text-muted-foreground">
            {review.date && timeElapsedFrom(new Date(review.date))}
          </span>
        </div>
        <p className="text-sm">{review.comment}</p>
      </div>
    </div>
  );
}

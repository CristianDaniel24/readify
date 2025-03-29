import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

export default function UserAvatar({ src, alt }: Readonly<Props>) {
  if (!src) {
    return (
      <Avatar className="h2 w-8 rounded-full">
        <AvatarFallback className="rounded-full">CN</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <div className="h-8 w-8 rounded-full overflow-hidden">
      <Image src={src} alt={alt} width={128} height={128} objectFit="cover" />
    </div>
  );
}

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RiRobot3Fill } from "react-icons/ri";

const ChatItem = () => {
  return (
    <div className="flex items-center justify-center border-b border-solid border-[#dddddd35] pl-5">
      <Avatar className="bg-black">
        <AvatarFallback>
          <RiRobot3Fill size={32} />
        </AvatarFallback>
      </Avatar>
      <div className="flex max-w-sm flex-col gap-2 px-8 py-4">
        <p className="text-lg font-semibold">Chat 1</p>
        <p className="line-clamp-2 text-sm text-white">
          Last message was this and this is it and this is a lorem meadfjdkj
          kjadskf aksdljfalkdkaldsf dslkafjlkds kladsjfklaj alkdsjf lasldkjf j
          sdlkfjdklsjflsdk kldsjflkadsjflkajsdfklj kladsfjkl
        </p>
      </div>
    </div>
  );
};

export default ChatItem;

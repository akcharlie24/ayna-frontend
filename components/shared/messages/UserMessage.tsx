import { timeAgo } from "@/lib/utils";

const UserMessage = ({ text, date }: { text: string; date: Date }) => {
  const dateString = timeAgo(date);
  return (
    <div className="flex gap-2 self-end">
      <div className="flex flex-col">
        <p className="flex max-w-lg rounded-xl bg-[#5183fe] p-3">{text}</p>
        <span className="p-1 text-sm text-gray-400">{dateString}</span>
      </div>
    </div>
  );
};

export default UserMessage;

import List from "./List";
import UserInfo from "./UserInfo";

const ChatList = () => {
  return (
    <div className="flex-[1]">
      <div className="flex flex-col gap-4 p-4">
        <UserInfo />
        <List />
      </div>
    </div>
  );
};

export default ChatList;

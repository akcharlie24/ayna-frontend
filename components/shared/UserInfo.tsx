import { FaPlus } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { Button } from "../ui/button";

const UserInfo = () => {
  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold">John Doe</h2>
        <Button>
          <IoLogOutOutline size={32} />
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <Button className="flex w-1/3 items-center justify-center gap-2 bg-[rgba(17,25,40,0.5)] ">
          <p className="text-sm font-semibold">Add Chat</p>
          <FaPlus />
        </Button>
      </div>
    </div>
  );
};

export default UserInfo;

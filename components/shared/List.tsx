import ChatItem from "./ChatItem";

const List = () => {
  return (
    // TODO: correct the over-flow scroll
    <div className="flex max-h-[70vh] min-h-[70vh] cursor-pointer flex-col overflow-y-scroll">
      {[...Array(25)].map((_, index) => (
        <ChatItem key={index} />
      ))}
    </div>
  );
};

export default List;

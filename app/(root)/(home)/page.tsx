import getResponse from "@/lib/actions/getResponse.action";

const Home = async () => {
  getResponse();
  return <div>Home</div>;
};

export default Home;

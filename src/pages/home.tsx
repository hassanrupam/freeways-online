import GridCanvas from "@/components/GridCanvas";
import { useSession } from "next-auth/react";

const Home = () => {

  const { data: session } = useSession();

  return (
    <>
      {session ? <GridCanvas /> : <div>NOTHING</div>} 
      </>
  );
};

export default Home;

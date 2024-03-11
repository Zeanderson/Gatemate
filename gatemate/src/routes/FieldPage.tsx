import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FieldGLMap from "../components/FieldMap";
import GateAnalysisBox from "../components/GateAnalysis";
import GateBanner from "../components/GateBanner";
import ClipLoader from "react-spinners/ClipLoader";
import "@reach/combobox/styles.css";


function checkSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const data = await axios.get("/api/v1/user/session");
      return data.data;
    },
  });
}

// The "Top Level" component ( really the bottom function on the page ) is the one that is exported, and usually we do not want ~logic there
// We only want to render the data, so we create a new component called Weather that will handle the logic and rendering of the data ( This keeps organzation clean, and debugging easy )

function Home() {
  const session = checkSession();

  if (session.isLoading || session.data === undefined) {
    return <ClipLoader />;
  }

  // Session found can move on!
  if (session.data.status === "200") {
    return (
      <div className="flex flex-col gap-2 p-2">
        <div className="flex flex-row gap-2 font-Arvo font-bold">
          <FieldGLMap className="basis-10/12" />
          <div className="flex flex-col gap-1 basis-2/12">
            <GateBanner />
            <GateAnalysisBox />
          </div>
        </div>
      </div>
    );
  }

  // Session not found, go back to sign-in
  if (session.data.status === "404") {
    window.location.href = `/`;
  }
}

export default Home;

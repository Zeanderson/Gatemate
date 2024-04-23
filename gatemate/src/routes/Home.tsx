import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import UserBanner from "../components/UserBanner";
import WeatherBanner from "../components/WeatherBanner";
import MainGLMap from "../components/MainMap";
import ClipLoader from "react-spinners/ClipLoader";
import HomeAnalysisBox from "../components/FieldAnalysis";
import "@reach/combobox/styles.css";

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
};

type HeaderProps = {
  user: UserData;
};

function checkSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const data = await axios.get("/api/v1/user/session");
      return data.data;
    },
  });
}

function getTraffic() {
  return useQuery({
    queryKey: ["traffic"],
    queryFn: async () => {
      const traffic = await axios.get("/api/v1/traffic/gen1");
      return traffic.data
    }
  })
}

function getUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await axios.get("/api/v1/user/getUser", {
        withCredentials: true,
      });
      return data.data;
    },
  });
}

function Header({ user }: HeaderProps) {
  return (
    <div className={"flex flex-row gap-2 font-Arvo font-bold"}>
      <WeatherBanner className={"basis-11/12"} />
      <UserBanner
        userName={`Welcome ${user.firstName}`}
        className={"basis-1/12"}
      />
    </div>
  );
}

function Body() {
  return (
    <div className={"flex flex-row gap-2 font-Arvo font-bold"}>
      <HomeAnalysisBox className="basis-2/12" />
      <MainGLMap className="basis-10/12" />
    </div>
  );
}

// The "Top Level" component ( really the bottom function on the page ) is the one that is exported, and usually we do not want ~logic there
// We only want to render the data, so we create a new component called Weather that will handle the logic and rendering of the data ( This keeps organzation clean, and debugging easy )
//TODO Dark and Light mode for theme
function Home() {
  const session = checkSession();
  const userData = getUser();
  const traffic = getTraffic();

  useEffect(() => {
    if (session.isLoading || session.data === undefined) return;

    if (session.data.status === "200") {
      if (traffic.isLoading || traffic.data === undefined) return;

      if (traffic.data.status === "200") {
        console.log(traffic.data);
        const user: UserData = userData.data;
        // Perform any side effects related to successful session and traffic fetching here
      } else {
        window.location.href = `/`;
      }
    } else {
      window.location.href = `/`;
    }
  }, [session, userData, traffic]);

  if (session.isLoading || userData.isLoading || traffic.isLoading) {
    return <ClipLoader />;
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      <Header user={userData.data} />
      <Body />
    </div>
  );
}

// function Home() {
//   const session = checkSession();
//   const userData = getUser();

//   if (
//     session.isLoading ||
//     session.data === undefined ||
//     userData.isLoading ||
//     userData.data === undefined
//   ) {
//     return <ClipLoader />;
//   }

//   // Session found can move on!
//   if (session.data.status === "200") {
//     const traffic = getTraffic();
//     if (traffic.isLoading || traffic.data === undefined) {
//       return <ClipLoader />
//     }

//     if (traffic.data.status === "200") {
//       console.log(traffic.data)
//       const user: UserData = userData.data;
//       return (
//         <div className="flex flex-col gap-2 p-2">
//           <Header user={user} />
//           <Body />
//         </div>
//       );
//     } else {
//       window.location.href = `/`;
//     }
//   }

//   // Session not found, go back to sign-in
//   if (session.data.status === "404") {
//     window.location.href = `/`;
//   }
// }

export default Home;

import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";

async function checkAuth(user: string, pass: string) {
  try {
    const response = await axios.post("/api/v1/user/login", {
      email: user,
      password: pass,
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

function checkSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const data = await axios.get("/api/v1/user/session");
      return data.data;
    },
  });
}

function Signin() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [shown, setShown] = useState<boolean>(false);

  const session = checkSession();

  if (session.isLoading || session.data === undefined) {
    return <ClipLoader />;
  }

  // Session found, send to home page with email
  if (session.data.status === "200") {
    window.location.href = `/home?user=${session.data.user}`;
  }

  // No session found
  if (session.data.status === "404") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className={"flex flex-col gap-10 p-2"}>
          <h1 className="text-3xl text-center">Sign In</h1>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center">
              <label className="text-lg">Username/Email</label>
              <input
                id="user"
                className="max-w-xs rounded-lg p-2 "
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="text-lg">Password</label>
              <input
                id="pass"
                className="max-w-xs rounded-lg p-2 "
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {shown ? <p className="text-red-500">Invalid credintials</p> : null}
            <button
              onClick={() => {
                checkAuth(username, password).then((data) => {
                  if (data.status === "200") {
                    window.location.href = `/home?user=${username}`;
                  }
                  if (data.status === "404") {
                    setShown(true);
                  }
                });
              }}
              className="border border-solid rounded-xl p-1 max-w-[10rem] mx-auto hover:bg-blue-500 hover:border-none"
            >
              Sign In
            </button>
          </div>

          <a className="flex max-w-[10rem] mx-auto" href="/signup">
            <button className="border border-solid rounded-xl p-1 hover:bg-blue-500 hover:border-none">
              Sign Up
            </button>
          </a>
        </div>
      </div>
    );
  }
}

export default Signin;

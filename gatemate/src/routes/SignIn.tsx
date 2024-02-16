import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import backgroundImage from "../images/agri-vector.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWheatAwn } from "@fortawesome/free-solid-svg-icons";

async function checkAuth(email: string, pass: string) {
  try {
    const response = await axios.post("/api/v1/user/login", {
      email: email,
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
  const [email, setEmail] = useState<string>("");
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
      <div
        className="flex items-center justify-center h-screen font-Arvo"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="bg-Corp2 rounded-3xl pt-40 pb-40 p-36 shadow-xl shadow-Nature1">
          <div
            className={
              "flex flex-col gap-5 p-10 bg-Corp3 rounded-2xl shadow-inner shadow-Nature1"
            }
          >
            <div className="flex flex-col items-center gap-1">
              <FontAwesomeIcon size={"2xl"} icon={faWheatAwn} />
              <h1 className="text-3xl text-center">Gatemate</h1>
            </div>
            <div className="flex flex-col gap-4">
              <input
                id="email"
                placeholder="Email"
                className="max-w-xs rounded-lg p-2 bg-slate-300 text-black"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <input
                id="pass"
                placeholder="Password"
                className="max-w-xs rounded-lg p-2 bg-slate-300 text-black"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              {shown ? (
                <p className="text-red-500">Invalid credintials</p>
              ) : null}
            </div>

            <button
              onClick={() => {
                checkAuth(email, password).then((data) => {
                  if (data.status === "200") {
                    window.location.href = `/home?user=${email}`;
                  }
                  if (data.status === "404") {
                    setShown(true);
                  }
                });
              }}
              className="border border-solid rounded-xl p-1 hover:bg-Corp2 hover:border-Corp2"
            >
              Sign In
            </button>

            <button
              className="border border-solid rounded-xl p-1 hover:bg-Corp2 hover:border-Corp2"
              onClick={() => {
                window.location.href = "/signup";
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;

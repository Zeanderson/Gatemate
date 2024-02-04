import { useState } from "react";
import axios from "axios";

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

function Signin() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [shown, setShown] = useState<boolean>(false);

  checkAuth("", "").then((data) => {
    if (data.message === "User already logged in") {
      console.log(data.user);
      window.location.href = `/home?user=${data.user}`;
    }
  });
  return (
    <div className="flex items-center justify-center h-screen">
      <div className={"flex flex-col gap-10 p-2"}>
        <h1 className="text-3xl text-center">Sign In</h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col items-center">
            <label className="text-lg">Username/Email</label>
            <input
              id="user"
              className="max-w-xs rounded-lg"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="text-lg">Password</label>
            <input
              id="pass"
              className="max-w-xs rounded-lg"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {shown ? <p className="text-red-500">Invalid credintials</p> : null}
          <button
            onClick={() => {
              checkAuth(username, password).then((data) => {
                if (data.message === "Login successful") {
                  console.log(data.message);
                  window.location.href = `/home?user=${username}`;
                }
                if (
                  data.message === "Login failed" ||
                  data === "User not found" ||
                  data === "Internal server error"
                ) {
                  console.log(data.message);
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

export default Signin;

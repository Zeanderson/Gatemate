import { useState } from "react";
import axios from "axios";

async function registerUser(user: string, pass: string) {
  try {
    const response = await axios.post("/api/v1/user/register", {
      email: user,
      password: pass,
    });
    console.log("Response: " + response);
  } catch (error) {
    console.error("Error:", error);
  }
}

function Register() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="flex items-center justify-center h-screen">
      <div className={"flex flex-col gap-10 p-2"}>
        <h1 className="text-3xl text-center">Sign Up</h1>
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

          <button
            onClick={() => {
              registerUser(username, password);
            }}
            className="border border-solid rounded-xl p-1 max-w-[10rem] mx-auto hover:bg-blue-500 hover:border-none"
          >
            Sign Up
          </button>
        </div>

        <a className="flex max-w-[10rem] mx-auto" href="/">
          <button className="border border-solid rounded-xl p-1 hover:bg-blue-500 hover:border-none whitespace-no-wrap">
            Back to Sign In
          </button>
        </a>
      </div>
    </div>
  );
}

export default Register;

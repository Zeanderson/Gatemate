import { useState } from "react";
import { ChangeEvent } from "react";

function submitUser(user: string, pass: string) {
    console.log(user)
    console.log(pass)
    return true
}

function Signup() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
    <div className="flex items-center justify-center h-screen">
        <div className={'flex flex-col gap-10 p-2'}>
            <h1 className='text-3xl text-center'>Sign Up</h1>
            <div className='flex flex-col gap-2'>

                <div className="flex flex-col items-center">
                    <label className="text-lg">Username/Email</label>
                    <input id="user" className='max-w-xs rounded-lg' value={username} onChange={handleUsernameChange} />
                </div>

                <div className="flex flex-col items-center">
                    <label className="text-lg">Password</label>
                    <input id="pass" className='max-w-xs rounded-lg' type="password" value={password} onChange={handlePasswordChange} />
                </div>

                <button onClick={() => {submitUser(username,password)}} className='border border-solid rounded-xl p-1 max-w-[10rem] mx-auto hover:bg-blue-500 hover:border-none'>Sign Up</button>
            </div>

            <a className='flex max-w-[10rem] mx-auto' href="/">
                <button className='border border-solid rounded-xl p-1 hover:bg-blue-500 hover:border-none whitespace-no-wrap'>Back to Sign In</button>
            </a>
        </div>
    </div>
    )
}

export default Signup;
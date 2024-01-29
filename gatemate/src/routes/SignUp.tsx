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
    <div className={'flex flex-col gap-10 p-2'}>
        <h1 className='text-2xl'>Sign up</h1>
        <div className='flex flex-col gap-2'>

            <label>Username / Email</label>
            <input id="user" className='max-w-xs' value={username} onChange={handleUsernameChange} />

            <label>Password</label>
            <input id="pass" className='max-w-xs' type="password" value={password} onChange={handlePasswordChange} />

            <button onClick={() => {submitUser(username,password)}} className='border border-solid rounded-xl p-1 max-w-[10rem] hover:bg-blue-500 hover:border-none'>Sign in</button>
        </div>

        <a className='flex max-w-[4rem]' href="/">
            <button className='border border-solid rounded-xl p-1 hover:bg-blue-500 hover:border-none'>Back to sign in</button>
        </a>
    </div>
    )
}

export default Signup;
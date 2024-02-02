import { useState , ChangeEvent } from "react";
function checkAuth(user: string, pass: string) {
    console.log(user)
    console.log(pass)
    return true
}

function Signin() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSignIn = async () => {
        try {
            // Call the checkAuth function to perform authentication
            const isAuthenticated = await checkAuth(username, password);
            if (isAuthenticated) {
                // Redirect to the "/home" page if authentication is successful
                window.location.href = "/home";} else {
                // Handle authentication failure
                console.log("Authentication failed");
            }
        } catch (error) {
            // Handle error if checkAuth fails
            console.error("Authentication error:", error);
        }
    };

    return (
    <div className="flex items-center justify-center h-screen">
        <div className={'flex flex-col gap-10 p-2'}>
            <h1 className='text-3xl text-center'>Sign In</h1>
            <div className='flex flex-col gap-2'>

            <div className="flex flex-col items-center">
                <label className="text-lg">Username/Email</label>
                <input id="user" className='max-w-xs rounded-lg' value={username} onChange={handleUsernameChange} />
            </div>


            <div className="flex flex-col items-center">
                <label className="text-lg">Password</label>
                <input id="pass" className='max-w-xs rounded-lg' type="password" value={password} onChange={handlePasswordChange} />
            </div>

                <button onClick={handleSignIn} className='border border-solid rounded-xl p-1 max-w-[10rem] mx-auto hover:bg-blue-500 hover:border-none'>Sign In</button>
                
                {/* //TODO This does not need to be an "<a/> tag, we need a onClick on the button to go to a function to check things such as if inputs have correct things in them" */}
                {/* // or if there is anything. Call a backend call to check auth, and then return going to home with user data, or a error to sign up or invalid */}
            </div>

            <a className='flex max-w-[10rem] mx-auto' href="/signup">
                <button className='border border-solid rounded-xl p-1 hover:bg-blue-500 hover:border-none'>Sign Up</button>
            </a>
        </div>
    </div>
    )
}

export default Signin;
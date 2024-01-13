import React from 'react';

const ErrorPage: React.FC = () => {
    return (
        <div>
            <h1>Page not found!! Please check url</h1>
            <p><a href='/'>Navigate back to home</a></p>
        </div>
    );
};

export default ErrorPage;
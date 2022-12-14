import React from 'react';

const SecretPage = ({ isLoggedIn }) => {

    // const notLogin = () =>  redirect('/login')  

    if (isLoggedIn) {
        return (
            <div className="jumbotron text-center">
                <h3>This page is full of secrets!!!</h3>
            </div>
        );
    }

    //   return notLogin

};

export default SecretPage;

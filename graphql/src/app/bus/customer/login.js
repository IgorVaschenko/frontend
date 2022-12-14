import React from 'react'

///Hooks 
import { useCustomerAuth } from './hooks/useCustomerAuth';

export const Login = () => {

    const { handleChange, logIn, authorizedCustomer } = useCustomerAuth()

    const authorizedCustomerJSX = authorizedCustomer && (
        <>
            <p>Authorized Customer: <b>{authorizedCustomer.customer.name}</b></p>
        </>
    )

    return (
        <>
            <h1>Login</h1>
            <input type='text' placeholder='username' name='username' onChange={handleChange} /><br />
            <input type='password' placeholder='password' name='password' onChange={handleChange} /><br />
            <button type='submit' onClick={logIn}>Login</button>
            {authorizedCustomerJSX}
        </>
    );
}

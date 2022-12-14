import React from 'react'
import { useCustomerCreator } from './hooks/useCustomerCreator'

export const Customer = () => {
    const { handleChange, save, createdAccount, loading, error } = useCustomerCreator()

    const loadingJSX = loading && (
        <p>loading...</p>
    )
    const errorJSX = error && (
        <p>Somthing went wrong: {error.message}</p>
    )

    const customerJSX = createdAccount && (
        <p>We already created a new customer with name: {createdAccount.name}</p>
    )

    return (
        <>
            <h1>Registaration</h1>
            <input type='text' placeholder='name' name='name' onChange={handleChange} />
            <input type='text' placeholder='username' name='username' onChange={handleChange} />
            <input type='password' placeholder='password' name='password' onChange={handleChange} />
            <button type='submit' onClick={save}>Save</button>
            {loadingJSX}
            {errorJSX}
            {customerJSX}
        </>
    )
}
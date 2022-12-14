import React from 'react'
import { useQueryProfile } from './hooks/useProfile'

//Hooks

export const Profile = () => {

    const { getProfile, loading, error, profile } = useQueryProfile()

    const loadingJSX = loading && (
        <p>loading...</p>
    )
    const errorJSX = error && (
        <p>Somthing went wrong: {error.message}</p>
    )
    const profileJSX = profile && (
        <p>Name profile with ID = {profile.id} is {profile.name}</p>
    )

    const loadProfile = () => {
        const id = prompt('Enter ID')
        getProfile({
            variables: {
                id
            }
        })
    }

    console.log('data in profile', profile);
    return (
        <>
            <h3>Profile:</h3>
            <button onClick={loadProfile}>Get profile</button>
            {loadingJSX}
            {errorJSX}
            {profileJSX}
        </>
    )
}
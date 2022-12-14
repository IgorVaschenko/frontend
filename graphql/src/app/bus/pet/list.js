import React from 'react'
import { useQueryAllPets } from './hooks/useAllPets'

export const List = () => {

    const { loading, error, pets } = useQueryAllPets()

    if (loading) {
        return (
            <p>loading...</p>
        )
    }
    if (error) {
        return (
            <p>We have a problem: {error.message}</p>
        )
    }

    console.log('data in list', pets);

    return (
        <>
            <h3>List</h3>
            <ul>
                {pets.map(({ __typename, id, name, weight }) => (
                    <li key={id}>
                        <p>Type: {__typename}</p>
                        <p>Name: {name}</p>
                        <p>Weight: {weight}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}
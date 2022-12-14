import React from 'react'

//Hooks
import { useQueryAvailablePets } from './hooks/useQueryAvaiblePets'

export const Counter = () => {
    const {
        loading,
        error,
        data,
        refetch, // метод refech догрузит свежую порцию данных(или повторно)
        networkStatus //enum статус коды запроса(1-8) loading-1, setVariables-2, fetchMore-3, refetch-4, poll-6, ready-7, error-8  
    } = useQueryAvailablePets()
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

    console.log('data in counter', data);

    return (
        <>
            <h3>Counter</h3>
            <p>AvailablePets: {data.availablePets}</p>
        </>
    )
}
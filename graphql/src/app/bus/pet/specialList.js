import React from 'react'
import { useQueryAllAvailablePets } from './hooks/useQueryAllAvailablePets'

export const SpecialList = () => {

    const { getAllAvailablePets, loading, error, pets } = useQueryAllAvailablePets()

    const loaderJSX = loading && (
        <p>loading...</p>
    )

    const errorJSX = error && (
        <p>{error.message}</p>
    )

    const petsJSX = pets && pets.map(({ id, name, weight }) => (
        <p key={id}>
            <span>Name: {name}</span>
            <span>Weight: {weight}</span>
        </p>
    ))

    console.log('data in speciallist', pets);

    return (
        <>
            <h3>SpecialList</h3>
            <button onClick={getAllAvailablePets}>Get pets</button>
            {loaderJSX}
            {errorJSX}
            {petsJSX}
        </>
    )
}
//core
import React from 'react'
import { useChekin } from './hooks/useChekin'

//hooks

export const CheckinPet = () => {

    const { checkIn, pet, error, errorInGraph } = useChekin()

    const petJSX = pet && (
        <>
            <p>{pet.id}</p>
            <p>{pet.name}</p>
        </>
    )
    const errorJSX = error && (
        <p>{error.message}</p>
    )
    const errorInGraphJSX = errorInGraph && (
        <p>{errorInGraph.message}</p>
    )


    return (
        <>
            <h1>CheckinPet</h1>
            <button
                onClick={() => checkIn('C-1')}
            >
                Check in
            </button>
            {petJSX}
            {errorJSX}
            {errorInGraphJSX}
        </>
    )
}

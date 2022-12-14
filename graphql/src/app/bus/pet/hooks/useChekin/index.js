// //core
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'
import { useState } from 'react'


//mutations
const mutationChekin = loader('./gql/mutationChekin.graphql')

export const useChekin = () => {
    const [_checkIn, { data, error }] = useMutation(mutationChekin)
    const [errorInGraph, setErrorInGraph] = useState('')

    const checkIn = async (id) => {
        try {
            await _checkIn({
                variables: {
                    id
                }
            })
        } catch (err) {
            setErrorInGraph(err)
        }
    }

    const pet = data && data.checkIn.pet

    return {
        checkIn,
        pet,
        error,
        errorInGraph
    }
}
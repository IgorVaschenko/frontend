//Core
import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/react-hooks'
import { useState } from 'react';


//Hooks
import { useForm } from '../useForm'

//Mutations
const mutationLogin = loader('./gql/mutationLogin.graphql')


export const useCustomerAuth = () => {

    const [_logIn, { loading, error, data }] = useMutation(mutationLogin)

    const { form, handleChange } = useForm({
        username: '',
        password: ''
    })

    const authorizedCustomer = data && data.logIn
    const token = authorizedCustomer && authorizedCustomer.token

    if (token) {
        localStorage.setItem('token', token)
    }

    const logIn = () => {
        _logIn({
            variables: form
        })
    }


    return {
        handleChange,
        logIn,
        authorizedCustomer,
    }
}
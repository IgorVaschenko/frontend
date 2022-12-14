//Core
import { useMutation } from '@apollo/react-hooks'
import { useState } from 'react'
import { loader } from 'graphql.macro';


//Hooks
import { useForm } from '../useForm';


//Mutations
const mutationCreateAccount = loader('./gql/mutationCreateAccount.graphql')


export const useCustomerCreator = () => {

    const [_save, { loading, error, data }] = useMutation(mutationCreateAccount)

    const { form, handleChange } = useForm({
        name: "",
        username: "",
        password: ""
    })

    const save = () => {
        _save({
            variables: {
                account: form
            }
        })
    }
    // const [values, setValues] = useState({   ///in useForm()
    //     account: {
    //         name: "",
    //         username: "",
    //         password: ""
    //     }
    // })

    // const save = () => {
    //     const { account } = values
    //     addUser({
    //         variables: {
    //             account
    //         }
    //     })
    // }

    // const handleChange = (event) => {  ///in useForm()
    //     event.persist()
    //     setValues((prevValues) => ({
    //         account: {
    //             ...prevValues.account,
    //             [event.target.name]: event.target.value
    //         }
    //     }))
    // }

    return {
        handleChange,
        save,
        createdAccount: data && data.createAccount,
        loading,
        error,
    }
}
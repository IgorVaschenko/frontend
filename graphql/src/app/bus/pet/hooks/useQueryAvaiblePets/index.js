//Core
import { useQuery } from '@apollo/react-hooks';

import { loader } from 'graphql.macro'

//Queries
const queryAvailablePets = loader('./gql/queryAvaiblePets.graphql')

export const useQueryAvailablePets = () => {
    return useQuery(queryAvailablePets, {
        // variables: {type},
        // pollInterval: 500, /// перезарпос данных через заданной время(при невозможности установить подписку)
        // skip: !type ///получить из variables значение
    })
}
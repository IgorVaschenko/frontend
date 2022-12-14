// Core
// import ApolloClient from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context';  //подложить token юзера в запрос

// GraphQL Server
const uri = 'https://funded-pet-library.moonhighway.com/';

const link = createHttpLink({
    uri
})

//Auth
const authLink = setContext((_, { headers }) => { //пересбока контекста вместе с проверкой на надичие токена юзера
    const token = localStorage.getItem('token')
    console.log('token', token)

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

//Cache initialization
const cache = new InMemoryCache()


export const client = new ApolloClient({
    cache,
    // link: authLink.concat(link)
    link
});
// export const client = new ApolloClient({
//     uri
// });
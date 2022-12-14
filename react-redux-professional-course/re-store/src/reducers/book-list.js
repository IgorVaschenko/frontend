import {
    FETCH_BOOKS_REQUEST,
    FETCH_BOOKS_FAILURE,
    FETCH_BOOKS_SUCCESS,
} from "../types"

const updateBookList = (state, action) => {

    if (!state) return {
        books: [],
        loading: true,
        error: null,
    }

    switch (action.type) {
        case FETCH_BOOKS_REQUEST:
            return {
                ...state.bookList,
                books: action.payload,
                loading: false
            }
        case FETCH_BOOKS_SUCCESS:
            return {
                ...state.bookList,
                loading: true
            }
        case FETCH_BOOKS_FAILURE:
            return {
                ...state.bookList,
                loading: false,
                error: action.payload,
            }
        default:
            return state.bookList
    }
}

export default updateBookList
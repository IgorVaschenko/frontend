import {
    FETCH_BOOKS_REQUEST, FETCH_BOOKS_SUCCESS,
    FETCH_BOOKS_FAILURE, BOOK_ADDED_TO_CART,
    BOOK_REMOVE_FROM_CART, BOOK_DELETE_FROM_CART
} from "../types";

const booksLoaded = (newBooks) => ({
    type: FETCH_BOOKS_REQUEST,
    payload: newBooks
})

const booksInLoading = () => ({
    type: FETCH_BOOKS_SUCCESS,
})

const throwError = (error) => ({
    type: FETCH_BOOKS_FAILURE,
    payload: error
})

const fetchBooksOld = (service, dispatch) => () => {
    dispatch(booksInLoading())
    service.getBooks()
        .then((data) => {
            dispatch(booksLoaded(data))
        })
        .catch((error) => {
            dispatch(throwError(error))
        })
}
const fetchBooks = (service) => () => (dispatch) => {
    dispatch(booksInLoading())
    service.getBooks()
        .then((data) => dispatch(booksLoaded(data)))
        .catch((error) => dispatch(throwError(error)))
}

const onAddedToCart = (Bookid) => ({
    type: BOOK_ADDED_TO_CART,
    payload: Bookid
})
const bookAddedToCart = (Bookid) => ({
    type: BOOK_ADDED_TO_CART,
    payload: Bookid
})

const onRemoveFromCart = (Bookid) => ({
    type: BOOK_REMOVE_FROM_CART,
    payload: Bookid
})
const onDeleteFromCart = (Bookid) => ({
    type: BOOK_DELETE_FROM_CART,
    payload: Bookid
})

export {
    booksLoaded,
    booksInLoading,
    throwError,
    fetchBooks,
    onAddedToCart,
    onRemoveFromCart,
    onDeleteFromCart,
    fetchBooksOld,
    bookAddedToCart
}
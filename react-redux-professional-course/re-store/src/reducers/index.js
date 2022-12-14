import updateBookList from "./book-list"
import updateShoppingCart from "./shopping-cart"

const rootReducer = (state, action) => {
    return {
        bookList: updateBookList(state, action),
        shoppingCart: updateShoppingCart(state, action)
    }
}

export default rootReducer


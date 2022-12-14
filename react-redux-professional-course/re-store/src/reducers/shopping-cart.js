import {
    BOOK_ADDED_TO_CART,
    BOOK_REMOVE_FROM_CART,
    BOOK_DELETE_FROM_CART
} from "../types"

const updateShoppingCart = (state, action) => {

    if (!state) return {
        cardItems: [],
        orderTotal: 0
    }

    switch (action.type) {
        case BOOK_ADDED_TO_CART:
            return updateOrder(state, action, 1)
        case BOOK_REMOVE_FROM_CART:
            return updateOrder(state, action, -1)
        case BOOK_DELETE_FROM_CART:
            return {
                ...state.shoppingCart,
                cardItems: [...state.shoppingCart.cardItems.filter(({ id }) => id !== action.payload)],
                orderTotal: [...state.shoppingCart.cardItems.filter(({ id }) => id !== action.payload)].reduce((res, { total }) => res + total, 0)
            }
        default:
            return state.shoppingCart
    }
}

export default updateShoppingCart


export const updateCartItems = (cardItems, newItem, itemIdx) => {

    if (!newItem.count) return [...cardItems.filter(({ id }) => id !== newItem.id)]

    return itemIdx === -1
        ? [
            ...cardItems,
            newItem,
        ]
        : [
            ...cardItems.slice(0, itemIdx),
            newItem,
            ...cardItems.slice(itemIdx + 1),
        ]
}
export const updateCartItem = (item = {}, book, countBooks) => {
    const { id = book.id, title = book.title, count = 0, total = 0 } = item
    return {
        id,
        title,
        count: count + countBooks,
        total: total + countBooks * book.price,
    }
}
export const getArgs = (payload, books, cardItems) => {
    const bookId = payload
    const book = books.find((book) => bookId === book.id)
    const itemIdx = cardItems.findIndex(({ id }) => bookId === id)
    const item = cardItems[itemIdx]

    return {
        book,
        itemIdx,
        item,
    }
}
export const updateOrder = (state, action, countBooks) => {
    const { payload } = action
    const { bookList: { books }, shoppingCart: { cardItems } } = state

    const { book, itemIdx, item } = getArgs(payload, books, cardItems)
    const newItem = updateCartItem(item, book, countBooks)
    const updateCarts = updateCartItems(cardItems, newItem, itemIdx)
    return {
        ...state,
        cardItems: updateCarts,
        orderTotal: updateCarts.reduce((result, { total }) => result + total, 0)
    }
}
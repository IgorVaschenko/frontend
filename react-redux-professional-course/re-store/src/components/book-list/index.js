import { Component } from 'react';
import { connect } from 'react-redux';
import BookListItem from '../book-list-item';
import { withBookstoreService } from '../hoc'
import { fetchBooks, fetchBooksOld, bookAddedToCart, onAddedToCart } from '../../actions'
import { compose } from '../../utils'
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner'
import ErrorButton from '../error-boundry/error-button'
import { bindActionCreators } from 'redux';


class BookListContainer extends Component {

    componentDidMount() {
        fetchBooks()
    }

    render() {
        const { books, loading, error, onAddedToCart } = this.props

        if (loading) return <Spinner />
        if (error) return <ErrorIndicator error={error.message} />

        return <BookList books={books} onAddedToCart={onAddedToCart} />
    }
}

const BookList = ({ books, onAddedToCart }) => {

    return (
        <div>
            <ErrorButton />
            {books.map((book) => {
                const { id } = book
                return (
                    <div key={id}>
                        <BookListItem
                            book={book}
                            onAddedToCart={onAddedToCart}
                        />
                    </div>
                )
            }
            )}
        </div>
    )
}

const mapStateToProps = ({ bookList: { books, loading, error } }) => {
    return {
        books,
        loading,
        error
    }
}

const mapDispatchToPropsOld = (dispatch, ownProps) => {
    const { bookstoreService } = ownProps;
    return {
        fetchBooks: fetchBooksOld(bookstoreService, dispatch)(),
        onAddedToCart: (id) => () => dispatch(onAddedToCart(id))
    }
}
const mapDispatchToProps = (dispatch, { bookstoreService }) => {
    return bindActionCreators({
        fetchBooks: fetchBooks(bookstoreService),
        onAddedToCart: bookAddedToCart
    },dispatch)
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToPropsOld)
)(BookListContainer)


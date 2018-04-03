import React, { PureComponent } from 'react'
import { Debounce } from 'react-throttle';
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'

class ListSearch extends PureComponent {

    state = {
        query: '',
        results: [],
        books: [],
        erro: false
    }

    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        })

        if (query) {
            BooksAPI.search(query, 20)
                .then((results) => {
                    results.map((book) => {
                        this.props.books.map((book_) => {
                            if (book.id === book_.id) {
                                book.shelf = book_.shelf
                            }
                        })
                    })
                    results.length > 0 ? this.setState({ results: results, erro: false }) : this.setState({ results: [], erro: true })
                })
                .catch(error => {
                    console.log(error)
                })


        }
    }


    updateBook = (ev, book) => {
        console.log(ev)
        BooksAPI.update(book, ev).then((data) => {
            this.props.onMove();
        });
    }
    render() {


        const { query, results, erro } = this.state

        //showingBooks.sort(sortBy('author'))

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <Debounce time="400" handler="onChange">
                            <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateQuery(event.target.value)} />
                        </Debounce>
                    </div>
                </div>
                <div className="search-books-results">
                    {results.length > 0 && (
                        <div>
                            <h3>{results.length} books </h3>

                            <ol className="books-grid">
                                {results.map((book) => (
                                    <li key={book.id}>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                                <div className="book-shelf-changer">
                                                    <select value={book.shelf} onChange={(event) => this.updateBook(event.target.value, book)}>
                                                        <option value="none" disabled>Move to...</option>
                                                        <option value="currentlyReading">Currently Reading</option>
                                                        <option value="wantToRead">Want to Read</option>
                                                        <option value="read">Read</option>
                                                        <option value="none">None</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{book.title}</div>
                                            <div className="book-authors">{book.authors}</div>
                                        </div>
                                    </li>))}</ol>
                        </div>
                    )}
                    {erro && (
                        <div>
                            <div className=''>
                                <h3>No books were found!</h3>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default ListSearch
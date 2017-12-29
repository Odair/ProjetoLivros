import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'

class ListSearch extends Component {

    state = {
        query: '',
        results: []
    }

    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        })

        BooksAPI.search(query, 20).then((results) => { this.setState({ results }) })
    }


    updateBook = (ev, book) => {
        console.log(ev)
        BooksAPI.update(book, ev).then((data) => {
            this.props.onMove();
        });
    }
    render() {

        const { query } = this.state;



        //showingBooks.sort(sortBy('author'))

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.results.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(${book.imageLinks.thumbnail})' }}><img src={book.imageLinks.thumbnail}/></div>
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
            </div>
        )
    }
}

export default ListSearch
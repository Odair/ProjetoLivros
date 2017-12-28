import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from '../BooksAPI'

class ListBooks extends Component {

    updateBook = (ev, book) => {
        console.log(ev)
        BooksAPI.update(book, ev).then((data)=>{
            this.props.onMove();
        });
      }
    render() {

        const { title, books = []} = this.props;
        

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url({book.imageLinks.thumbnail})'}}></div>
                                        <div className="book-shelf-changer">
                                            <select value={book.shelf} onChange={(event) => this.updateBook(event.target.value,book)}>
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
                            </li>))}

                    </ol>
                </div>
            </div>)
    }
}

export default ListBooks
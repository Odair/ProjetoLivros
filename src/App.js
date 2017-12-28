import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import ListBooks from './components/ListBooks'
import ListSearch from './components/ListSearch'
import * as BooksAPI from './BooksAPI'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    booksSearch:[]
  }
  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    });
  }

  searchBooks = () => {
    BooksAPI.search().then((booksSearch) => {
      this.setState({booksSearch})
    })
  }




render() {
  return (
    <div className="app">

      <Route exact path='/' render={() => (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <ListBooks onMove={this.getBooks} title={'Currently Reading'} books={this.state.books.filter((c) => c.shelf === "currentlyReading")} />

              <ListBooks onMove={this.getBooks} title={'Want to Read'} books={this.state.books.filter((c) => c.shelf === "wantToRead")} />

              <ListBooks onMove={this.getBooks} title={'Read'} books={this.state.books.filter((c) => c.shelf === "read")} />

            </div>
          </div>
          <div className="open-search">
            <Link to='/search'>Add a book</Link>
          </div>
        </div>

      )} />
      <Route path='/search' render={(history) => (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to='/'>Close</Link>
            <div className="search-books-input-wrapper">
            <ListSearch booksSearch={this.state.booksSearch} />
              {/*
               NOTES: The search from BooksAPI is limited to a particular set of search terms.
               You can find these search terms here:
               https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

               However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
               you don't find a specific author or title. Every search is limited by search terms.
             */}
              <input type="text" placeholder="Search by title or author" />

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>

      )} />

    </div>
  )
}
}

export default BooksApp

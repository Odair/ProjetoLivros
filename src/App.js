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
    booksSearch: []
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll()
    this.setState({ books })

    const filter = books => shelf => books.shelf(b => b.shelf === shelf)
    const filterBy = filter(this.state.books)
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


          <ListSearch onMove={this.getBooks} books={this.state.books} booksSearch={this.state.booksSearch} />



        )} />

      </div>
    )
  }
}

export default BooksApp

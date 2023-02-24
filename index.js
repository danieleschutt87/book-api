//EXPRESS
const express = require('express')

//SERVICES
const { get_simple_list, get_list_overview } = require('./services/ny_times_calls')

//UTILITIES
const { decorate_with_google_preview } = require('./utilities/index')

//VALIDATOR
const { check_body_input } = require('./middleware/error-handler')

//ERROR VIEW
const error = require('./views/error')

//BODY PARSER
const bodyParser = require('body-parser')

const books = express()

books.use(bodyParser.urlencoded({ extended: true }))
books.use(bodyParser.text({ type: 'text/plain' }))
books.use(bodyParser.json({ type: 'application/json', limit: '50mb'}))

//declaring port
const port = process.env.PORT || 3000

const get_books_list = (req, res) => {
  //returns the flat books lists from ny times
  return get_simple_list()
  .then((res) => {
    let lists
    lists = res.results
    return lists
  })
  .then((lists) => res.status(200).json(lists))
  .catch(error.generic(res))
}

const retrieve_books_list = (req, res) => {
  //initializing list id
  const list_id = req.body.list_id
  //returning the books lists
  return get_list_overview()
  .then((res) => {
    //parsifying the response
    let lists = JSON.parse(JSON.stringify(res.results.lists))
    //serching for the specified list id
    let list = lists.find(list => list.list_id = list_id)
    //initializing the books of the specified list
    let books = list.books
    return Promise.resolve(books)
  })
  .then((books) => {
    //decorating books with a new property called google preview, making external call to google apis and retrieving the google preview for the single book
    return Promise.all(books.map(book => decorate_with_google_preview(book)))
  })
  .then((books) => res.status(200).json(books))
  .catch(error.generic(res))
}


books.get('/flat-list',
  get_books_list
)

books.post('/retrieve-books-list',
  //body validator
  check_body_input,
  retrieve_books_list
)

books.listen(port, () => {
  console.log(`Server is listening on specified port ${port}`);
})
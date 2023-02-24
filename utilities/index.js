const { get_book_data } = require('../services/google_calls')

const decorate_with_google_preview = (book) => {
    return get_book_data(book)
}

module.exports = { decorate_with_google_preview }
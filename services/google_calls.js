const axios = require('axios')
const config = require('config')

const get_book_data = (book) => {
    return axios({
        url: `${config.googleapis_url}/books/v1/volumes?q=${book.title}&key=${config.google_api_key}`,
        method: 'get',
        json: true
    })
    .then((res) => {
        book.google_preview = res.data.items[0].selfLink
        return Promise.resolve(book)
    })
    .catch(() => {
        //in case of error, returning the book without the preview
        return Promise.resolve(book)
    })
}

module.exports = { get_book_data }
//AXIOS
const axios = require('axios')
//CONFIG
const config = require('config')

const get_simple_list = () => {
    return axios({
        url: `${config.ny_times_url}/lists/names.json?api-key=${config.ny_times_api_key}`,
        method: 'get',
        json: true
    })
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        return Promise.reject({ message: err.response.statusText, status: err.response.status })
    })
}

const get_list_overview = () => {
    return axios({
        url: `${config.ny_times_url}/lists/full-overview.json?api-key=${config.ny_times_api_key}`,
        method: 'get',
        json: true
    })
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        return Promise.reject({ message: err.response.statusText, status: err.response.status })
    })
}

module.exports = { get_simple_list, get_list_overview }
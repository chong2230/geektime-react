import axios from 'axios';
import Config from '../config/config';

axios.defaults.baseURL = '';
axios.defaults.headers.common['Aughorization'] = 'Bearer ' + localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 10000;

axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        return Promise.reject(error);
    }
)

const http = {};

http.request = (url, data={}, method, options={ baseUrl: Config.httpServer }, contentType) => {
    let config = {
        method,
        url: options.baseUrl + url
    }
    if (method === 'POST') {
        config.data = data;
    } else {
        config.params = data;
    }
    if (contentType) config['Content-Type'] = contentType;
    return new Promise((resolve, reject) => {
        axios(config).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        })
    })
}


http.post = (url, data={}, options, contentType) => {
    return http.request(url, data, 'POST', options, contentType);
}

http.get = (url, data, options) => {
    return http.request(url, data, 'GET', options);
}

export default http;
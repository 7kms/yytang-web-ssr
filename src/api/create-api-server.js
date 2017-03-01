import request from 'request';
import * as config from '../config';
var querystring = require('querystring');
var baseOptions = {
    credentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
};
function sendData (opt) {
    var promise = new Promise((resolve, reject) => {
       request(opt, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(body));
            }
        });
    })
    return promise;
}
function basePath (path) {
    return config.serverUrl + '/' + path;
}
function get (url, dataObj, opt = {}) {
    url = basePath(url) + '?' + querystring.stringify(dataObj)
    var options = Object.assign({}, baseOptions, { method: 'GET', url }, opt);
    var promise = new Promise((resolve, reject) => {
        var sendPromise = sendData(options);
        sendPromise.then(data => {
            resolve(data);
        }, error => {
            reject(error);
        })
    });
    return promise;
}

function post (url, dataObj, opt = {}) {
    url = basePath(url) + '?' + querystring.stringify(dataObj)
    var options = Object.assign({}, baseOptions, { method: 'POST', url }, opt);
    var promise = new Promise((resolve, reject) => {
        var sendPromise = sendData(options);
        sendPromise.then(data => {
            resolve(data);
        }, error => {
            reject(error);
        })
    });
    return promise;
}

export default {
    get,
    post
}

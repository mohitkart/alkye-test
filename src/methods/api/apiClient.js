/*
 * @file: index.js
 * @description: It Contain rest functions for api call .
 * @author: Mohit Kumar
 */

import axios from 'axios';
import { setAuthorizationToken } from '../auth';
import { toast } from 'react-toastify';
import loader from '../loader';
import environment from '../../environment';
import methodModel from '../methods';

var config = {
    headers: { 'Content-Type': 'application/json' },
};

var baseUrl = environment.api


const handleError = (err, hideError) => {
    let message = ''
    if (err) {
        if (err && err.error && err.error.code == 401) {
            localStorage.removeItem("persist:admin-app")
            localStorage.removeItem("token")
            hideError = true
            methodModel.route('/')
        }
        message = err && err.error && err.error.message
        if (!message) message = err.message
        if (!message) message = 'Server Error'
    }
    // if (!hideError) toast.error(message);
}

class ApiClient {
    static post(url1, params, base = '', hideError = false) {
        let url = baseUrl + url1
        if (base) url = base + url1

        setAuthorizationToken(axios);
        return new Promise(function (fulfill, reject) {
            axios
                .post(url, JSON.stringify(params), config)
                .then(function (response) {
                    let res=response && response.data
                    fulfill({
                        data:res,
                        status:response.status,
                        statusText:response.statusText,
                        success: true
                    });
                })
                .catch(function (error) {
                    loader(false)
                    if (error && error.response) {
                        let eres = error.response;
                        let res={
                            data:eres.data,
                            status:eres.status,
                            statusText:eres.statusText,
                            success: false
                        }
                        handleError(res, hideError)
                        fulfill(res);
                    } else {
                        toast.error('Network Error')
                        reject(error);
                    }
                });
        });
    }

    static put(url1, params, base = '') {
        let url = baseUrl + url1
        if (base) url = base + url1
        setAuthorizationToken(axios);
        return new Promise(function (fulfill, reject) {
            axios
                .put(url, JSON.stringify(params), config)
                .then(function (response) {
                    let res=response && response.data
                    fulfill({
                        data:res,
                        status:response.status,
                        statusText:response.statusText,
                        success: true
                    });
                })
                .catch(function (error) {
                    loader(false)
                    if (error && error.response) {
                        let eres = error.response;
                        let res={
                            data:eres.data,
                            status:eres.status,
                            statusText:eres.statusText,
                            success: false
                        }
                        handleError(res, hideError)
                        fulfill(res);
                    } else {
                        toast.error('Network Error')
                        reject(error);
                    }
                });
        });
    }

    static get(url1, params = {}, base = '', hidError = '') {

        let url = baseUrl + url1
        if (base) url = base + url1
        setAuthorizationToken(axios);
        return new Promise(function (fulfill, reject) {
            axios
                .get(url, {...config,params:params})
                .then(function (response) {
                    let res=response && response.data
                    fulfill({
                        data:res,
                        status:response.status,
                        statusText:response.statusText,
                        success: true
                    });
                })
                .catch(function (error) {
                    loader(false)
                    if (error && error.response) {
                        let eres = error.response;
                        let res={
                            data:eres.data,
                            status:eres.status,
                            statusText:eres.statusText,
                            success: false
                        }
                        handleError(res, hideError)
                        fulfill(res);
                    } else {
                        toast.error('Network Error')
                        reject(error);
                    }
                });
        });
    }

    static delete(url1, params = {}, base = '') {
        let url = baseUrl + url1
        if (base) url = base + url1
        setAuthorizationToken(axios);
        return new Promise(function (fulfill, reject) {
            axios
                .delete(url, {...config,params:params})
                .then(function (response) {
                    let res=response && response.data
                    fulfill({
                        data:res,
                        status:response.status,
                        statusText:response.statusText,
                        success: true
                    });
                })
                .catch(function (error) {
                    loader(false)
                    if (error && error.response) {
                        let eres = error.response;
                        let res={
                            data:eres.data,
                            status:eres.status,
                            statusText:eres.statusText,
                            success: false
                        }
                        handleError(res, hideError)
                        fulfill(res);
                    } else {
                        toast.error('Network Error')
                        reject(error);
                    }
                });
        });
    }

    static allApi(url, params, method = 'get') {
        if (method == 'get') {
            return this.get(url, params)
        } else if (method == 'put') {
            return this.put(url, params)
        } if (method == 'post') {
            return this.post(url, params)
        }
    }

    /*************** Form-Data Method ***********/
    static postFormData(url, params) {
        url = baseUrl + url
        setAuthorizationToken(axios);
        return new Promise(function (fulfill, reject) {
            var body = new FormData();
            let oArr = Object.keys(params)
            oArr.map(itm => {
                body.append(itm, params[itm]);
            })

            axios
                .post(url, body, config)
                .then(function (response) {
                    let res=response && response.data
                    fulfill({
                        data:res,
                        status:response.status,
                        statusText:response.statusText,
                        success: true
                    });
                })
                .catch(function (error) {
                    loader(false)
                    if (error && error.response) {
                        let eres = error.response;
                        let res={
                            data:eres.data,
                            status:eres.status,
                            statusText:eres.statusText,
                            success: false
                        }
                        handleError(res, hideError)
                        fulfill(res);
                    } else {
                        toast.error('Network Error')
                        reject(error);
                    }
                });
        });
    }

 static async multiImageUpload(url, files,params={},key = 'file') {
    url = baseUrl + url
    setAuthorizationToken(axios);
    let body = new FormData();

    let i = 0
    for (let item of files) {
        let file = files.item(i)
        body.append(key, file);
        i++
    }

    return await axios.post(url, body, { ...config, headers: { "Content-Type": "multipart/form-data;" },params:params})
        .then(function (response) {
            return response && response.data
        })
        .catch(function (error) {
            return error && error.response
        });
}


}

export default ApiClient;

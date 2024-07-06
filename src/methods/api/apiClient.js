/*
 * @file: index.js
 * @description: It Contain rest functions for api call .
 * @author: Poonam
 */

import axios from 'axios';
import querystring from 'querystring';
import { setAuthorizationToken } from '../auth';
import { toast } from 'react-toastify';
import loader from '../loader';
import environment from '../../environment';
import methodModel from '../methods';
import { BlockBlobClient, AnonymousCredential } from '@azure/storage-blob';

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
    if (!hideError) toast.error(message);
}


const sasKey = environment.sasKey
const sasurl = environment.sasurl
const container = environment.container


function buildBlobName(file) {
    var filename = file.name.substring(0, file.name.lastIndexOf('.'));
    var ext = file.name.substring(file.name.lastIndexOf('.'));
    return filename + '_' + Math.random().toString(16).slice(2) + ext;
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
                    fulfill(response && response.data);
                })
                .catch(function (error) {
                    loader(false)
                    if (error && error.response) {
                        let eres = error.response;
                        handleError(eres.data, hideError)
                        fulfill({ ...eres.data, success: false });
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
                    fulfill(response && response.data);
                })
                .catch(function (error) {
                    loader(false)
                    if (error && error.response) {
                        let eres = error.response;
                        handleError(eres.data)
                        fulfill(eres.data);
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

        let query = querystring.stringify(params);
        url = query ? `${url}?${query}` : url;
        setAuthorizationToken(axios);
        return new Promise(function (fulfill, reject) {
            axios
                .get(url, config)
                .then(function (response) {
                    fulfill(response && response.data);
                })
                .catch(function (error) {
                    loader(false)
                    if (error && error.response) {
                        let eres = error.response;
                        handleError(eres.data, hidError)
                        fulfill({ ...eres.data, success: false });
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

        let query = querystring.stringify(params);
        url = query ? `${url}?${query}` : url;
        setAuthorizationToken(axios);
        return new Promise(function (fulfill, reject) {
            axios
                .delete(url, config)
                .then(function (response) {
                    fulfill(response && response.data);
                })
                .catch(function (error) {
                    loader(false)
                    if (error && error.response) {
                        let eres = error.response;
                        handleError(eres.data)
                        fulfill(eres.data);
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
                    fulfill(response && response.data);
                })
                .catch(function (error) {
                    loader(false)
                    if (error && error.response) {
                        let eres = error.response;
                        handleError(eres.data)
                        fulfill(eres.data);
                    } else {
                        toast.error('Network Error')
                        reject(error);
                    }
                });
        });
    }

    static postFormFileData(url, params) {
        let configupdate = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };
        url = baseUrl + url
        setAuthorizationToken(axios);
        return new Promise(function (fulfill, reject) {
            var body = new FormData();
            let oArr = Object.keys(params)
            oArr.map(itm => {
                body.append(itm, params[itm]);
            })

            axios
                .post(url, body, configupdate)

                .then(function (response) {
                    fulfill(response && response.data);
                })
                .catch(function (error) {
                    loader(false)
                    if (error && error.response) {
                        let eres = error.response;
                        handleError(eres.data)
                        fulfill(eres.data);
                    } else {
                        toast.error('Network Error');
                        reject(error);
                    }
                });
        });
    }



    static async azureUpload({ file }) {
        return new Promise(function (fulfill, reject) {
            var blobName = buildBlobName(file);
            var login = `${sasurl}/${container}/${blobName}?${sasKey}`;
            var blockBlobClient = new BlockBlobClient(login, new AnonymousCredential());
            blockBlobClient.uploadBrowserData(file).then(res => {
                console.log("res", res)
                fulfill({ success: true, fileName: blobName })
            }).catch(err => {
                console.log("err", err)
                fulfill({ success: false, message: err })
            });
        });
    }

    static async azureBlobDelete({ fileName }) {
        const options = {
            deleteSnapshots: 'include' // or 'only'
          }
        return new Promise(function (fulfill, reject) {
            var blobName = fileName;
            var login = `${sasurl}/${container}/${blobName}?${sasKey}`;
            var blockBlobClient = new BlockBlobClient(login, new AnonymousCredential());
            blockBlobClient.deleteIfExists(options).then(res=>{
                fulfill({success:true})
                console.log("delete res", res)
            }).catch(err=>{
                console.log("delete err", err)
                fulfill({success:false,message: err})
            })
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

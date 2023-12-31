export class Requester{
    post(URI, formData, onSuccess = null, onError = null){
        this.activate(URI, 'POST', formData, onSuccess, onError);
    }

    get(URI, formData, onSuccess = null, onError = null){
        this.activate(URI, 'GET', formData, onSuccess, onError);
    }

    patch(URI, formData, onSuccess = null, onError = null){
        this.activate(URI, 'PATCH', formData, onSuccess, onError);
    }

    delete(URI, formData, onSuccess = null, onError = null){
        this.activate(URI, 'DELETE', formData, onSuccess, onError);
    }

    activate(URI, requestMethod, formData, onSuccess = null, onError = null){
        fetch(URI, {
            method: requestMethod,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) return response.json();
            throw Promise.reject(response);
        }).then(data => {
            if(typeof onSuccess !== null && typeof onSuccess === 'function') onSuccess(data);
        }).catch(response => {
            try{
                response.catch(res => {
                    if(typeof onError !== null && typeof onError === 'function') onError(res);
                });
            }catch (ex){
                console.log(ex.message());
            }
        });
    }

    async call(requestMethod){
        let xhr = new XMLHttpRequest();
        xhr.open(requestMethod, this.url, true);
        for (const [name, value] of Object.entries(this.headers)) {
            xhr.setRequestHeader(name, value);
        }

        let success = this.getSuccess(), fail = this.getError();

        await xhr.onload = function () {
            try {
                if (xhr.status >= 200 && xhr.status < 300) {
                    return success(xhr.responseText);
                }
                return fail(xhr.status, xhr.statusText);
            }catch (ex){
                console.error(ex);
            }
        };

        xhr.onerror = function () {
            return fail(0, "request failed");
        };

        try {
            xhr.send(JSON.stringify(this.formData));
        }catch (ex){
            console.error(ex);
        }
        return this;
    }

    URL(url){
        this.url = url;
        return this;
    }

    onError(callback){
        this.errorCallback = callback;
        return this;
    }

    onSuccess(callback){
        this.successCallback = callback;
        return this;
    }

    onUpload(callback){
        this.uploadCallback = callback;
        return this;
    }

    headers(headers){
        this.headers = headers;
        return this;
    }

    formData(formData){
        this.formData = formData;
        return this;
    }

    getSuccess(){
        return typeof this.successCallback === 'function' ? this.successCallback :
            ((response) => console.log(response))
    }

    getError(){
        return typeof this.successCallback === 'function' ? this.successCallback :
            ((errorCode, errorMessage) => console.log("Error: " + errorMessage + ", Code (" + errorCode + ")"))
    }

}

export class Requester{
    post(){
        return this.call("POST");
    }

    get(){
        return this.call("GET");
    }

    patch(){
        return this.call("PATCH");
    }

    delete(){
        return this.call("DELETE");
    }

    call(requestMethod){
        let xhr = new XMLHttpRequest();
        xhr.open(requestMethod, this.url, true);
        for (const [name, value] of Object.entries(this.headers)) {
            xhr.setRequestHeader(name, value);
        }
        let success = this.getSuccess(), fail = this.getError();

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                success(xhr.responseText);
                return;
            }
            fail(xhr.status, xhr.statusText)
        };

        xhr.onerror = function () {
            fail(0, "request failed")
        };

        xhr.send(this.formData);

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

    setHeaders(headers){
        this.headers = headers;
        return this;
    }

    setFormData(formData){
        this.formData = formData;
        return this;
    }

    getSuccess(){
        return typeof this.successCallback === 'function' ? this.successCallback :
            ((response) => console.log(response))
    }

    getError(){
        return typeof this.errorCallback === 'function' ? this.errorCallback :
            ((errorCode, errorMessage) => console.log("Error: " + errorMessage + ", Code (" + errorCode + ")"))
    }

}

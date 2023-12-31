import {Requester} from "./Requester.js";
export class FormHandler {

    constructor(forms = null) {
        this.forms = forms;
    }

    activate(forms = null){
        if(forms !== null) this.forms = forms;
        this.forms = Array.from(document.querySelectorAll(this.forms));
        this.forms.forEach(form => {
            this.onSubmit(form);
        });
        return this;
    }

    onSubmit(form){
        form.addEventListener('submit', event => {
            event.preventDefault();
            if(form.getAttribute("data-transfer") === "on") return false;
            form.setAttribute("data-transfer", "on");
            const formData = this.collectFormData(form);
            this.onRequest(formData, form.action, () => {
                form.setAttribute("data-transfer", "off");
            });
        });
        return this;
    }

    onValidate(form){

    }

    onRequest(formData, URL, then = null){
        let requester = new Requester;
        requester.URL(URL).setFormData(formData).setHeaders({Accept: 'application/json'})
        .onError(function (code, message) {
            console.log(code, message);
            if(typeof then === 'function') then();
        }).onSuccess(function (response) {
            if(typeof then === 'function') then();
        }).post();
    }

    collectFormData(form){
        const inputs = Array.from(form.querySelectorAll('input, select, textarea'));
        const formData = new FormData();
        for(let i = 0; i < inputs.length; i++){
            let input = inputs[i];
            let value = null;
            if(input.name.endsWith('[]')) {
                if(formData.has(input.name)) continue;
                let inputs = Array.from(form.querySelectorAll("input[name='" + input.name + "']"));
                value = this.inputArrayValue(inputs, input.name);
            }else {
                if(!this.valueFilter(input)) continue;
                value = this.inputSingleValue(input);
            }
            formData.append(value.name, value.value)
        }
        return formData;
    }

    inputSingleValue(input){
        return {
            name: input.name,
            value: input.type === "file" ? (input.files.length > 1 ? input.files : input.files[0]) : input.value
        };
    }

    inputArrayValue(inputs, name){
        return {
            name: name,
            value: inputs.filter(input => this.valueFilter(input)).map((input) => {
                if(input.type === "file"){
                    if(input.files.length > 1) return input.files;
                    return input.files[0];
                }
                return input.value;
            })
        };
    }

    valueFilter(input){
        if(input.classList !== undefined && input.classList.contains('data-ignore')) return false;
        if(input.getAttribute("type") !== "checkbox" && input.getAttribute("type") !== "radio") return true;
        return input.checked;
    }

    onValidationFail(callback){
        this.onValidateCallback = callback;
    }

    onError(callback){
        this.onErrorCallback = callback;
    }

    onSuccess(callback){
        this.onSuccessCallback = callback;
    }

}

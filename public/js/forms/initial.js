import {FormHandler} from './classes/FormHandler.js';
const form = new FormHandler(".system-data-form");
form.activate();
/*
class FormHandler1 {
    constructor(formClassName) {
        this.forms = Array.from(document.querySelectorAll(`.${formClassName}`));
        this.setupFormListeners();
    }

    setupFormListeners() {
        this.forms.forEach(form => {
            form.addEventListener('submit', event => {
                event.preventDefault();
                const formData = this.getFormData(form);
                this.submitForm(formData);
            });
        });
    }

    getFormData(form) {
        const inputs = Array.from(form.querySelectorAll('input'));
        return inputs.reduce((data, input) => {
            data[input.classList.contains('name') ? 'name' : 'email'] = input.value;
            return data;
        }, {});
    }

    submitForm(formData) {
        fetch('/your-server-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Form submitted:', data);
                this.resetForm();
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    resetForm() {
        this.forms.forEach(form => form.reset());
    }
}

const formHandler = new FormHandler('myForm');
*/

import './../scss/style.scss';
import GhHtmlElement from '@gudhub/gh-html-element';
import popup from './../cron-picker-popup.html';
import input from './../cron-picker-input.html';
import { initCronPicker } from './cron-picker.js';

const inputWithPopup = input + popup;

class CronPicker extends GhHtmlElement {
    constructor() {
        super();
        this.popupRendered = false;
    }

    onInit() {
        this.showSeconds = this.scope.field_model.data_model?.show_seconds || false;

        super.render(input);
    }

    onUpdate() {
        this.popupRendered = false

        super.render(input);
    }

    save() {
        this.value = this.querySelector('#generatedCron').value;
    }

    toggleCronPicker() {
        if(!this.popupRendered) {
            super.render(inputWithPopup);

            initCronPicker(this);

            this.popupRendered = true;
        }

        const popup = this.querySelector('.cron-picker__popup');
        popup.classList.toggle('active');
    }
    
}

if(!customElements.get('cron-picker')) {
    customElements.define('cron-picker', CronPicker);
}

import './../scss/style.scss';
import GhHtmlElement from '@gudhub/gh-html-element';
import popup from './../cron-picker-popup.html';
import input from './../cron-picker-input.html';
import { initCronPicker } from './cron-picker.js';

const inputWithPopup = input + popup;

class CronPicker extends GhHtmlElement {
    constructor() {
        super();
        this.appId;
        this.itemId;
        this.fieldId;
        this.popupRendered = false;
    }

    static get observedAttributes() {
        return ['app-id'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'app-id' && newValue.indexOf('{{') == -1) {
            setTimeout(() => {
                this.getAttributes();

                this.init();
            }, 0);
        }
    }

    getAttributes() {
        this.appId = this.getAttribute('app-id');
        this.itemId = this.getAttribute('item-id');
        this.fieldId = this.getAttribute('field-id');
    }

    async init() {
        const value = await gudhub.getFieldValue(this.appId, this.itemId, this.fieldId);
        const model = await gudhub.getField(this.appId, this.fieldId);
        
        this.showSeconds = model.data_model?.show_seconds || false;

        this.value = value || '';

        super.render(input);
    }

    async save() {
        this.value = this.querySelector('#generatedCron').value;

        await gudhub.setFieldValue(this.appId, this.itemId, this.fieldId, this.value);

        this.querySelector('.cron-picker__input').value = this.value;

        this.toggleCronPicker();
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

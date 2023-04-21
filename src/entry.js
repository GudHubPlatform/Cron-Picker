import './js/cron-picker.webcomponent.js';

export default class CronPickerData {

    /*------------------------------- FIELD TEMPLATE --------------------------------------*/
    getTemplate() {
        return {
            constructor: 'file',
            name: 'Cron picker',
            icon: 'code_editor',
            model: {
                field_id: 0,
                field_name: 'Cron picker',
                field_value: '',
                data_id: 0,
                data_type: 'cron_picker',
                show_seconds: false,
                data_model: {
                    interpretation: [{
                        src: 'form',
                        id: 'default',
                        settings: {
                            editable: 1,
                            show_field_name: 1,
                            show_field: 1
                        },
                        style: { position: "beetwen" }
                    }]
                }
            }
        };
    }

    /*------------------------------- ACTION INTERPRETATION --------------------------------------*/

    getInterpretation(gudhub, value, appId, itemId, field_model) {

        return [{
            id: 'default',
            name: 'Default',
            content: () =>
                '<cron-picker app-id="{{appId}}" item-id="{{itemId}}" field-id="{{fieldId}}" value="{{value}}"></cron-picker>'
        }, {
            id: 'value',
            name: 'Value',
            content: () => value
        }];
    }
    /*--------------------------  ACTION SETTINGS --------------------------------*/
    getSettings(scope) {
        return [{
            title: 'Options',
            type: 'general_setting',
            icon: 'menu',
            columns_list: [
                [
                    {
                        type: 'ghElement',
                        property: 'data_model.show_seconds',
                        data_model: () => {
                            return {
                                data_type: 'boolean',
                                field_name: 'Show seconds',
                                name_space: 'show_seconds'
                            }
                        }
                    }
                ]
            ]
        }];
    }
}

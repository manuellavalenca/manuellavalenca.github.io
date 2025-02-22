"use strict";

class Translator {

    constructor() { 
        this._defaultLanguage = 'en'
        this._availableLanguages = ['en','pt']
        this._lang = this.getLanguage()
        this._elements = document.querySelectorAll("[data-i18n]");
    }

    // Check the browser preferred language. In case of older navigators, there is no array, so we have to check that
    getLanguage() {
        var lang = navigator.languages ? navigator.languages[0] : navigator.language;
        console.log("Browser language: ",lang);
        
        if (this._availableLanguages.includes(lang.substr(0,2))){
            return lang.substr(0,2);
        } else {
            return this._defaultLanguage;
        }
    }


    load (lang= null) {
        if (lang) {
            this._lang = lang;
        }

        fetch(`./i18n/${this._lang}.json`)
            .then((response) => response.json())
            .then((translation) => {
                this.translate(translation);           
            })
            .catch(() => {
                console.error('It was not possible to load ${this._lang}.json.');
            })
    }

    translate(translation) {
        this._elements.forEach((element) => {
            // Maybe I'll simplify the next line later if I don't use segmentations for each label
            var keys = element.dataset.i18n.split(".");
            var text = keys.reduce((obj, i) => obj[i], translation);
            if (text) {
            element.innerHTML = text;
            }
        })
    }
}

export default Translator;
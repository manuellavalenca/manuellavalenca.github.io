"use strict";

class Translator {
    constructor() { 
        this._lang = this.getLanguage()
        this._elements = document.querySelectorAll("[data-i18n]");
    }

    // Check the browser preferred language. In case of older navigators, there is no array, so we have to check that
    getLanguage() {
        var lang = navigator.languages ? navigator.languages[0] : navigator.language;
        console.log("Browser language");
        console.log(lang);
        return lang.substr(0,2);
    }

    // Class used if the user wants to change the language manually
    load (lang= null) {
        if (lang) {
            this._lang = lang;
        }

        fetch(`./i18n/${this._lang}.json`)
            .then((res) => res.json())
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
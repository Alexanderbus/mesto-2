export class FormValidator {
    constructor(config, formSelector) {
        this._errorClass = config.errorClass;  // popup__input_invalid 
        this._disableButton = config.disableButton; // popup__submit-button_disabled
        this._submitButton = config.submitButton // popup__submit-button
        this._input = config.input; // popup__input
        this._inputsArray = config.inputsArray; 

        this._formSelector = formSelector;
    }

    setInputValidState(input, errorElement) {
        input.classList.remove(this._errorClass)
        errorElement.textContent = ''
    }

    _setInputInvalidState(input, errorElement) {
        input.classList.add(this._errorClass)
        errorElement.textContent = input.validationMessage
    }

    resetError() {
        this._inputsArray.forEach(input => {
            const errorElement = this._formSelector.querySelector(`#${input.id}Error`)
            this.setInputValidState(input, errorElement)
        })
     } 

    _checkInputValidity(input) {
        const errorElement = this._formSelector.querySelector(`#${input.id}Error`)
        if (input.checkValidity()) {
            this.setInputValidState(input, errorElement)
        }
        else {
            this._setInputInvalidState(input, errorElement)
        }
    }

    disableButton() {
        this._submitButton.setAttribute('disabled', '')
        this._submitButton.classList.add(this._disableButton);
    }

    _enableButton() {
        this._submitButton.removeAttribute('disabled')
        this._submitButton.classList.remove(this._disableButton);
    }

    _toggleButtonValidity() {
        if (this._formSelector.checkValidity()) {
            this._enableButton()
        }
        else {
            this.disableButton()
        }
    }

    enableValidation() {
        this._inputsArray.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input)
                this._toggleButtonValidity()
            })
        })
    }
}
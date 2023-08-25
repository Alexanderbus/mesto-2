import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popup, handleSubmit) {
      super(popup);
      this._handleSubmit = handleSubmit;
      this._popupForm = this._popup.querySelector('.popup__form')
      this._inputList = this._popup.querySelectorAll('.popup__input') // я передалал инпут, но вы же сказали просто что нужно в this добавлять эелменты которые используются несколько раз,  а этот элемент используется только один раз
    }
  
    _getInputValues() {
      const formValues = {};
      this._inputList.forEach(input => {
        formValues[input.name] = input.value;
      });
      return formValues;
    }
  
    setEventListeners() {
      super.setEventListeners();
      this._popupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        this._handleSubmit(this._getInputValues());
        // this.close();
      });
    }
  
    close() {
      super.close();
      this._popupForm.reset();
    }
  }

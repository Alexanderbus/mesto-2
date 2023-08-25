import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup)
        this._popupImage = this._popup.querySelector('.pop-up-image__pic');
        this._popupCaption = this._popup.querySelector('.pop-up-image__title');
    }

    open(imageUrl, caption) {
        this._popupImage.src = imageUrl;
        this._popupImage.alt = caption;
        this._popupCaption.textContent = caption;
        super.open();
      }
}
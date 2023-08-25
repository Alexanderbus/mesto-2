import { Popup } from './Popup.js';

export class PopupDeleteCard extends Popup {
    constructor(popup) {
      super(popup);
    }
  
    deleteCard(deleteCard) {
            super.close();
            deleteCard
    }

  }
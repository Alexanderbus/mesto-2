export class Popup {
    constructor(popup) {
        this._popup = popup;
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    
        open(){
            this._popup.classList.add('popup_opened')
            document.addEventListener('keydown', this._handleEscClose)
        }

        close() {
            this._popup.classList.remove('popup_opened')
            document.removeEventListener('keydown', this._handleEscClose)
        }

        _handleEscClose(event) {
            if (event.key === 'Escape') {
              this.close();
            }
        }

        setEventListeners() {
            this._popup.addEventListener('click', (event) => {
              if (event.target.classList.contains('popup') || event.target.classList.contains('popup__exit')) {
                this.close();
              }
            });
          } 
}
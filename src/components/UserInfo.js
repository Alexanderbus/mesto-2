export class UserInfo {
    constructor( { name, aboutMe } ) {
        this._name = name;
        this._aboutMe = aboutMe;
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            aboutMe: this._aboutMe.textContent
        }
    }
    
  setUserInfo(nameInput, aboutMeInput) {
    this._name.textContent = nameInput;
    this._aboutMe.textContent = aboutMeInput;
  }
}
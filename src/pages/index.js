// вебпаком упакую все на крайней итерацииb

// import './index.css';
const popupImage = document.querySelector('.pop-up-image')
const popupConfirmDeleteCatd = document.querySelector('.popup_delete-card')
const buttonAddPhoto = document.querySelector('.profile__add-photo');
const popupAddPhoto = document.querySelector('.popup_add-photo')
const cards = document.querySelector('.cards')
const editProfileBtn = document.querySelector('.profile__button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const formPopupProfile = document.querySelector('.popup__form_edit-profile');
const inputNameProfile = formPopupProfile.nameEditProfile;
const inputHobbyProfile = formPopupProfile.aboutEditProfile;
const hobbyProfile = document.querySelector('.profile__whoau');
const nameProfile = document.querySelector('.profile__name');
const submitButtonAddphoto = document.querySelector('.popup__submit-button_add-photo')
const submitButtonEditProfile = document.querySelector('.popup__submit-button_edit-profile')
const popupFormAddPhoto = document.querySelector('.popup__form_add-photo')
const inputsAddphoto = popupFormAddPhoto.querySelectorAll('.popup__input')
const inputsArrayAddPhoto = Array.from(inputsAddphoto)
const popupFormEditProfile = document.querySelector('.popup__form_edit-profile')
const inputsEditProfile = popupFormEditProfile.querySelectorAll('.popup__input')
const inputsArrayEditProfile = Array.from(inputsEditProfile)
const cardTemplate = document.querySelector('.card-template')
const avatar = document.querySelector('.avatar')
const deleteButton = document.querySelector('.popup__submit-button_delete-card')
const avatarIcon = document.querySelector('.avatar')
const avatarPen = document.querySelector('.avatar__pen')
const popupAvatar = document.querySelector('.popup_avatar')
const formPopupAvatar = document.querySelector('.popup__form_avatar')
const inputUrlAvatar = formPopupAvatar.avatarURL
const submitButtonAvatar =  formPopupAvatar.querySelector('.popup__submit-button_avatar')

import { Card } from '../components/Сard.js';
import { FormValidator } from '../components/Validation.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
import { Api } from '../components/Api.js'
import { PopupDeleteCard } from '../components/PopupDeleteCard.js'

const popupDeleteCard = new PopupDeleteCard(popupConfirmDeleteCatd)

const api = new Api({
    url: 'https://nomoreparties.co/v1/cohort-70',
    headers: {
        authorization: '96b2927c-f9e2-4c51-9d09-71cad7026538',
        'Content-Type': 'application/json'
    }
})

const myId = await api.getUserID()

const popupWithImage = new PopupWithImage(popupImage)

//Узнаем информацию юзера и добавляем 
function getUserInfo() {
    api.getUserInfo()
        .then(userInfo => {
            nameProfile.textContent = userInfo.name
            hobbyProfile.textContent = userInfo.about
            avatar.style.backgroundImage = `url(${userInfo.avatar})`
        })
}
getUserInfo()

//добавление начальных карточек с сервера
function addCards() {
    api.getCards()
        .then(data => {
            const revesrData = data.reverse()
            const defaultCards = new Section({
                items: revesrData, renderer: (item) => {
                    defaultCards.addItem(createCard(item));
                }
            }, cards)
            defaultCards.renderItems()
        }
        )
}
addCards()

function createCard(item) {
    const card = new Card({
        title: item.name, image: item.link, likes: item.likes, handleCardClick: () => {
            popupWithImage.open(item.link, item.name)
        }, confirmDelete: () => {
            popupDeleteCard.open()
            deleteButton.addEventListener('click', () => {
                popupDeleteCard.deleteCard(api.delete(item._id))
                card.deleteButton()
            })
        }, addLike: () => {
            if (cardElement.querySelector('.card__like').className == 'card__like card__like_active') {
                api.addLike(item._id)
            } else {
                api.deleteLike(item._id)
            }
        }
    }, cardTemplate);
    const cardElement = card.generateCard();
    if (item.owner._id == myId) {
        cardElement.querySelector('.card__trash').classList.add('card__trash_active')
    }
    item.likes.forEach(element => {
        if (element._id == myId) {
            cardElement.querySelector('.card__like').classList.add('card__like_active')
        }
    })
    return cardElement
}

function updateAvatar() {
    submitButtonAvatar.textContent = 'Сохранение...'
    api.updateAvatar({ avatar: inputUrlAvatar.value })
    .then(lol => getUserInfo())
    .finally(() => {
        submitButtonAvatar.textContent = 'Сохранить'
        popupUpdateAvatar.close()
    })
}
//добавление юзером карточки
function addNewCard() {
    const data = popupFormPhoto._getInputValues();
    submitButtonAddphoto.textContent = 'Сохранение...'
    api.addCard({ name: data.nameAddPhoto, link: data.linkAddPhoto })
        .then(card => addCards())
        .finally(() => {
            submitButtonAddphoto.textContent = 'Сохранить'
            popupFormPhoto.close()
        })
}

// Валидация
const formAddPhoto = new FormValidator({
    errorClass: 'popup__input_invalid', disableButton: 'popup__submit-button_disabled',
    submitButton: submitButtonAddphoto, input: '.popup__input', inputsArray: inputsArrayAddPhoto
}, popupFormAddPhoto)
const formEditProfile = new FormValidator({
    errorClass: 'popup__input_invalid', disableButton: 'popup__submit-button_disabled',
    submitButton: submitButtonEditProfile, input: '.popup__input', inputsArray: inputsArrayEditProfile
}, popupFormEditProfile)

function launchValidation(form) {
    form.enableValidation()
}

launchValidation(formAddPhoto)
launchValidation(formEditProfile)

const popupFormPhoto = new PopupWithForm(popupAddPhoto, () => {
    addNewCard()

});

buttonAddPhoto.addEventListener('click', () => {
    popupFormPhoto.open()
    formAddPhoto.disableButton(submitButtonAddphoto)
    formAddPhoto.resetError()
})

const editProfile = new UserInfo({ name: nameProfile, aboutMe: hobbyProfile })

function handleFormSubmitProfile() {
    submitButtonEditProfile.textContent = 'Сохранение...'
    api.updateUserInfo({ name: inputNameProfile.value, about: inputHobbyProfile.value })
    .then(profile => {getUserInfo()})
    .finally(() => {
        submitButtonEditProfile.textContent = 'Сохранить'
        popFormEditProfile.close()
    })

    
}

const popFormEditProfile = new PopupWithForm(popupEditProfile, () => {
    handleFormSubmitProfile();
});

editProfileBtn.addEventListener('click', () => {
    popFormEditProfile.open()
    const nameInfo = editProfile.getUserInfo()
    inputNameProfile.value = nameInfo.name;
    inputHobbyProfile.value = nameInfo.aboutMe;
}
)

const popupUpdateAvatar = new PopupWithForm(popupAvatar, () => {
    updateAvatar()

});

avatarIcon.addEventListener('click', () => {
    popupUpdateAvatar.open();
})

avatarIcon.addEventListener('mouseover', () => {
    avatarPen.classList.add('avatar__pen_active')
})

avatarIcon.addEventListener('mouseout', () => {
    avatarPen.classList.remove('avatar__pen_active')
})


popFormEditProfile.setEventListeners()
popupFormPhoto.setEventListeners()
popupWithImage.setEventListeners()
popupDeleteCard.setEventListeners()
popupUpdateAvatar.setEventListeners()

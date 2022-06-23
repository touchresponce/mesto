import UserInfo from '../components/UserInfo.js';

export const popupEdit = document.querySelector('.popup-edit'); // модалка редактирования
export const nameInput = document.querySelector('.popup__input_profile_name'); // инпут имя редактирование
export const jobInput = document.querySelector('.popup__input_profile_job'); // инпут работа редактирование
export const popupAdd = document.querySelector('.popup-add'); // модалка добавления
export const formEdit = document.querySelector('.edit-form'); // форма редактирования
export const formAdd = document.querySelector('.add-form'); // форма добавления
export const popupImage = document.querySelector('.popup-image');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const addBtn = document.querySelector('.profile__info-add'); // кнопка добавления
export const editBtn = document.querySelector('.profile__info-edit'); // кнопка редактирования

export const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

export const userConfig = new UserInfo({
  name: profileName,
  info: profileJob,
});

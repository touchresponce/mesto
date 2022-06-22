import './pages/index.css';
import initialCards from './utils/initialCards.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import UserInfo from './components/UserInfo.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';

const popupEdit = document.querySelector('.popup-edit'); // модалка редактирования
const nameInput = document.querySelector('.popup__input_profile_name'); // инпут имя редактирование
const jobInput = document.querySelector('.popup__input_profile_job'); // инпут работа редактирование
const popupAdd = document.querySelector('.popup-add'); // модалка добавления
const formEdit = document.querySelector('.edit-form'); // форма редактирования
const formAdd = document.querySelector('.add-form'); // форма добавления
const popupImage = document.querySelector('.popup-image');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const addBtn = document.querySelector('.profile__info-add'); // кнопка добавления
const editBtn = document.querySelector('.profile__info-edit'); // кнопка редактирования

const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};
const userConfig = new UserInfo({
  name: profileName,
  info: profileJob,
});

// открытие модалки с картинкой
const handleCardClick = (name, link) => {
  const popupWithImage = new PopupWithImage(popupImage);
  popupWithImage.open(name, link);
  popupWithImage.setEventListeners();
};

// функция создания элемента
const createCard = (item) => {
  const card = new Card(item, '#element-template', handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
};

// отрисовка главного массива
const mainCards = new Section(
  {
    items: initialCards,
    renderer: (items) => mainCards.addItem(createCard(items), 'append'),
  },
  '.elements',
);
mainCards.renderItems();

// редактирование профиля
const handleProfileEdit = () => {
  validatorEdit.resetValidation();
  formProfileEdit.open();

  nameInput.value = userConfig.getUserInfo().name;
  jobInput.value = userConfig.getUserInfo().info;
};
editBtn.addEventListener('click', handleProfileEdit);

//
const formProfileEdit = new PopupWithForm(popupEdit, {
  callBack: () => {
    userConfig.setUserInfo(formProfileEdit._getInputValues());
  },
});

// добавление элемента
const handlePlaceAdd = () => {
  validatorAdd.resetValidation();
  formCardAdd.open();
};
addBtn.addEventListener('click', handlePlaceAdd);

//
const formCardAdd = new PopupWithForm(popupAdd, {
  callBack: () => {
    const newCard = createCard(formCardAdd._getInputValues());
    mainCards.addItem(newCard, 'prepend');
  },
});

// слушатели на формы
formCardAdd.setEventListeners();
formProfileEdit.setEventListeners();

// валидация edit
const validatorEdit = new FormValidator(config, formEdit);
validatorEdit.enableValidation();

// валидация add
const validatorAdd = new FormValidator(config, formAdd);
validatorAdd.enableValidation();

// import Popup from '../components/Popup.js';
// const inputPlaceName = document.querySelector('.popup__input_place_name');
// const inputPlaceLink = document.querySelector('.popup__input_place_url');
// const caption = document.querySelector('.popup__figcaption');
// const image = document.querySelector('.popup__image');
// const elements = document.querySelector('.elements'); // секция с элементами

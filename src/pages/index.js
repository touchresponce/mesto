import './index.css';
import initialCards from '../utils/initialCards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
  popupEdit,
  nameInput,
  jobInput,
  popupAdd,
  formEdit,
  formAdd,
  popupImage,
  addBtn,
  editBtn,
  config,
  userConfig,
} from '../utils/constants.js';

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

// открытие модалки с картинкой
const handleCardClick = (name, link) => {
  // const popupWithImage = new PopupWithImage(popupImage);
  popupWithImage.open(name, link);
  // popupWithImage.setEventListeners();
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

  const { name, info } = userConfig.getUserInfo();
  nameInput.value = name;
  jobInput.value = info;
};
editBtn.addEventListener('click', handleProfileEdit);

//
const formProfileEdit = new PopupWithForm(popupEdit, {
  callBack: (inputsValues) => {
    userConfig.setUserInfo(inputsValues);
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
  callBack: (inputsValues) => {
    const newCard = createCard(inputsValues);
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

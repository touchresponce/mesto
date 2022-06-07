import initialCards from '../utils/initialCards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
const popupEdit = document.querySelector('.popup-edit'); // модалка редактирования
const nameInput = document.querySelector('.popup__input_profile_name'); // инпут имя редактирование
const jobInput = document.querySelector('.popup__input_profile_job'); // инпут работа редактирование
const popupAdd = document.querySelector('.popup-add'); // модалка добавления
const popupImage = document.querySelector('.popup-image'); // модалка с картинкой
const elements = document.querySelector('.elements'); // секция с элементами
const formEdit = document.querySelector('.edit-form'); // форма редактирования
const formAdd = document.querySelector('.add-form'); // форма добавления
const profileName = document.querySelector('.profile__name'); // блок имя
const profileJob = document.querySelector('.profile__job'); // блок работа
const image = document.querySelector('.popup__image'); // картинка
const caption = document.querySelector('.popup__figcaption'); // подпись к картинке
const closeBtns = document.querySelectorAll('.popup__close'); // кнопки закрытия модалки
const popups = document.querySelectorAll('.popup'); // модалки
const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

// функция открытия
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

// функция закрытия
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}

// функция закрытия на Escape
function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(evt.currentTarget.querySelector('.popup_opened'));
  }
}

// «отправка» формы редактирования
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  evt.target.reset();
  closePopup(popupEdit);
}
formEdit.addEventListener('submit', handleProfileFormSubmit);

// // функция отрисовки нового элемента
// function renderCard(card, container) {
//   container.prepend(card);
// }

// «отправка» формы места
function handlePlaceFormSubmit(evt) {
  evt.preventDefault();

  const newElem = {
    name: document.querySelector('.popup__input_place_name').value,
    link: document.querySelector('.popup__input_place_url').value,
  };

  const card = new Card(newElem, '#element-template', handleCardClick);
  renderCard(card.createCard(), elements);

  evt.target.reset();
  closePopup(popupAdd);
}
formAdd.addEventListener('submit', handlePlaceFormSubmit);

//
initialCards.reverse().forEach(({ name, link }) => {
  const card = createCard({ name, link });
  elements.prepend(card);
});

//////////////////////////////////////////
// функция создания элемента
function createCard(item) {
  const card = new Card(item, '#element-template', handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
}

/////////////////////////////////////
function handleCardClick(name, link) {
  image.src = link;
  image.alt = name;
  caption.textContent = name;
  openPopup(popupImage);
}

// edit открытие
document.querySelector('.profile__info-edit').addEventListener('click', () => {
  openPopup(popupEdit);

  validatorEdit.resetValidation();

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

// add открытие
document.querySelector('.profile__info-add').addEventListener('click', () => {
  openPopup(popupAdd);

  formAdd.reset();
  validatorAdd.resetValidation();
});

// закрытие на кнопки
closeBtns.forEach((btn) => {
  btn.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup_opened'));
  });
});

// закрытие на оверлей
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(evt.target);
    }
  });
});

// валидация edit
const validatorEdit = new FormValidator(config, formEdit);
validatorEdit.enableValidation();

// валидация add
const validatorAdd = new FormValidator(config, formAdd);
validatorAdd.enableValidation();

// //
// initialCards.reverse().forEach(({ name, link }) => {
//   const card = new Card({ name, link }, '#element-template', handleCardClick);
//   renderCard(card.createCard(), elements);
// });

/////////////////////////////////////////////////////////
// initialCards.reverse().forEach((card) => {
//   createCard(card);
//   elements.prepend(card);
// });

// function createCard(item) {
//   const cardNew = new Card({
//     data: item,
//     handlerCardClick: () => {
//       popupImage.open(item.link, item.name)
//     }, '#element-template')

////////////////////////////////////////
// // функция создания элемента
// function createCard(item) {
//   const card = new Card({ data: item, handleCardClick }, '#element-template');
//   const cardElement = card.createCard();
//   return cardElement;
// }

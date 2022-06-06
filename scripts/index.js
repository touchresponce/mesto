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
const spans = document.querySelectorAll('.popup__input-error'); // span'ы с ошибками
const inputs = document.querySelectorAll('.popup__input'); // инпуты форм
const closeBtns = document.querySelectorAll('.popup__close'); // кнопки закрытия модалки
const popups = document.querySelectorAll('.popup'); // модалки
const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

function deleteErrorSpan() {
  spans.forEach((span) => {
    if (span.classList.contains('popup__input-error_active')) {
      span.textContent = '';
      span.classList.remove('popup__input-error_active');
    }
  });
  inputs.forEach((input) => {
    if (input.classList.contains('popup__input_type_error')) {
      input.classList.remove('popup__input_type_error');
    }
  });
}

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

// функция отрисовки нового элемента
function renderCard(card, container) {
  container.prepend(card);
}

// «отправка» формы места
function handlePlaceFormSubmit(evt) {
  evt.preventDefault();

  const newElem = {
    name: document.querySelector('.popup__input_place_name').value,
    link: document.querySelector('.popup__input_place_url').value,
  };

  const card = new Card(newElem, '#element-template');
  renderCard(card.createCard(), elements);

  //
  document.querySelector('.element__image').addEventListener('click', (evt) => {
    openImagePopup(evt);
  });

  evt.target.reset();
  closePopup(popupAdd);
}
formAdd.addEventListener('submit', handlePlaceFormSubmit);

//
initialCards.reverse().forEach(({ name, link }) => {
  const card = new Card({ name, link }, '#element-template');
  renderCard(card.createCard(), elements);
  document.querySelector('.element__image').addEventListener('click', (evt) => {
    openImagePopup(evt);
  });
});

// открытие модалки с картинкой
function openImagePopup(evt) {
  openPopup(popupImage);
  image.src = evt.target.getAttribute('src');
  image.alt = evt.target.getAttribute('alt');
  caption.textContent = evt.target.getAttribute('alt');
}

// edit открытие
document.querySelector('.profile__info-edit').addEventListener('click', () => {
  openPopup(popupEdit);
  deleteErrorSpan();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

// add открытие
document.querySelector('.profile__info-add').addEventListener('click', () => {
  openPopup(popupAdd);
  formAdd.reset();
  deleteErrorSpan();
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

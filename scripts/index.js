import initialCards from '../utils/initialCards.js';
const popupEdit = document.querySelector('.popup-edit'); // модалка редактирования
const nameInput = document.querySelector('.popup__input_profile_name'); // форма имя редактирование
const jobInput = document.querySelector('.popup__input_profile_job'); // форма работа редактирование
const popupAdd = document.querySelector('.popup-add'); // модалка добавления
const popupImage = document.querySelector('.popup-image'); // модалка с картинкой
//const profile = document.querySelector('.profile'); // секция с акком
const elements = document.querySelector('.elements'); // секция с элементами
const formEdit = document.querySelector('.edit-form'); // форма редактирования
const formAdd = document.querySelector('.add-form'); // форма добавления
const profileName = document.querySelector('.profile__name'); // блок имя
const profileJob = document.querySelector('.profile__job'); // блок работа
const image = document.querySelector('.popup__image'); // картинка
const caption = document.querySelector('.popup__figcaption'); // подпись к картинке
const elementTemplate = document.querySelector('#element-template').content; // доступ к template
// const popups = document.querySelectorAll('.popup'); // все модалки для esc
const spans = document.querySelectorAll('.popup__input-error'); // span'ы с ошибками
const inputs = document.querySelectorAll('.popup__input'); // инпуты форм

// like
function toggleLike(evt) {
  evt.target.classList.toggle('element__like-active');
}

// удаление элемента
function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

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

// функция закрытия на Escape
function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    evt.currentTarget.querySelector('.popup_opened').classList.remove('popup_opened');
  }
}

// функция открытия
function openPopup(popup) {
  popup.classList.add('popup_opened');
  // вешаем слушатель Escape
  document.addEventListener('keydown', closePopupOnEsc);
}

// функция закрытия
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  // убираем слушатель Escape
  document.removeEventListener('keydown', closePopupOnEsc);
}

// «отправка» формы редактирования
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  // подтягивание значений
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

  // создание элемента
  const newCard = createCard(
    document.querySelector('.popup__input_place_name').value,
    document.querySelector('.popup__input_place_url').value,
  );

  // отрисовка элемента
  renderCard(newCard, elements);

  evt.target.reset();
  closePopup(popupAdd);
}
formAdd.addEventListener('submit', handlePlaceFormSubmit);

// создание элемента
function createCard(name, link) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = link;
  element.querySelector('.element__image').alt = name;
  element.querySelector('.element__panel-text').textContent = name;

  // like
  element.querySelector('.element__like').addEventListener('click', (evt) => {
    toggleLike(evt);
  });

  // удаление
  element.querySelector('.element__delete').addEventListener('click', (evt) => {
    deleteCard(evt);
  });

  // открытие модалки с картинкой
  element.querySelector('.element__image').addEventListener('click', (evt) => {
    openPopup(popupImage);

    image.src = evt.target.getAttribute('src');
    image.alt = evt.target.getAttribute('alt');

    caption.textContent = evt.target.getAttribute('alt');
  });

  return element;
}

//
initialCards.reverse().forEach(({ name, link }) => {
  const card = createCard(name, link);
  renderCard(card, elements);
});

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
document.addEventListener('click', (evt) => {
  if (evt.target.className === 'popup__close') {
    closePopup(evt.target.closest('.popup_opened'));
  }
});

// закрытие на оверлей
document.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
});

import initialCards from './cards.js'; // массив элементов
const popupEdit = document.querySelector('.popup-edit'); // модалка редактирования
const nameInput = document.querySelector('.popup__input_profile_name'); // форма имя редактирование
const jobInput = document.querySelector('.popup__input_profile_job'); // форма работа редактирование
const popupAdd = document.querySelector('.popup-add'); // модалка добавления
const popupImage = document.querySelector('.popup-image'); // модалка с картинкой
// const profile = document.querySelector('.profile'); // секция с акком
const elements = document.querySelector('.elements'); // секция с элементами
const formEdit = document.querySelector('.edit-form'); // форма редактирования
const formAdd = document.querySelector('.add-form'); // форма добавления
const profileName = document.querySelector('.profile__name'); // блок имя
const profileJob = document.querySelector('.profile__job'); // блок работа
const image = document.querySelector('.popup__image'); // модалка с картинкой
const caption = document.querySelector('.popup__figcaption'); // подпись к картинке
// доступ к template
const elementTemplate = document.querySelector('#element-template').content;

// открытие\закрытие
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

// like
function toggleLike(evt) {
  evt.target.classList.toggle('element__like-active');
}

// удаление элемента
function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

// «отправка» формы редактирования
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  // подтягивание значений
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  evt.target.reset();
  togglePopup(popupEdit);
}
formEdit.addEventListener('submit', handleProfileFormSubmit);

// функция отрисовки нового элемента <=========================================================================================
function renderCard(card, container) {
  container.prepend(card);
}

// «отправка» формы места
function handlePlaceFormSubmit(evt) {
  evt.preventDefault();

  // создание элемента <=========================================================================================
  const newCard = createCard(
    document.querySelector('.popup__input_place_name').value,
    document.querySelector('.popup__input_place_url').value,
  );

  // отрисовка элемента <=========================================================================================
  renderCard(newCard, elements);

  evt.target.reset();
  togglePopup(popupAdd);
}
formAdd.addEventListener('submit', handlePlaceFormSubmit);

// создание элемента <=========================================================================================
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
    togglePopup(popupImage);
    image.src = evt.target.getAttribute('src');
    image.alt = evt.target.getAttribute('alt');
    caption.textContent = evt.target.getAttribute('alt');
  });

  return element;
}

// основной массив  <=========================================================================================
// initialCards.forEach(({ name, link }) => {
//   const card = createCard(name, link);
//   renderCard(card, elements);
// });

//<================================================================================ костыль reverse
initialCards.reverse().forEach(({ name, link }) => {
  const card = createCard(name, link);
  renderCard(card, elements);
});

// edit
document.querySelector('.profile__info-edit').addEventListener('click', () => {
  togglePopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

// add
document.querySelector('.profile__info-add').addEventListener('click', () => {
  togglePopup(popupAdd);
});

// закрытие на кнопки
document.addEventListener('click', (evt) => {
  if (evt.target.className === 'popup__close') {
    togglePopup(evt.target.closest('.popup_opened'));
  }
});

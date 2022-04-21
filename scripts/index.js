const popupEdit = document.querySelector('.popup-edit'); // модалка редактирования
const editBtn = document.querySelector('.profile__info-edit'); // кнопка редакт
const nameInput = document.querySelector('.popup__input_type_name'); // форма имя редактирование
const jobInput = document.querySelector('.popup__input_type_job'); // форма работа редактирование
const closeBtn = document.querySelector('.popup__close'); // кнопка закрытия всех открытых модалок
// для отправки\присваивания модалки редактирования
const formElement = document.querySelector('.popup__form'); // форма редактирования
const profileName = document.querySelector('.profile__name'); // блок имя
const profileJob = document.querySelector('.profile__job'); // блок работа

// открытие модалки редактирования
function openProfilePopup() {
  popupEdit.classList.add('popup_opened');
  // подтягивание значений в форму
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
editBtn.addEventListener('click', openProfilePopup);

// закрытие модалки
function closeProfilePopup() {
  popupEdit.classList.remove('popup_opened');
}
closeBtn.addEventListener('click', closeProfilePopup);

// «отправка» редактированной инфы
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы.

  // присваивание значений
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  evt.target.reset(); // сброс значений инпута
  closeProfilePopup(); // закрытие после submit
}
formElement.addEventListener('submit', handleProfileFormSubmit);

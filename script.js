const popupEdit = document.querySelector('.popup-edit'); // модалка редактирования
const editBtn = document.querySelector('.profile__info-edit'); // кнопка редакт
const returnName = document.querySelector('.form__profile-name'); // форма имя редактирование
const returnJob = document.querySelector('.form__profile-job'); // форма работа редактирование
const closeBtn = document.querySelector('.popup__close'); // кнопка закрытия всех открытых модалок

// для отправки\присваивания модалки редактирования
const formElement = document.querySelectorAll('.form'); // форма редактирования
const profileName = document.querySelector('.profile__name'); // блок имя
const profileJob = document.querySelector('.profile__job'); // блок работа

// открытие модалки редактирования
function openEditPopup() {
  popupEdit.classList.add('popup_opened');
  // подтягивание значений в форму
  returnName.value = profileName.textContent;
  returnJob.value = profileJob.textContent;
}
editBtn.addEventListener('click', openEditPopup);

// закрытие модалки
function closePopups() {
  popupEdit.classList.remove('popup_opened');
}
closeBtn.addEventListener('click', closePopups);

// «отправка» редактированной инфы
function formSubmitHandler(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы.

  // поля формы
  const nameInput = document.querySelector('.form__profile-name');
  const jobInput = document.querySelector('.form__profile-job');

  // присваивание значений
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  this.reset(); // сброс значений инпута
  closePopups(); // закрытие после submit
}
formElement[0].addEventListener('submit', formSubmitHandler);

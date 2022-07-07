import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Api from '../components/Api.js';
import {
  popupEdit,
  nameInput,
  jobInput,
  popupAdd,
  popupImage,
  addBtn,
  editBtn,
  popupAvatar,
  avatarBtn,
  popupConfirm,
  config,
  userConfig,
} from '../utils/constants.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-45',
  headers: {
    authorization: '73461d7d-29b1-45f6-bf45-d662ef1bce52',
  },
});

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

/**
 * функция создания элемента
 */
const createCard = (item) => {
  const card = new Card(
    item,
    '#element-template',
    {
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
      },
      handleDeleteConfirm: (card) => {
        popupWithConfirm.open(card);
      },
      handleLikeClick: (id) => {
        api
          .like(id)
          .then((res) => card.likeCard(res))
          .catch((err) => console.log(err));
      },
      handleDislikeClick: (id) => {
        api
          .dislike(id)
          .then((res) => card.likeCard(res))
          .catch((err) => console.log(err));
      },
    },
    userId,
  );
  const cardElement = card.createCard();
  return cardElement;
};

/**
 * модалка с подтверждением удаления
 */
const popupWithConfirm = new PopupWithConfirm(popupConfirm, {
  // поведение при сабмите удаления
  callBack: (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        card._delete();
      })
      .then(() => popupWithConfirm.close())
      .catch((err) => console.log(err));
  },
});
popupWithConfirm.setEventListeners();

/**
 * главный массив элементов
 */
const mainCards = new Section(
  {
    renderer: (items) => {
      mainCards.addItem(createCard(items), 'append');
    },
  },
  '.elements',
);

/**
 * редактирование профиля
 */
const formProfileEdit = new PopupWithForm(popupEdit, {
  callBack: (inputsValues) => {
    formProfileEdit.setLoading(true);
    api
      .setUserInfo(inputsValues)
      .then((data) =>
        userConfig.setUserInfo({ name: data.name, info: data.about, avatar: data.avatar }),
      )
      .catch((err) => {
        console.log(err);
      })
      .finally(() => formProfileEdit.setLoading(false));
  },
});

//
const handleProfileEdit = () => {
  formValidators['profile-form'].resetValidation();
  formProfileEdit.open();

  const { name, info } = userConfig.getUserInfo();
  nameInput.value = name;
  jobInput.value = info;
};
editBtn.addEventListener('click', handleProfileEdit);

/**
 * добавление элемента
 */
const formCardAdd = new PopupWithForm(popupAdd, {
  callBack: (inputsValues) => {
    formCardAdd.setLoading(true);
    api
      .setCard(inputsValues)
      .then((data) => {
        const newCard = createCard(data);
        mainCards.addItem(newCard, 'prepend');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formCardAdd.setLoading(false);
      });
  },
});

//
const handlePlaceAdd = () => {
  formValidators['place-form'].resetValidation();
  formCardAdd.open();
};
addBtn.addEventListener('click', handlePlaceAdd);

/**
 * изменение аватарки
 */
const formAvatarChange = new PopupWithForm(popupAvatar, {
  callBack: (inputsValues) => {
    formAvatarChange.setLoading(true);
    api
      .setAvatar(inputsValues.avatar)
      .then((data) =>
        userConfig.setUserInfo({ name: data.name, info: data.about, avatar: data.avatar }),
      )
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formAvatarChange.setLoading(false);
      });
  },
});

//
const handleAvaratChange = () => {
  formValidators['avatar-form'].resetValidation();
  formAvatarChange.open();
};
avatarBtn.addEventListener('click', handleAvaratChange);

/**
 * слушатели на формы
 */
formCardAdd.setEventListeners();
formProfileEdit.setEventListeners();
formAvatarChange.setEventListeners();

/**
 * валидация
 */
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formElement));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');
    // в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(config);

//
let userId;
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([user, cards]) => {
    userId = user._id;
    userConfig.setUserInfo({ name: user.name, info: user.about, avatar: user.avatar });
    mainCards.renderItems(cards);
  })
  .catch((err) => console.log(err));

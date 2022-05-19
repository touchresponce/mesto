// Проверка данных должна работать так:
//  данные любого поля ввода проверяются одной унифицированной функцией;
//  для проверки данных в поле используются HTML5-атрибуты и JS-свойство ValidityState ;
//  за состояние кнопки сабмита отвечает отдельная функция;
//  функция enableValidation , которая включает валидацию, принимает на вход объект параметров, а затем
//  передаёт параметры вложенным функциям.

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass,
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  // const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const hasNotInputValue = (inputList) => {
  return inputList.every((inputList) => {
    return inputList.value.length === 0;
  });
};

// add disabled class
const disabledSubmit = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'disabled');
};

// remove disabled class
const enableSubmit = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
};

// отключение кнопки
const toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
  const buttonElement = formElement.querySelector(submitButtonSelector);
  if (hasInvalidInput(inputList) || hasNotInputValue(inputList)) {
    // buttonElement.classList.add(inactiveButtonClass);
    disabledSubmit(buttonElement, inactiveButtonClass);
  } else {
    // buttonElement.classList.remove(inactiveButtonClass);
    enableSubmit(buttonElement, inactiveButtonClass);
  }
};

const enableValidation = (config) => {
  // получаем все формы
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  // на каждую вешаем сабмит
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(
      formElement,
      config.inputSelector,
      config.submitButtonSelector,
      config.inactiveButtonClass,
      config.inputErrorClass,
      config.errorClass,
    );
  });
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
});

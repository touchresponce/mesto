// показать ошибку
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// скрыть ошибку
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// чек валидности инпутов
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
  toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
    });
  });
};

// для кнопки
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// откл кнопку сабмита
const disabledSubmit = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'disabled');
};

// вкл кнопку сабмита
const enableSubmit = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
};

// функция отключения кнопки
const toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
  const buttonElement = formElement.querySelector(submitButtonSelector);

  if (hasInvalidInput(inputList)) {
    disabledSubmit(buttonElement, inactiveButtonClass);
  } else {
    enableSubmit(buttonElement, inactiveButtonClass);
  }

  // <===================
  formElement.addEventListener('submit', () => {
    disabledSubmit(buttonElement, inactiveButtonClass);
  });
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

//
enableValidation({
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
});

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      ru: {
        translation: {
          userName: 'Имя пользователя',
          password: 'Пароль',
          passwordConfirmation: 'Подтвердите пароль',
          register: 'Зарегестрироваться',
          lengthLimits: 'От 3 до 20 символов',
          requiredField: 'Обязательное поле',
          passwordsMustMatch: 'Пароли должны совпадать',
          requiredConfirmation: 'Подтверждение пароля обязательно',
          existingUser: 'Такой пользователь уже существует',
          registrationError: 'Ошибка регистрации',
        },
      },
    },
    debug: true,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

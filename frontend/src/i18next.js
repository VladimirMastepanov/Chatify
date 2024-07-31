import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      ru: {
        translation: {
          hexletChat: 'Hexlet Chat',

          userName: 'Имя пользователя',
          login: 'Ваш ник',
          password: 'Пароль',
          passwordConfirmation: 'Подтвердите пароль',
          registration: 'Регистрация',
          register: 'Зарегестрироваться',
          enter: 'Войти',
          exit: 'Выйти',
          noAccount: 'Нет аккаунта? ',
          channels: 'Каналы',
          channelName: 'Имя канала',
          channelManage: 'Управление каналом',
          rename: 'Переименовать',
          delete: 'Удалить',
          addChannel: 'Добавить канал',
          renameChannel: 'Переименовать канал',
          deleteChannel: 'Удалить канал',
          newChannelName: 'Новое имя канала',
          channelCreated: 'Канал создан',
          channelDeleted: 'Канал удален',
          channelRenamed: 'Канал переименован',
          newMessage: 'Новое сообщение',
          sent: 'Отправить',
          cancel: 'Отменить',
          sure: 'Уверенны?',
          plus: '+',
          badWord: 'Нельзя использовать такое имя',

          message_one: '{{count}} сообщение',
          message_few: '{{count}} сообщения',
          message_zero: '{{count}} сообщений',
          message_many: '{{count}} сообщений',

          incorrectLoginInformation: 'Неверные имя пользователя или пароль',
          minLength: 'Не менее 6 символов',
          lengthLimits: 'От 3 до 20 символов',
          requiredField: 'Обязательное поле',
          passwordsMustMatch: 'Пароли должны совпадать',
          requiredConfirmation: 'Подтверждение пароля обязательно',
          existingUser: 'Такой пользователь уже существует',
          connectionError: 'Ошибка соединения',
          mustBeUnique: 'Должно быть уникальным',
        },
      },
    },
    debug: true,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    pluralSeparator: '_',
  });

export default i18next;

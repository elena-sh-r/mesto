# Место

>Данный проект реализован в рамках обучения на курсе "Веб-разработчик плюс" в "Яндекс.Практикум"

## Обзор
* Интерактивная страница, куда можно добавлять фотографии, удалять их и ставить лайки.

## Используемые технологии
* HTML
* CSS
* JS
* БЭМ 

## Реализовано
* Адаптивная верстка страницы по макету в Figma (минимальная ширина 320px, максимальная — 1280px).
* Редактирование данных профиля.
* Добавление карточки с использованием класса Card.
* Удаление карточки.
* Плавное закрытие и открытие диалоговых окон.
* Открытие полноразмерного изображения.
* Валидация всех форм с использованием класса FormValidator.
* Улучшен UX при работе с диалоговыми окнами.
* Отдельные js-файлы подключены в index.html как модули.
* Добавлены классы Section, Popup, PopupWithImage, PopupWithForm, UserInfo.
* Информация о пользователе подгружается с сервера.
* Начальные карточки подгружаются с сервера.
* Отредактированные данные профиля сохраняются на сервере.
* У каждой карточки есть свойство likes — оно содержит массив пользователей, лайкнувших карточку.
* Реализован попап удаления карточки.
* Реализовано обновление аватара пользователя.
* Все интерактивные элементы обладают состоянием наведения или фокуса.

## Планы по доработке
* Улучшение UX форм.

## Ссылка на проект
* https://elena-sh-r.github.io/mesto/

## Развертывание проекта:
* Создайте локальную директорию для проекта
`mkdir dev`
* Перейдите в созданную директорию
`cd dev`
* Клонируйте репозиторий в созданную директорию
`git clone https://github.com/elena-sh-r/mesto.git`
* Откройте проект в любом редакторе кода

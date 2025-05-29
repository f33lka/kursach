Курсовая
Это проект, который включает в себя серверную часть на Python с использованием Flask и клиентскую часть на JavaScript с использованием React и Tailwind CSS.
Структура проекта

server/: Содержит серверную часть на Python с использованием Flask и SQLite через Flask-SQLAlchemy.
client/: Содержит клиентскую часть на JavaScript с использованием React и Tailwind CSS.

Зависимости
Серверная часть

Python 3.x
Flask
Flask-SQLAlchemy
Flask-CORS

Клиентская часть

Node.js
npm
React
Axios
Tailwind CSS

Алгоритм запуска проекта

Шаг 1: Запуск серверной части

Откройте терминал 1.
Перейдите в каталог серверной части:

cd my-react-app/server

Создайте виртуальное окружение:

python3 -m venv venv

Активируйте виртуальное окружение:

Для Linux/macOS:

source venv/bin/activate

Для Windows:

venv\Scripts\activate

Установите зависимости:

pip3 install flask flask_sqlalchemy flask_cors

Запустите сервер:

python3 app.py

Шаг 2: Запуск клиентской части

Откройте терминал 2.
Перейдите в каталог клиентской части:

cd my-react-app

Установите зависимости:

npm install

Установите дополнительные зависимости:

npm install axios

Запустите клиентскую часть:

npm start

Дополнительная информация

Серверная часть: Сервер запускается на порте 5000. Вы можете настроить порт в файле app.py.
Клиентская часть: Клиентская часть запускается на порте 3000. Вы можете настроить порт в файле package.json.

TODO

Добавить дополнительные функции и улучшения в будущем.
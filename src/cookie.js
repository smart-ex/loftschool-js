/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
import { createCookie, deleteCookie } from "./index.js";
let homeworkContainer = document.querySelector("#homework-container"),
    filterNameInput = homeworkContainer.querySelector("#filter-name-input"),
    addNameInput = homeworkContainer.querySelector("#add-name-input"),
    addValueInput = homeworkContainer.querySelector("#add-value-input"),
    addButton = homeworkContainer.querySelector("#add-button"),
    listTable = homeworkContainer.querySelector("#list-table tbody"),
    cookies = {};

// создаем объект со всеми куками
function getCookies() {
    return document.cookie
        .split("; ")
        .filter(Boolean)
        .map(cookie => cookie.match(/^([^=]+)=(.+)/))
        .reduce((obj, [, name, value]) => {
            obj[name] = value;

            return obj;
        }, {});
}

// создаем строку tr с именем и значением куки, если уже есть - то обновляем значение
function cookieTr(name, value) {
    var tr = document.createElement("tr"),
        deleteButton = document.createElement("button");

    if (document.querySelector("#" + name)) {
        document.querySelector(
            "#" + name + " > td:nth-child(2)"
        ).innerText = value;
        document.querySelector("#" + name).dataset.cookie = value;
    } else {
        tr.id = name;
        tr.dataset.cookie = value;
        deleteButton.className = "delete";
        deleteButton.innerText = "удалить";
        tr.innerHTML = `<td>${name}</td><td>${value}</td>`;
        tr.append(deleteButton);
        listTable.append(tr);
    }
}

// Рэндерим таблицу из объекта с куками, учитывая значание filterNameInput
function renderTable(cookies = getCookies()) {
    listTable.innerHTML = "";
    for (let name in cookies) {
        if (
            name.includes(filterNameInput.value) ||
            cookies[name].includes(filterNameInput.value)
        ) {
            cookieTr(name, cookies[name]);
        }
    }
}

renderTable();

filterNameInput.addEventListener("keyup", () => renderTable());

addButton.addEventListener("click", () => {
    let name = addNameInput.value,
        value = addValueInput.value;

    createCookie(name, value);
    cookies = getCookies();
    if (
        !name.includes(filterNameInput.value) &&
        !value.includes(filterNameInput.value)
    ) {
        // удаляем из таблицы куку если нет в filterNameInput
        delete cookies[name];
    }
    renderTable(cookies);
});

// при нажатии кнопки удаляем куку из браузера и таблицы
listTable.addEventListener(
    "click",
    e => {
        if (e.target.nodeName == "BUTTON") {
            deleteCookie(e.target.parentNode.id);
            e.target.parentNode.remove();
        }
    },
    false
);

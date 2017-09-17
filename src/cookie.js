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

let homeworkContainer = document.querySelector("#homework-container");
let filterNameInput = homeworkContainer.querySelector("#filter-name-input");
let addNameInput = homeworkContainer.querySelector("#add-name-input");
let addValueInput = homeworkContainer.querySelector("#add-value-input");
let addButton = homeworkContainer.querySelector("#add-button");
let listTable = homeworkContainer.querySelector("#list-table tbody");

function createCookie(name, value) {
    return new Promise(resolve => {
        document.cookie = `${name}=${value}`;
        resolve(name);
    });
}

function deleteCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function getCookie(name) {
    let value = "; " + document.cookie,
        res,
        parts = value.split("; " + name + "=");
    if (parts.length == 2) {
        res = parts
            .pop()
            .split(";")
            .shift();
    }

    return res;
}

filterNameInput.addEventListener("keyup", function(e) {
    listTable.childNodes.forEach(function(element) {
        if (!element.id.includes(e.target.value) && !element.dataset.cookie.includes(e.target.value) ) {
            element.style.display = 'none'
        }else{
            element.style.display = ''
        }
    });
});

addButton.addEventListener("click", () => {
    let name = addNameInput.value,
        value = addValueInput.value;
    createCookie(name, value);
        if (document.querySelector("#" + name)) {
            document.querySelector(
                "#" + name + " > td:nth-child(2)"
            ).innerText = value;
        } else {
            let tr = document.createElement("tr"),
                deleteButton = document.createElement("button");
            tr.id = name;
            tr.dataset['cookie'] = value;
            deleteButton.className = "delete";
            deleteButton.innerText = "удалить";
            tr.innerHTML = `<td>${name}</td><td>${value}</td>`;
            tr.append(deleteButton);
            listTable.append(tr);
        }
   
});
listTable.addEventListener(
    "click",
    function(event) {
        if (event.target.nodeName == "BUTTON") {
            deleteCookie(event.target.parentNode.id);
            event.target.parentNode.remove();
        }
    },
    false
);

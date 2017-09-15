/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector("#homework-container");

/**
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */

function loadTowns() {
    return fetch(
        "https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json"
    )
        .then(function(response) {
            return !response.ok ? response.error() : response;
        })
        .then(response =>
            response
                .json()
                .then(data =>
                    data.sort(
                        (a, b) =>
                            a.name < b.name ? -1 : a.name > b.name ? 1 : 0
                    )
                )
        )
        .catch(function(err) {
            let button = document.createElement("button");
            button.addEventListener("click", () =>
                filterInput.dispatchEvent(new Event("keyup"))
            );
            button.append("Повторить загрузку");
            filterResult.append(
                "Не удалось загрузить города",
                document.createElement("br")
            );
            filterResult.append(button);
        });
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    let str = full.toUpperCase(),
        req = chunk.toUpperCase();

    return chunk ? str.includes(req) : false;
}

let loadingBlock = homeworkContainer.querySelector("#loading-block");
let filterBlock = homeworkContainer.querySelector("#filter-block");
let filterInput = homeworkContainer.querySelector("#filter-input");
let filterResult = homeworkContainer.querySelector("#filter-result");

filterInput.addEventListener("keyup", function(e) {
    filterResult.innerHTML = "";
    loadTowns().then(towns => {
        loadingBlock.style.display = "none";
        filterBlock.style.display = "block";
        towns.forEach(element => {
            if (isMatching(element.name, e.target.value)) {
                let item = document.createElement("div");

                item.innerText = element.name;
                filterResult.appendChild(item);
            }
        });
    });
});

export { loadTowns, isMatching };

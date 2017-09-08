/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
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
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
	var getRandomColor = () => {
		var letters = "0123456789ABCDEF",
			color = "#";

		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}

		return color;
	};
	var getRandomSize = () => Math.floor(Math.random() * 500);
	let res = document.createElement("div");
	var cssString =
		"position: absolute; width: " +
		getRandomSize() +
		"px;height: " +
		getRandomSize() +
		"px;top: " +
		getRandomSize() +
		"px;left: " +
		getRandomSize() +
		"px;background-color: " +
		getRandomColor() +
		";";
	res.setAttribute('draggable', true)
	res.className = "draggable-div";
	res.style.cssText += cssString;
	return res;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {}

let addDivButton = homeworkContainer.querySelector("#addDiv");

addDivButton.addEventListener("click", function() {
	// создать новый div
	let div = createDiv();

	// добавить на страницу
	homeworkContainer.appendChild(div);
	// назначить обработчики событий мыши для реализации d&d
	addListeners(div);
	// можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
	// или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export { createDiv };

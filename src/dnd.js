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
	var getRandomInt = max => Math.floor(Math.random() * max),
		res = document.createElement("div"),
		cssString =
			"width: " +
			getRandomInt(500) +
			"px;height: " +
			getRandomInt(500) +
			"px;top: " +
			getRandomInt(500) +
			"px;left: " +
			getRandomInt(500) +
			"px;background-color: rgb(" +
			getRandomInt(255) +
			"," +
			getRandomInt(255) +
			"," +
			getRandomInt(255) +
			", 0.8);";
	res.setAttribute("draggable", true);
	res.className = "draggable-div";
	res.style.cssText += cssString;
	return res;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
	var offset = function(el) {
		var rect = el.getBoundingClientRect();

		return {
			top: rect.top + document.body.scrollTop,
			left: rect.left + document.body.scrollLeft
		};
	};

	target.addEventListener("mousedown", e => {
		var el = e.target,
			startPosition = {
				top: e.pageY - offset(el).top,
				left: e.pageX - offset(el).left
			}

		el.classList.add("active");
		document.addEventListener("mousemove", e => {
		var active = document.querySelector(".active");
			active.style.top = e.pageY - startPosition.top + 'px';
			active.style.left = e.pageX - startPosition.left + 'px';

			
			active.addEventListener("mouseup", function(){
				active.classList.remove("active")
			}
			);
		});

	});
}

let addDivButton = homeworkContainer.querySelector("#addDiv"),
	style = document.createElement("style"),
	css =
		".draggable-div{cursor: move; user-select: none; border: 1px solid #757575; border-radius: 10px;\
			box-shadow: 5px 5px 10px #00000080;position: absolute;-moz-user-select: none;-moz-user-drag: element;} .active{opacity: 0.6}";
style.appendChild(document.createTextNode(css));
homeworkContainer.appendChild(style);
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

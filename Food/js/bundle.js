/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
    const result = document.querySelector(".calculating__result span");

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }


    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    // ratio - коэффициент активности

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "____";
            return;
        }

        if (sex === "female") {
            result.textContent = ((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio).toFixed(0);
        } else {
            result.textContent = ((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio).toFixed(0);
        }
    }

    calcTotal();


    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (event) => {
                if (event.target.getAttribute('data-ratio')) {
                    ratio = +event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = event.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }

                // console.log(ratio, sex);

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                event.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');


    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', (e) => {
            if (input.value.match(/\D/g)) {
                input.style.border = '3px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price *= this.transfer;
        }

        render() {
            const element = document.createElement("div");
            if (this.classes.length == 0) {
                this.element = "menu__item";
                element.classList.add(this.element);
            } else {
                this.classes.forEach((className) => {
                    element.classList.add(className);
                });
            }

            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                `;
            this.parent.append(element);
        }
    }

    const getData = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    // getData('http://localhost:3000/menu')
    //     .then(data => {
    //         // console.log(data);
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    axios.get("http://localhost:3000/menu").then((data) => {
        data.data.forEach(({ img, altimg, title, descr, price }) => {
            new MenuCard(
                img,
                altimg,
                title,
                descr,
                price,
                ".menu .container"
            ).render();
        });
    });

    // Вариант отправки GET запроса и получения данных без класса MenuCard
    // getData('http://localhost:3000/menu')
    //     .then(data => {
    //         createCard(data);
    //     })

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add('menu__item');

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector('.meny .container').append(element);
    //     });
    // }
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
    const forms = document.querySelectorAll("form");

    const message = {
        loading: "img/form/spinner.svg",
        success: "Success!",
        fail: "Error!",
    };

    forms.forEach((item) => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=utf-8",
            },
            body: data,
        });
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.append(statusMessage);
            form.insertAdjacentElement("afterend", statusMessage);

            const formData = new FormData(form); // собирает все данные из формы
            // console.log(formData.entries);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            // console.log(json);

            postData("http://localhost:3000/requests", json)
                .then((data) => {
                    // console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.fail);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");
        prevModalDialog.classList.add("hide");

        openModal();

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>   
            </div>
        `;
        document.querySelector(".modal").append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            closeModal();
        }, 4000);
    }
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal_screen.js":
/*!************************************!*\
  !*** ./js/modules/modal_screen.js ***!
  \************************************/
/***/ ((module) => {

function modal() {
    const modalTrigger = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal");

    function openModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
    }

    modalTrigger.forEach((btn) => {
        btn.addEventListener("click", openModal);
    });

    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    modal.addEventListener("click", (event) => {
        if (
            event.target === modal ||
            event.target.getAttribute("data-close") == ""
        ) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.code == "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });

    // -----

    // const modalTimerId = setTimeout(openModal, 30000);

    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
    const slides = document.querySelectorAll(".offer__slide"), // все слайды, их массив
        slider = document.querySelector(".offer__slider"),
        prev = document.querySelector(".offer__slider-prev"), // стрелочка указывающая на предыдущий слайд
        next = document.querySelector(".offer__slider-next"), // стрелочка указывающая на следующий слайд
        total = document.querySelector("#total"), // общее кол-во слайдов в цыфрах
        current = document.querySelector("#current"), // число текущего слайда
        slidesWrapper = document.querySelector(".offer__slider-wrapper"), // обертка всех слайдов и самого слайдера
        slidesField = document.querySelector(".offer__slider-inner"), // сам слайдер
        width = window.getComputedStyle(slidesWrapper).width; // getComputedStyle вернет все css стили slidesWrapper и уже оттуда мы берем width

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        // если кол-во слайдов меньше 10, то
        total.textContent = `0${slides.length}`; // перед числом указываюющим общее кол-во слайдов ставим 0
        current.textContent = `0${slideIndex}`; // и перед текущим тоже
    } else {
        // иначе
        total.textContent = slides.length; // просто общее кол-во слайдов
        current.textContent = slideIndex; // slideIndex
    }

    slidesField.style.width = slides.length * 100 + "%"; // кол-во слайдов умножаем на 100 % (4 * 100% = 400%)
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all"; // чтобы была плавная анимация

    slidesWrapper.style.overflow = "hidden"; //все что выходим за края экрана, будет скрыто

    slides.forEach((slide) => {
        slide.style.width = width; // для каждого слайда устанавливаем ширину обертки всех слайдов
    });

    slider.style.position = "relative";

    const indicators = document.createElement("ol"),
        dots = [];

    indicators.classList.add("carousel-indicators");

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i + 1);
        dot.classList.add("dot");

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    function showCurrentSlide() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach((dot) => (dot.style.opacity = ".5"));
        dots[slideIndex - 1].style.opacity = 1;
    }

    function fromStrToNum(str) {
        str = +str.replace(/\D/g, "");
        return str;
    }

    next.addEventListener("click", () => {
        if (offset == fromStrToNum(width) * (slides.length - 1)) {
            // если offset ровно ширине обгортки умноженой на количество слайдов-1
            offset = 0;
        } else {
            // иначе
            offset += fromStrToNum(width); // каждый раз добавляем ширину обгортки
        }

        slidesField.style.transform = `translateX(-${offset}px)`; // перемещаем по оси Х вправо

        if (slideIndex == slides.length) {
            // если slideIndex == последний слайд
            slideIndex = 1; // устанвливаем его на первый
        } else {
            slideIndex++; // иначе перемещаем на следующий
        }

        showCurrentSlide();
    });

    prev.addEventListener("click", () => {
        if (offset == 0) {
            offset = fromStrToNum(width) * (slides.length - 1);
        } else {
            offset -= fromStrToNum(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        showCurrentSlide();
    });

    dots.forEach((dot) => {
        dot.addEventListener("click", (event) => {
            const slideTo = event.target.getAttribute("data-slide-to");

            slideIndex = slideTo;
            offset = fromStrToNum(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            showCurrentSlide();
        });
    });

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.innerHTML = `<span id="total">0${slides.length}</span>`;
    // } else {
    //     total.innerHTML = `<span id="total">${slides.length}</span>`;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => {
    //         item.style.display = 'none';
    //     });

    //     slides[slideIndex - 1].style.display = 'block';

    // if (slides.length < 10) {
    //     current.innerHTML = `<span id="current">0${slideIndex}</span>`;
    // } else {
    //     total.innerHTML = `<span id="current">${slideIndex}</span>`;
    // }
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // })

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // })
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    const tabs = document.querySelectorAll(".tabheader__item"), // получаем все надписи: фитнес, премиум...
        tabsContent = document.querySelectorAll(".tabcontent"), // получаем все картинки и надписи к ним
        tabsParent = document.querySelector(".tabheader__items"); // получаем родительский клас всех надписей tabs

    function hideTabContent() {
        // функция чтобы прятать ненужные объекты
        tabsContent.forEach((item) => {
            item.classList.add("hide"); // для каждого объекта с tabsContent добавляем клас .hide
            item.classList.remove("show"); // для каждого объекта с tabsContent удаляем клас .show
        });

        tabs.forEach((item) => {
            item.classList.remove("tabheader__item_active"); // удаляем класс активности для каждого элемента tabs
        });
    }

    function showTabContent(i = 0) {
        // функция чтобы показать нужный объект
        tabsContent[i].classList.add("show", "fade"); // к каждому объекту(картинка и надпись к ней) добавляем классы show и fade
        tabsContent[i].classList.remove("hide"); // удаляем клас hide

        tabs[i].classList.add("tabheader__item_active"); // и к каждой надписи добавляем класс активности
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        // будет выполняться при каждом клике на надпись
        const target = event.target; // заводим новую переменную для удобства

        if (target && target.classList.contains("tabheader__item")) {
            // проверяем, нажата ли была какая-то надпись в объекте tabsParent
            tabs.forEach((item, i) => {
                // для кажной надписи
                if (target == item) {
                    // если она равняется нажатой надписи
                    hideTabContent(); // прячем ненужные элементы
                    showTabContent(i); // показываем нужный объект
                }
            });
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
    const deadline = "2022-08-26"; // дэдлайн

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), // разница между дэдлайном и текущей датой в миллисекундах
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // получаем кол-во дней между дэдлайном и текущей датой
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

    function getZero(num) {
        // функция для добавления 0 перед числами меньше 10
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector), // получаем все объекты из html
            days = document.querySelector("#days"),
            hours = document.querySelector("#hours"),
            minutes = document.querySelector("#minutes"),
            seconds = document.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000); // updateClock() будет запускаться каждую секунду

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(".timer", deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener("DOMContentLoaded", () => {
	// ------------------------------ STYLE OF MEAL --------------------------------------------------------------------------------------------------------
	const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
	// ------------------------------ STYLE OF MEAL --------------------------------------------------------------------------------------------------------

	// ------------------------------ PROMOTION TIME (TIMER) -----------------------------------------------------------------------------------------------
	const timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
	// ------------------------------ PROMOTION TIME (TIMER) -----------------------------------------------------------------------------------------------

	// ------------------------------ MODAL SCREEN ---------------------------------------------------------------------------------------------------------
	const modal = __webpack_require__(/*! ./modules/modal_screen */ "./js/modules/modal_screen.js");
	// ------------------------------ MODAL SCREEN ---------------------------------------------------------------------------------------------------------

	// ------------------------------  DAY MENU  -----------------------------------------------------------------------------------------------------------
	const cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
	// ------------------------------  DAY MENU  -----------------------------------------------------------------------------------------------------------

	// ------------------------------  FORMS  --------------------------------------------------------------------------------------------------------------
	const forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
	// ------------------------------  FORMS  --------------------------------------------------------------------------------------------------------------

	// ------------------------------  SLIDER  -------------------------------------------------------------------------------------------------------------
	const slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
	// ------------------------------  SLIDER  -------------------------------------------------------------------------------------------------------------

	// ------------------------------  CALCULATOR  ---------------------------------------------------------------------------------------------------------
	const calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");	
	// ------------------------------  CALCULATOR  ---------------------------------------------------------------------------------------------------------

	tabs();
	timer();
	modal();
	cards();
	forms();
	slider();
	calc();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
window.addEventListener('DOMContentLoaded', () => {

    // ------------------------------ STYLE OF MEAL -------------------------------------------------------------------------------------------------
    const tabs = document.querySelectorAll('.tabheader__item'),  // получаем все надписи: фитнес, премиум...
        tabsContent = document.querySelectorAll('.tabcontent'),  // получаем все картинки и надписи к ним
        tabsParent = document.querySelector('.tabheader__items');  // получаем родительский клас всех надписей tabs

    function hideTabContent() { // функция чтобы прятать ненужные объекты
        tabsContent.forEach(item => {
            item.classList.add('hide');  // для каждого объекта с tabsContent добавляем клас .hide
            item.classList.remove('show');  // для каждого объекта с tabsContent удаляем клас .show
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');  // удаляем класс активности для каждого элемента tabs
        });
    }


    function showTabContent(i = 0) {  // функция чтобы показать нужный объект
        tabsContent[i].classList.add('show', 'fade');  // к каждому объекту(картинка и надпись к ней) добавляем классы show и fade
        tabsContent[i].classList.remove('hide');  // удаляем клас hide

        tabs[i].classList.add('tabheader__item_active');  // и к каждой надписи добавляем класс активности
    }


    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', (event) => {  // будет выполняться при каждом клике на надпись
        const target = event.target;  // заводим новую переменную для удобства

        if (target && target.classList.contains('tabheader__item')) {  // проверяем, нажата ли была какая-то надпись в объекте tabsParent
            tabs.forEach((item, i) => {  // для кажной надписи
                if (target == item) {  // если она равняется нажатой надписи
                    hideTabContent();  // прячем ненужные элементы
                    showTabContent(i);  // показываем нужный объект
                }
            });
        }
    });
    // ------------------------------ STYLE OF MEAL -------------------------------------------------------------------------------------------------


    // ------------------------------ PROMOTION TIME (TIMER) ------------------------------------------------------------------------------------------------
    const deadline = '2022-08-26';  // дэдлайн

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),  // разница между дэдлайном и текущей датой в миллисекундах
            days = Math.floor(t / (1000 * 60 * 60 * 24)),  // получаем кол-во дней между дэдлайном и текущей датой
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    function getZero(num) {  // функция для добавления 0 перед числами меньше 10
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),  // получаем все объекты из html
            days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);  // updateClock() будет запускаться каждую секунду

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

    setClock('.timer', deadline);
    // ------------------------------ PROMOTION TIME (TIMER) ------------------------------------------------------------------------------------------------

    // ------------------------------ MODAL SCREEN ----------------------------------------------------------------------------------------------------------
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');


    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal)
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }


    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code == "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });


    // -----


    // const modalTimerId = setTimeout(openModal, 30000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // ------------------------------ MODAL SCREEN ----------------------------------------------------------------------------------------------------------


    // ------------------------------  DAY MENU  ----------------------------------------------------------------------------------------------------------
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
            const element = document.createElement('div');
            if (this.classes.length == 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => {
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

    const getData = async url => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    
    getData('http://localhost:3000/menu')
        .then(data => {
            // console.log(data);
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

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


    // ------------------------------  DAY MENU  ----------------------------------------------------------------------------------------------------------

    // ------------------------------  FORMS  -------------------------------------------------------------------------------------------------------------
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Success!',
        fail: 'Error!',
    };

    forms.forEach(item => {
        bindPostData(item);
    });


    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=utf-8',
            },
            body: data
        });
        return await res.json();
    };


    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);  // собирает все данные из формы
            // console.log(formData.entries());

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            // console.log(json);

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    // console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.fail);
                }).finally(() => {
                    form.reset();
                })
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');

        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>   
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

});


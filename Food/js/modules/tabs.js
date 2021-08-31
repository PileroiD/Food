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
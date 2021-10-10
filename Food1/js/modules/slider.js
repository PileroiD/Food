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

export default slider;
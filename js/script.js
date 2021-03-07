/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

//1 Заполнение формы
//2 Нажатие кнопки
// 3 Фильм добавляется в список
// 4 страница не перезагружается
// 5 и добавляется в массив

'use strict';

// Возьмите свой код из предыдущей практики

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');
    // deleteBtns = document.querySelectorAll('[class="delete"]');

    //   console.log(deleteBtns);

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if (newFilm) {
            newFilm = checkLength(newFilm); //проверка длины
            movieDB.movies.push(newFilm); // добавление в базу данных
            sortArr(movieDB.movies); //сортировка в БД по алфавиту

            createMovieList(movieDB.movies, movieList); // добавление на страницу
        }

        if (favorite) {
            console.log('Добавляем любимый фильм');
        }

        event.target.reset();

    });



    // deleteBtns.forEach(button => 
    //     button.addEventListener("click", () => {
    //     console.log('yes');
    // }));

    // for (const btn of deleteBtns) {
    //     btn.addEventListener('click', function() {
    //         console.log('yes');
    //     });
    //   }


    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    const makeChanges = () => {
        genre.textContent = 'драма';

        poster.style.backgroundImage = 'url("img/bg.jpg")';

    };

    const sortArr = (arr) => {
        arr.sort();
    };

    function createMovieList(films, parent) {
        parent.innerHTML = '';

        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', (e) => {
                e.target.parentElement.remove();
                movieDB.movies.splice(i, 1);
            });
        });
    }





    function checkLength(film) {
        let newFilm = film;
        if (film.length > 21) {
            newFilm = `${film.substr(0, 20)}...`;
        }
        return newFilm;
    }


    deleteAdv(adv);
    makeChanges();
    sortArr(movieDB.movies);
    createMovieList(movieDB.movies, movieList);
});
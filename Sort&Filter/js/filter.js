(function () {
    var data = window.data.books;
    var renderList = window.render;

    var body = document.querySelector('.uk-card-body');
    var table = document.querySelector('.books');
    var filter = document.querySelectorAll('.js-filter');
    var filterOpenBtn = document.querySelectorAll('.js-filter-btn');
    var filterList = document.querySelectorAll('.filter__list');
    var filterClearBtn = document.querySelectorAll('.js-filter-clear');
    var filterClearAllBtn = document.querySelector('.js-filter-clear-all');
    var hiddenClass = 'uk-hidden';

    // Очистить чекбоксы
    var clearCheckbox = function (list) {
        list.querySelectorAll('input').forEach(function (it) {
            it.checked = false;
        });
    };

    //Очистить фильтр
    var clearFilter = function (filter) {
        if (filter.closest('.filter')) {
            clearCheckbox(filter);
        } else {
            filter.value = '';
        }
    };

    //Открыть/Закрыть фильтры
    var toggleFilterListVisibility = function (btn) {
        var toggle = false;
        if (btn && btn.nextElementSibling.closest('.' + hiddenClass)) {
            toggle = true;
        }
        filterList.forEach(function (it) {
            it.classList.add(hiddenClass);
        });
        if (btn && toggle === true) {
            btn.nextElementSibling.classList.remove(hiddenClass);
        }
    };

    //Фильтрация
    var getFilteredList = function () {
        var filteredData = data.slice();

        if (window.sortedData && window.sortedData !== '') {
            var sortedData = window.sortedData;
            if (sortedData !== filteredData) {
                filteredData = sortedData.slice();
            }
        }

        var getNewData = function (filter, value, node) {
            var nodeName = filter.nodeName.toLowerCase();
            var caption = filter.getAttribute('data-filter');

            filteredData = filteredData.slice().filter(function (it) {
                var itemValue = it[caption].toLowerCase();
                if (node) {
                    var hook = false;
                    value.forEach(function (it) {
                        if (itemValue == it) {
                            hook = true;
                        }
                    });
                    return hook;
                } else if (nodeName == 'select') {
                    return itemValue == value;
                } else if (nodeName == 'input') {
                    return itemValue.indexOf(value) >= 0;
                }
            });
        };

        filter.forEach(function (filter) {
            var value = filter.value;
            if (filter.closest('.filter')) {
                var checkedValue = [];
                var filterText = '';
                filter.querySelectorAll('input').forEach(function (it) {
                    value = it.value.toLowerCase();
                    if (it.checked) {
                        checkedValue.push(value);
                    }
                });
                if (checkedValue.length > 0) {
                    filterText = 'Выбрано: ' + checkedValue.length;
                    getNewData(filter, checkedValue, 'checkbox');
                }
                filter.previousElementSibling.textContent = filterText;
            } else if (value !== '' && value !== undefined) {
                value = value.toLowerCase();
                getNewData(filter, value);
            }
        });

        // Сообщение "Ничего не найдено"
        var alertMessage = document.createElement('div');
        alertMessage.classList.add('uk-alert', 'uk-alert-danger');
        alertMessage.textContent = 'Ничего не найдено';
        if (filteredData.length == 0 && !table.closest('.' + hiddenClass)) {
            table.classList.add(hiddenClass);
            body.appendChild(alertMessage);
        } else if (filteredData.length !== 0 && table.closest('.' + hiddenClass)) {
            table.classList.remove(hiddenClass);
            body.removeChild(body.querySelector('.uk-alert'));
        }

        renderList(filteredData);
    };

    //Добавляем к фильтрам обработчики событий
    filter.forEach(function (filter) {
        var nodeName = filter.nodeName.toLowerCase();
        if (nodeName == 'select') {
            filter.addEventListener('change', getFilteredList);
        }
        else if (nodeName == 'input') {
            filter.addEventListener('input', getFilteredList);
        } else if (filter.closest('.filter')) {
            filter.querySelectorAll('input').forEach(function (it) {
                it.addEventListener('change', getFilteredList);
            });
        }
    });

    //Кнопки Очистить
    filterClearBtn.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var filter = this.previousElementSibling;
            clearFilter(filter);
            getFilteredList();
        });
    });

    //Кнопка Очистить Всё
    filterClearAllBtn.addEventListener('click', function () {
        filter.forEach(function (filter) {
            clearFilter(filter);
        });
        getFilteredList();
    });

    //Кнопки открыть/закрыть фильтры
    filterOpenBtn.forEach(function (btn) {
        btn.addEventListener('click', function () {
            toggleFilterListVisibility(this);
        });
    });

    document.addEventListener('click', function (evt) {
        if (!evt.target.closest('.filter')) {
            toggleFilterListVisibility();
        }
    });

    window.filter = getFilteredList;
})();

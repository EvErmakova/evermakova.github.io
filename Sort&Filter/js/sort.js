(function () {
    var data = window.data.books;
    var renderList = window.render;

    var sortBtn = document.querySelectorAll('.sortable');

    //Сортировка
    var getSortedList = function (it) {
        var sortedData = data.slice();
        window.sortedData = '';

        if (!it.closest('.active')) {
            sortBtn.forEach(function (it) {
                if (it.closest('.active')) {
                    it.classList.remove('active');
                }
            });
            it.classList.add('active');
            var dataSort = it.getAttribute('data-sort');
            sortedData = sortedData.slice().sort(function (a, b) {
                var dataA = a[dataSort],
                    dataB = b[dataSort];
                if (dataA < dataB) {
                    return -1;
                }
                if (dataA > dataB) {
                    return 1;
                }
                return 0;
            });
            window.sortedData = sortedData;
        } else {
            it.classList.remove('active');
        }
        renderList(sortedData);
    };

    //Добавляем обработчики для сортировки
    sortBtn.forEach(function (it) {
        it.addEventListener('click', function () {
            getSortedList(this);
            window.filter();
        });
    });
})();
(function () {
    var data = window.data.books;
    var filterList = {
        bookGenre: window.data.genre,
        bookStatus: window.data.status
    };
    var books = document.querySelector('.books');
    var booksBody = books.querySelector('tbody');

    //Выводим options
    Object.keys(filterList).forEach(function (item) {
        var filter = document.querySelector('#' + item);
        filterList[item].forEach(function (item) {
            var option = document.createElement('option');
            option.textContent = item;
            filter.appendChild(option);
        });
    });

    //Первыми выводить "хочу прочитать"
    data.sort(function (left, right) {
        var getRank = function (book) {
            var rank = 0;
            if (book.status === 'Читаю') {
                rank = 1;
            }
            return rank;
        };
        var rankDiff = getRank(right) - getRank(left);
        return rankDiff;
    });

    var renderList = function(list) {
        booksBody.innerHTML = "";
        list.forEach(function (item) {
            var tr = document.createElement('tr');
            Object.keys(item).forEach(function (key) {
                var td = document.createElement('td');
                td.textContent = item[key];
                tr.appendChild(td);
            });
            booksBody.appendChild(tr);
        });
    };

    renderList(data);

    window.render = renderList;
})();
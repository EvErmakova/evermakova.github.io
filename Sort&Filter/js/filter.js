(function () {
    var data = window.data.books;
    var renderList = window.render;
    var filter = document.querySelectorAll('.js-filter');
    var filterClearBtn = document.querySelectorAll('.js-filter-clear');
    var filterClearAllBtn = document.querySelector('.js-filter-clear-all');

    var getFilteredList = function () {
        var newData = data.slice();
        filter.forEach(function (filter) {
            var nodeName = filter.nodeName.toLowerCase();
            var value = filter.value.toLowerCase();
            var caption = filter.getAttribute('data-filter');
            if (value !== '') {
                newData = newData.slice().filter(function (item) {
                    if (nodeName == 'select') {
                        return item[caption].toLowerCase() == value;
                    } else if (nodeName == 'input') {
                        return item[caption].toLowerCase().indexOf(value) >= 0;
                    }
                });
            }
        });
        renderList(newData);
    };

    filter.forEach(function (filter) {
        var nodeName = filter.nodeName.toLowerCase();
        if (nodeName == 'select') {
            filter.addEventListener('change', getFilteredList);
        }
        else if (nodeName == 'input') {
            filter.addEventListener('input', getFilteredList);
        }
    });

    filterClearBtn.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var input = this.previousElementSibling;
            input.value = '';
            getFilteredList();
        });
    });

    filterClearAllBtn.addEventListener('click', function () {
        filter.forEach(function (filter) {
            filter.value = '';
        });
        getFilteredList();
    });
})();
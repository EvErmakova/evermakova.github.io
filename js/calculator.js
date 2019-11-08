(function () {
    var calc = document.querySelector('.calculator');
    var btnClass = '.calculator__btn';
    var numberClass = '.calculator__btn--number';
    var calcWindow = calc.querySelector('.calculator__window');
    var btnID = {
        sum: '#sumBtn',
        clear: '#clearBtn',
        backspace: '#backspaceBtn',
        point: '#pointDtn',
        multiply: '#multiplyBtn',
        plus: '#plusBtn',
        point: '#pointBtn'
    };
    var keyCode = {
        'one': 49,
        'two': 50,
        'three': 51,
        'four': 52,
        'five': 53,
        'six': 54,
        'seven': 55,
        'eight': 56,
        'nine': 57,
        'zero': 48,
        'clear': 27,
        'backspace': 8,
        'division': 191,
        'minus': 189,
        'sum': 187,
        'enter': 13,
        'point': 190
    };
    var string = '0';
    var lastOfString = '';

    //Начальное значение
    calcWindow.innerHTML = '0';

    calc.addEventListener('click', function (evt) {
        if (evt.target.closest(btnClass) && !evt.target.closest(btnClass).disabled) {
            var btnValue = evt.target.closest(btnClass).value;
            if (evt.target.closest(btnID.clear)) {
                // Если нажали очистить
                string = '0';
            } else if (evt.target.closest(btnID.backspace)) {
                // Если нажали удалить последний символ
                if (string.length > 1) {
                    string = string.substring(0, string.length - 1);
                } else {
                    string = '0';
                }
            } else if (evt.target.closest(btnID.sum)) {
                // Если нажали равно
                if (lastOfString !== '+' && lastOfString !== '-' && lastOfString !== '/' && lastOfString !== '*') {
                    string = eval(string).toString();
                }
            } else if (evt.target.closest(btnID.point)) {
                // Если нажали точку
                var lastNumber = '';
                for (var i = string.length - 1; i >= 0; i --) {
                    if (isNaN(string[i])) {
                        lastNumber = string.slice(i);
                        break;
                    }
                }
                if (!lastNumber.includes('.')) {
                    string += btnValue;
                }
            } else {
                // Если нажали любую другую кнопку
                if (string == '0' && !evt.target.closest(numberClass) && btnValue !== '-') {
                } else if ((lastOfString === '+' || lastOfString === '-' || lastOfString === '/' || lastOfString === '*') && !evt.target.closest(numberClass)) {
                    if (btnValue !== lastOfString) {
                        string = string.substring(0, string.length - 1) + btnValue;
                    }
                } else {
                    if (string == '0') {
                        string = btnValue;
                    } else {
                        string += btnValue;
                    }
                }
            }
            calcWindow.innerHTML = string;
            lastOfString = string.slice(-1);
        }
    });

    // Обработчик клавиатуры
    window.addEventListener('keydown', function (evt) {
        var key = evt.keyCode;
        Object.keys(keyCode).forEach(function (item) {
            if (key == keyCode.enter) {
                document.querySelector(btnID.sum).click();
            } else if (evt.shiftKey) {
                if (key == keyCode.eight) {
                    document.querySelector(btnID.multiply).click();
                } else if (key == keyCode.sum) {
                    document.querySelector(btnID.plus).click();
                }
            } else if (key == keyCode[item]) {
                document.querySelector('#' + item + 'Btn').click();
            }
        });
    });
})();

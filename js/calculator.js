(function () {
    var calc = document.querySelector('.calculator');
    var btnClass = '.calculator__btn';
    var numberClass = '.calculator__btn--number';
    var calcWindow = calc.querySelector('.calculator__window');
    var btnsID = { sum: '#sumBtn', clear: '#clearBtn', backspace: '#backspaceBtn'};
    var string = '0';

    //Начальное значение
    calcWindow.innerHTML = '0';

    calc.addEventListener('click', function (evt) {
        if (evt.target.closest(btnsID.clear)) {
            // Если нажали очистить
            string = '0';
        } else if (evt.target.closest(btnsID.backspace)) {
            // Если нажали удалить последний символ
            if (string.length > 1) {
                string = string.substring(0, string.length - 1);
            } else {
                string = '0';
            }
        } else if (evt.target.closest(btnsID.sum)) {
            // Если нажали равно
            if (string.slice(-1) !== '+' && string.slice(-1) !== '-' && string.slice(-1) !== '/' && string.slice(-1) !== '*') {
                string = eval(string).toString();
            }
        } else if (evt.target.closest(btnClass) && !evt.target.disabled) {
            // Если нажали кнопку
            var btnValue = evt.target.closest(btnClass).value;
            if (string == '0' && !evt.target.closest(numberClass) && btnValue !== '-') {
            } else if ((string.slice(-1) === '+' || string.slice(-1) === '-' || string.slice(-1) === '/' || string.slice(-1) === '*') && !evt.target.closest(numberClass)) {
                if (btnValue !== string.slice(-1)) {
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
    });
})();
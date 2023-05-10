function Validator(options) {
    var selectorRules = {}

    function Validate(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value);
        var erroElement = inputElement.parentElement.querySelector(options.errorSelector)

        //Lay ra cac rule cua selector
        var rules = selectorRules[rule.selector]
        //Lap qua tung rules va kiem tra
        //Neu co loi thi dung viec kiem tra
        for (var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value)
            if (errorMessage)
                break;
        }

        if (errorMessage) {
            erroElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        }
        else {
            erroElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')

        }
        return !errorMessage

    }


    var formElement = document.querySelector(options.form)
    if (formElement) {
        //Lap qua moi rules va xu ly (lang nghe su kien blur, input)
        //Khi submit form
        formElement.onsubmit = function (e) {
            e.preventDefault()
            var isFormValid = true

            //lap qua tung rule va validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector)
                var isValid = Validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false
                }
            })
            if (isFormValid) {
                window.location.href = "index.html"
                var msvElm = document.getElementById('MSV');
                var hoTenElm = document.getElementById('fullname');
                var emailElm = document.getElementById('email');
                var gioiTinhElm = document.getElementById('gt');
                var ngonNguElm = document.getElementById('language')
                var ngaySinhElm = document.getElementById('birth')
                var matKhauElm = document.getElementById('pass');
                event.preventDefault()

                var user = {
                    msv: msvElm.value,
                    hoTen: hoTenElm.value,
                    email: emailElm.value,
                    // gioiTinh : gioiTinhElm.value,
                    // ngonNgu : ngonNguElm.value,
                    ngaySinh: ngaySinhElm.value,
                    matKhau: matKhauElm.value,
                }
                console.log(user)
                var json = JSON.stringify(user)
                localStorage.setItem('user', json)
                alert('Dang ky thanh cong')

            }
        }
        options.rules.forEach(function (rule) {
            //Luu lai rules cho moi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test]
            }


            var inputElement = formElement.querySelector(rule.selector)

            if (inputElement) {
                inputElement.onblur = function () {
                    Validate(inputElement, rule);

                }
            }

        });
        console.log(selectorRules)

    }
}
//Nguyen tac cua cac rules:
//1. Khi co loi thi tra message loi
//2. Khi hop le thi khong tra ra gi ca
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui long nhap truong nay'
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : message || 'Vui long nhap email'
        }
    }
}

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Vui long nhap toi thieu ${min} ki tu`
        }
    }
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Gia tri nhap vao khong chinh xac'
        }
    }
}

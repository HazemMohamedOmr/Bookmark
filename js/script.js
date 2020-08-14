var inputName = document.getElementById("inputName"),
    inputURL = document.getElementById("inputURL"),
    subBtn = document.getElementById("submit"),
    warnName = document.getElementById("warnName"),
    warnUrl = document.getElementById("warnUrl"),
    delBtn,
    bookmarkList;

subBtn.addEventListener("click", addBookmark);

if (localStorage.getItem("bookmark") == null) {
    bookmarkList = [];
}
else {
    bookmarkList = JSON.parse(localStorage.getItem("bookmark"));
    displayBookmark();
}

function addBookmark() {
    var check = checkValidate();
    if (check == 0)
        return;

    var bookInput = {
        name: inputName.value,
        URL: inputURL.value
    }

    bookmarkList.push(bookInput);

    localStorage.setItem("bookmark", JSON.stringify(bookmarkList));

    displayBookmark();

    clearForm();
}

function displayBookmark() {
    var box = ``;
    for (var i = 0; i < bookmarkList.length; i++) {
        box += `<div class="item shadow mb-3">
            <div class="d-flex justify-content-between py-2 px-1">
                <div class="">
                    <h2>${bookmarkList[i].name}</h2>
                </div>
                <div class="">
                    <a id="visit" href="${bookmarkList[i].URL}" target="_blank" class="btn btn-primary mr-2">Visit</a>
                    <button id="delete" class="btn btn-danger del">Delete</button>
                </div>
            </div>
        </div>`
    }

    document.getElementById("books").innerHTML = box;

    deleteSteps();
}

function clearForm() {
    inputName.value = "";
    inputURL.value = "";
}

function deleteBookmark(index) {
    bookmarkList.splice(index, 1);

    localStorage.setItem("bookmark", JSON.stringify(bookmarkList));

    displayBookmark();
}

function deleteSteps() {
    delBtn = Array.from(document.getElementsByClassName("del"));

    var makeHandler = function (num) {
        return function () {
            deleteBookmark(num);
        };
    };

    for (var i = 0; i < delBtn.length; i++) {
        delBtn[i].addEventListener("click", makeHandler(i));
    }
}

function checkValidate() {
    var name = validateName();
    var url = validateURL();
    var flag1 = 0;
    var flag2 = 0;

    if (name == 0) {
        warnName.innerHTML = "Name is Required";
        warnName.style.display = "block";
        inputName.style.borderColor = "#dc3545";
    }
    else if (name == 2) {
        warnName.innerHTML = "Name Must start with Capital letter!";
        warnName.style.display = "block";
        inputName.style.borderColor = "#dc3545";
    }
    else {
        flag1 = 1;
        warnName.style.display = "none";
        inputName.style.borderColor = "#ced4da";
    }

    if (url == 0) {
        warnUrl.innerHTML = "URL is Required";
        warnUrl.style.display = "block";
        inputURL.style.borderColor = "#dc3545";
    }
    else if (url == 2) {
        warnUrl.innerHTML = "URL Must start with https:// or http://";
        warnUrl.style.display = "block";
        inputURL.style.borderColor = "#dc3545";
    }
    else {
        flag2 = 1;
        warnUrl.style.display = "none";
        inputURL.style.borderColor = "#ced4da";
    }


    if (flag1 == 0 || flag2 == 0)
        return 0;
    else
        return 1;
}

function validateName() {
    var x = /^[A-Z]/
    if (inputName.value == "")
        return 0;
    else if (x.test(inputName.value))
        return 1;
    else
        return 2;
}

function validateURL() {
    var x = /^(http:|https:)/;
    if (inputURL.value == "")
        return 0;
    else if (x.test(inputURL.value))
        return 1;
    else
        return 2;
}
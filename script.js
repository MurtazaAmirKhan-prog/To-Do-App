var getUl = document.getElementById('ul');
var clearButton = document.getElementById('clearbtn');
var getInp = document.getElementById('inp');

var getStorage = JSON.parse(localStorage.getItem('getStorage')) || [];
var editIndex = null;

window.onload = function () {
    renderList();
};

var icon = document.querySelector(".theme-toggler i");

function toggleTheme() {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace("fa-moon", "fa-sun");
    } else {
        icon.classList.replace("fa-sun", "fa-moon");
    }

    localStorage.setItem('darkTheme', document.body.classList.contains('dark-mode'));
}

if (localStorage.getItem('darkTheme') === 'true') {
    document.body.classList.add('dark-mode');
    icon.classList.replace("fa-moon", "fa-sun");
}

if (localStorage.getItem('darkTheme') === 'true') {
    document.body.classList.add('dark-mode');
}

function addItems() {
    if (getInp.value.trim() === '') {
        alert('Please enter any value!');
        return;
    }

    if (editIndex !== null) {
        getStorage[editIndex].list = getInp.value.trim();
        editIndex = null;
    } else {
        getStorage.push({ list: getInp.value.trim() });
    }

    updateStorage();
    getInp.value = "";
}

function updateStorage() {
    localStorage.setItem('getStorage', JSON.stringify(getStorage));
    renderList();
}

function renderList() {
    getUl.innerHTML = "";
    getStorage.forEach((item, index) => {
        getUl.innerHTML += `
            <li class="li" data-index="${index}">
                <span>${item.list}</span>
                <div class="libtns">
                    <button onclick="delItem(${index})" class="libtn">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                    <button onclick="editItem(${index})" class="libtn">
                        <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                </div>
            </li>`;
    });

    clearButton.style.display = getStorage.length > 0 ? "block" : "none";
}

function editItem(index) {
    const item = getStorage[index];
    getInp.value = item.list;
    editIndex = index;
    getInp.focus();
}

function delItem(index) {
    getStorage.splice(index, 1);
    updateStorage();
}

function delItems() {
    getStorage = [];
    updateStorage();
}
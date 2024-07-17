const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) => addItemToDOM(item));
    checkUI();
}

function onAddItemSubmit(e) {
    e.preventDefault();
    
    const newItem = itemInput.value;

    // Validate Input
    if(newItem === '') {
        alert('Please enter an item');
        return;
    }

    // Create item DOM element
    addItemToDOM(newItem);

    // Add item to local storage
    addItemToStorage(newItem);
    
    checkUI();

    itemInput.value = '';
}

function addItemToDOM(item) {
    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red', )
    li.appendChild(button);

    // add li to the DOM
    itemList.appendChild(li);
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

// add item to local storage
function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.push(item);

    // Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// get items from storage
function getItemsFromStorage() {
    let itemsFromStorage;

    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}


// remove item
function removeItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')) {
        
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            checkUI();
        }
        
        // console.log('click');
    };
}

function clearItems(){
    // itemList.innerHTML = '';
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    checkUI()
}

// filter items
function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    //console.log(text)
    items.forEach((item)=> {
        const itemName = item.firstChild.textContent.toLowerCase();

        if(itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
        console.log(itemName);
    })
}

// clear UI
function checkUI() {
 const items = itemList.querySelectorAll('li');
 if(items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
 } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
 }
}

// Initiliaze app
function init() {
    // Event Listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', removeItem);
    clearBtn.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);

    checkUI();
}

init();
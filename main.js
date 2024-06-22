



let btn = document.getElementById("btn");
let inp = document.getElementById("inp");
let boxs = document.querySelectorAll(".box");
let drag = null;
let items = JSON.parse(localStorage.getItem('items')) || [];

loadItems();

btn.addEventListener("click", function(){
    if (inp.value.trim() !== "") {
        let itemValue = inp.value.trim();
        addItem(itemValue);
        inp.value = "";
    }
});

function loadItems(){
    items.forEach(item => {
        addItemToDOM(item);
    });
}

function addItem(itemValue){
    addItemToDOM(itemValue);
    items.push(itemValue);
    localStorage.setItem('items', JSON.stringify(items));
}

function addItemToDOM(itemValue){
    let pItem = document.createElement("p");
    pItem.className = "item";
    pItem.draggable = true;
    pItem.textContent = itemValue;

    let del = document.createElement("span");
    del.innerHTML = "×";
    del.className = "del";
    del.addEventListener("click", function(){
        pItem.remove();
        // Remove item from local storage
        let index = items.indexOf(itemValue);
        if (index !== -1) {
            items.splice(index, 1);
            localStorage.setItem('items', JSON.stringify(items));
        }
    });

    pItem.appendChild(del);
    boxs[0].appendChild(pItem);
}

function dragItem(){
    boxs.forEach(box => {
        box.addEventListener("dragover", function(e){
            e.preventDefault();
            this.style.background = "#090";
            this.style.color = "#fff";
        });
        box.addEventListener("dragleave", function(){
            this.style.background = "#fff";
            this.style.color = "#000";
        });
        box.addEventListener("drop", function(){
            this.appendChild(drag);
            this.style.background = "#fff";
            this.style.color = "#000";
        });
    });

    let items = document.querySelectorAll(".item");
    items.forEach(item => {
        item.addEventListener("dragstart", function(){
            drag = item;
            item.style.opacity = "0.5";
        });
        item.addEventListener("dragend", function(){
            drag = null;
            item.style.opacity = "1";
        });
    });
}

dragItem();











let data = localStorage.getItem("store") === null ? [] : JSON.parse(localStorage.getItem("store"));
console.log(data, " data");

const card_items = document.querySelectorAll(".card_item");

const list_row = document.querySelector("#list_row");
const add_list_form = document.querySelector("#add_list_form");
const add_list_open = document.querySelector(".add_list_open");
const list_value = document.querySelector("#list_value");
const add_list_btn = document.querySelector("#add_list_btn");
const add_list_form_close_btn = document.querySelector("#add_list_form #close_btn");

// create new list item -----------------------------
//create list object
function List(id, title) {
    this.id = id;
    this.title = title;
    this.watched = false;
}

// open new list form
add_list_open.addEventListener("click", () => {
    add_list_open.style.display = "none";
    add_list_form.classList.add("d-block");
    add_list_form.children[0].focus();
});

// close form
add_list_form_close_btn.addEventListener("click", () => {
    add_list_open.style.display = "block";
    add_list_form.classList.remove("d-block");
});

// submit add list form
add_list_form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (list_value.value.trim()) {
        const id = Date.now();
        const title = list_value.value;
        const watched = false;
        const list = new List(id, title, watched);
        data = [...data, list];
        localStorage.setItem("store", JSON.stringify(data));

        createSingleListDOM(list);
        add_list_form.reset();
    } else alert("Please name your list...");
});

// create single list
function createSingleListDOM(list) {
    let watchText = list.watched ? "Watched..." : "Watch";
    let watchClass = list.watched ? "text-primary font-weight-bold" : null;
    let div = document.createElement("div");
    div.classList.add("col-sm-3", "my-3");
    div.innerHTML = `<div class="list_wrapper" id="${list.id}">
           <div class="single_list" ondrop="onDropHandler(event)" ondragover="onDragOverHandler(event)"> 
               <div class="card_title"> ${list.title} <span class="list_actions"> ...</span> </div>
               <div class="add_another_card"> 
                  <span class="add_another_card_title"> + Add another card </span>
                  <form class="add_form" id="add_card_form"> 
                    <input class="form-control card_text" placeholder="Enter card title..."/>
                    <div class="mt-2"> 
                      <button type="submit" class="btn btn-sm btn-success mr-1" job="add_card">Add Card</button>
                      <button type="button" class="btn btn-sm btn-danger close_ac_form">close</button>
                    </div>
                  </form> 
               </div>
               <div class="pop-over list_options">
                  <div class="no-back">
                      <div class="pop-over-header js-pop-over-header">
                        <span class="pop-over-header-title">List Actions</span>
                        <a href="#" class="pop-over-header-close-btn icon-sm icon-close text-danger"> close </a>
                      </div>
                      <div class="pop-over-content">
                          <ul class="pop-over-list">
                              <li><a class="js-add-card" href="#">Add Card…</a></li>
                              <li><a class="js-copy-list" href="#" job="copy_list">Copy List…</a></li>
                              <li><a class="${watchClass}" href="#" 
                              job="watched_list">${watchText} </a></li>
                          </ul>
                          <hr />
                          <ul class="pop-over-list">
                              <li><a class="js-move-cards" href="#" job="move_all_cards">Move All Cards in This List…</a></li>
                              <li><a class="js-archive-cards" href="#" job="archive_all_cards">Archive All Cards in This List…</a></li>
                          </ul>
                          <hr />
                          <ul class="pop-over-list">
                              <li><a class="js-close-list" href="#" job="delete_list">Archive This List</a></li>
                          </ul>
                      </div>
                  </div>
              </div>
              <div class="pop-over moveToOptionss" id="moveToOptions">
                  <div class="no-back">
                      <div class="pop-over-header js-pop-over-header">
                        <a href="#" class="pop-over-header-close-btn icon-sm icon-back text-info" 
                        style="right:82%" job="back_mdrp_btn"> Back </a>
                        <span class="pop-over-header-title">Move All Cards in List</span>
                        <a href="#" class="pop-over-header-close-btn icon-sm text-danger" job="close_mdrp_btn"> close </a>
                      </div>
                      <div class="pop-over-content tt">
                          <ul class="pop-over-list">
                              ${data
                                  .map(
                                      (l, i) => `<li class="move_to_list"><a href="#"  id="${l.id}">
                                ${l.title.charAt(0).toUpperCase() + l.title.slice(1)}</a></li>`
                                  )
                                  .join("")}
                          </ul>
                      </div>
                  </div>
              </div>
           </div>
        </div>`;
    list_row.appendChild(div);

    let cards = list.cards != undefined ? list.cards : [];

    [...list_row.children].map((listItem) => {
        if (listItem.children[0].id == list.id) {
            const elmToPass = listItem.children[0].children[0];
            if (list.cards != undefined) list.cards.map((card) => createCardDOM(elmToPass, card));

            // add current text in move all cards list
            // console.log(elmToPass.children);
            [...elmToPass.children].map((c) => {
                // console.log(c.parentElement.parentElement.id)
                if (c.classList.contains("moveToOptionss")) {
                    [...c.children[0].children[1].children[0].children].map((ml) => {
                        if (c.parentElement.parentElement.id == ml.children[0].id) {
                            ml.children[0].innerHTML += ` (current)`;
                            ml.children[0].style.color = "#ccc";
                            ml.children[0].style.pointerEvents = "none";
                        }
                    });
                }
            });

            listItem.addEventListener("click", (e) => {
                const elem = e.target;

                // open list action on click
                if (elem.classList.contains("list_actions")) {
                    [...elem.parentElement.parentElement.children].map((v) => {
                        if (v.classList.contains("list_options")) v.classList.add("d-block");
                    });

                    const popoverAll = document.querySelectorAll(".list_options");
                    [...popoverAll].map((v) => {
                        if (v.parentElement.parentElement.id != elem.parentElement.parentElement.parentElement.id) {
                            v.classList.add("d-none");
                            v.classList.remove("d-block");
                        }
                    });
                }

                // close list action on click
                if (elem.classList.contains("icon-close")) {
                    elem.parentElement.parentElement.parentElement.classList.remove("d-block");
                }

                // card form open, close and submit
                // open form
                if (elem.classList.contains("add_another_card_title")) {
                    elem.style.display = "none";
                    elem.parentElement.children[1].style.display = "block";
                    elem.parentElement.children[1].children[0].focus();
                }
                // close form
                if (elem.classList.contains("close_ac_form")) {
                    elem.parentElement.parentElement.style.display = "none";
                    elem.parentElement.parentElement.parentElement.children[0].style.display = "block";
                }
                //delete list
                if (elem.getAttribute("job") == "delete_list") {
                    console.log(listItem, "in delete_list");
                    listItem.remove();
                    [...data].map((list, i) => {
                        if (list.id == listItem.children[0].id) {
                            data.splice(i, 1);
                        }
                    });
                    localStorage.setItem("store", JSON.stringify(data));
                }
                //copy list
                if (elem.getAttribute("job") == "copy_list") {
                    const copiedList = { id: Date.now(), title: list.title };
                    data = [...data, copiedList];
                    localStorage.setItem("store", JSON.stringify(data));
                    createSingleListDOM(copiedList);
                }
                //mark as watched list
                if (elem.getAttribute("job") == "watched_list") {
                    elem.className = "text-primary font-weight-bold";
                    elem.textContent = "Watched";
                    [...data].map((list, i) => {
                        if (list.id == listItem.children[0].id) {
                            list.watched = true;
                        }
                    });
                    localStorage.setItem("store", JSON.stringify(data));
                }
                //submit add card form
                if (elem.getAttribute("job") == "add_card") {
                    e.preventDefault();
                    let cardInputVal = elem.parentElement.previousElementSibling.value.trim();
                    if (cardInputVal) {
                        const card = { id: Date.now(), title: cardInputVal };
                        cards = [...cards, card];
                        [...data].map((list, i) => {
                            if (list.id == listItem.children[0].id) {
                                list["cards"] = cards;
                            }
                        });

                        createCardDOM(elmToPass, card);
                        localStorage.setItem("store", JSON.stringify(data));
                        elem.parentElement.previousElementSibling.value = "";
                    } else {
                        alert("Please text add card title...");
                    }
                }
                //move all cards to list dropdown
                const nodeSingleList = listItem.children[0].children[0].children;
                if (elem.getAttribute("job") == "move_all_cards") {
                    [...nodeSingleList].find((c) => c.getAttribute("id") == "moveToOptions").style.display = "block";
                    [...nodeSingleList].find((c) => c.classList.contains("list_options")).classList.remove("d-block");
                }
                //close move cards dropdown
                if (elem.getAttribute("job") == "close_mdrp_btn") {
                    [...nodeSingleList].find((c) => c.getAttribute("id") == "moveToOptions").style.display = "none";
                }
                //Back to list option
                if (elem.getAttribute("job") == "back_mdrp_btn") {
                    [...nodeSingleList].find((c) => c.getAttribute("id") == "moveToOptions").style.display = "none";
                    [...nodeSingleList].find((c) => c.classList.contains("list_options")).classList.add("d-block");
                }
                // archive_all_cards
                const findCurrentList = [...data].find((l) => l.id == listItem.children[0].id);

                if (elem.getAttribute("job") == "archive_all_cards") {
                    const cardsInList = [...nodeSingleList].filter((c) => c.classList.contains("my_card") == true);
                    cardsInList.map((card) => card.remove());

                    findCurrentList.cards.splice(0);
                    localStorage.setItem("store", JSON.stringify(data));
                }
                // delete and move card to list
                const moveOptionPar = [...nodeSingleList].find((c) => c.getAttribute("id") == "moveToOptions");
                const listParent = moveOptionPar.children[0].children[1].children[0];
                [...listParent.children].map((c) => {
                    if (c.children[0].id == elem.id) {
                        console.log(c, "current elem");
                        // remove from DOM
                        const toMoveList = [...document.querySelectorAll(".list_wrapper")].find((lNode) => lNode.id == elem.id);
                        const elmToPass = toMoveList.children[0];
                        movingCards = findCurrentList.cards.splice(0);
                        movingCards.map((card) => createCardDOM(elmToPass, card));

                        const findToMoveList = [...data].find((l) => l.id === Number(elem.id));
                        findToMoveList.cards = [...movingCards, ...findToMoveList.cards];

                        const cardsInList = [...nodeSingleList].filter((c) => c.classList.contains("my_card") == true);
                        cardsInList.map((card) => card.remove());
                        findCurrentList.cards.splice(0);

                        localStorage.setItem("store", JSON.stringify(data));
                    }
                });
            });
        }
    });

    // close list action on click
    const popover = document.querySelector(".list_options");
    popover.addEventListener("click", (e) => {
        if (e.target.classList.contains("icon-close")) {
            e.target.parentElement.parentElement.parentElement.classList.toggle("d-block");
        }
    });
}

// create single card DOM ---------------
function createCardDOM(elem, card) {
    const divTxt = document.createElement("div");
    divTxt.className = "my_card";
    divTxt.innerHTML = `<div id="${card.id}" class="card_item" 
    draggable="true" ondragstart="onDragStartHandler(event)" ondragenter="onDragEnterHandler(event)"
    ondragover="onDragOverHandler(event)" ondragend="onDragEndHandler(event)"> 
    ${card.title} </div>`;
    elem.children[0].after(divTxt);
}

// initial data load ---------------
document.addEventListener("DOMContentLoaded", () => {
    data.map((list) => {
        createSingleListDOM(list);
    });
});


//DRAG AND DROP ----------------
function onDragStartHandler(ev) {
   console.log(ev.target, ' in onDragStartHandler')
   ev.dataTransfer.setData("text", ev.target.id);
   ev.target.classList.add('addone')
}

function onDragEnterHandler(ev) {
   console.log(ev.target, ' in onDragEnterHandler')
   ev.target.classList.add('addtwo')
}


function onDragOverHandler(ev) {
   ev.preventDefault();
}

function onDragLeaveHandler(ev) {
   console.log(ev.target, ' in onDragLeaveHandler')
   ev.dataTransfer.setData("text", ev.target.id);
   ev.target.classList.remove('addtwo')
}

function onDragEndHandler(ev) {
   console.log(ev.target, ' in onDragEndHandler')
   ev.dataTransfer.setData("text", ev.target.id);
   ev.target.classList.remove('addone')
}

function onDropHandler(ev) {
   console.log(ev.target, ' in onDropHandler')
   ev.preventDefault();
   var data = ev.dataTransfer.getData("text");
   ev.target.appendChild(document.getElementById(data));
}

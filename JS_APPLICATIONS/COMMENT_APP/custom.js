const comment_form = document.querySelector("#comment_form");
const reply_form = document.querySelector("#reply_form");
const list_wrapper = document.querySelector("#list_wrapper");
const reply_box = document.querySelector(".reply_box");

let data = localStorage.getItem("commentsStore") == null ? [] : JSON.parse(localStorage.getItem("commentsStore"));

console.log(data, " initial data");

//submit comment form ----------------
comment_form.addEventListener("submit", (e) => {
    e.preventDefault();
    let comment_value = document.getElementById("comment_value").value.trim();
    if (comment_value) {
        const comment = { id: Date.now(), title: comment_value, liked: false };
        createCommentListDOM(null, comment);
        data = [...data, comment];
        localStorage.setItem("commentsStore", JSON.stringify(data));
        document.getElementById("comment_value").value = "";
    } else {
        alert("Please text in the comment box to add comment..");
    }
});

// like and reply and delete comment ----------------
list_wrapper.addEventListener("click", (e) => {
    const elm = e.target;

    if (elm.getAttribute("job") == "like") {
        elm.textContent = elm.textContent.trim() == "Like" ? "Liked +++ " : "Like";
        
        function likeReply(data){
            [...data].map((comm, index) => {
                if (comm.reply) {
                    if (Number(comm.id) === Number(elm.parentElement.id)) comm.liked = !comm.liked;
                    likeReply(comm.reply)
                }

                else{
                    if (Number(comm.id) === Number(elm.parentElement.id)) comm.liked = !comm.liked;  
                }
            });
        }
        likeReply(data);
        console.log(data, ' data after like')

        localStorage.setItem("commentsStore", JSON.stringify(data));
    }


    if (elm.getAttribute("job") == "delete") {
        elm.parentElement.remove();
        
        function deleteReply(data){
            [...data].map((comm, index) => {
                if (comm.reply) {
                    if (Number(comm.id) === Number(elm.parentElement.id))data.splice(index, 1);
                    deleteReply(comm.reply)
                }

                else{
                    if (Number(comm.id) === Number(elm.parentElement.id))data.splice(index, 1); 
                }
            });
        }
        deleteReply(data);
        // console.log(data, ' data after delete')

        localStorage.setItem("commentsStore", JSON.stringify(data));
    }

    if (elm.getAttribute("job") == "reply") {
        reply_box.style.display = "block";
        document.getElementById("reply_value").focus();

        reply_form.onsubmit = function (e) {
            e.preventDefault();
            let reply_value = document.getElementById("reply_value").value;
            const reply = { id: Date.now(), title: reply_value, liked: false };
            createCommentListDOM(elm.parentElement, reply);

            function doing(data) {
                [...data].map( d => {

                    if (d.reply) {
                        if (Number(d.id) === Number(elm.parentElement.id)) {
                            if (d.reply == undefined) d.reply = [reply];
                            else d.reply.push(reply);
                        }
                        doing(d.reply)
                    }

                    else{
                        if (Number(d.id) === Number(elm.parentElement.id)) {
                            if (d.reply == undefined) d.reply = [reply];
                            else d.reply.push(reply);
                        }
                    }


                })
            }

            doing(data);

            localStorage.setItem("commentsStore", JSON.stringify(data));
            reply_form.reset();
        };

    }

    if (elm.getAttribute("job") == "edit") {
        reply_box.style.display = "block";
        document.getElementById("reply_value").value = elm.parentElement.children[0].innerHTML;
        document.getElementById("reply_value").focus();

        reply_form.onsubmit = function (e) {
            e.preventDefault();
            let reply_value = document.getElementById("reply_value").value;

            function editReply(data) {
                elm.parentElement.children[0].innerHTML = reply_value;

                [...data].map( d => {
                    if (d.reply) {
                        if (Number(d.id) === Number(elm.parentElement.id)) {
                            d.title = reply_value
                        }
                        editReply(d.reply)
                    }
                    else{
                        if (Number(d.id) === Number(elm.parentElement.id)) {
                            d.title = reply_value
                        }
                    }
                })
            }

            editReply(data);
            // console.log(data, ' data after edit')
            reply_box.style.display = "none";

            localStorage.setItem("commentsStore", JSON.stringify(data));
            reply_form.reset();
        };

    }

});


// create list UI  ----------------
function createCommentListDOM(pElem, comment) {
    const likedText = comment.liked ? "Liked +++" : "Like";
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.id = comment.id;
    li.innerHTML = `<span> ${comment.title} </span>
     <small class="mx-1 text-primary" job="like"> ${likedText} </small> 
     <small class="mx-1 text-info" job="reply"> Reply</small>
     <small class="mx-1 text-danger" job="delete"> Delete</small>
     <small class="mx-1 text-success" job="edit"> Edit</small>`;
    pElem == null ? list_wrapper.appendChild(li) : pElem.appendChild(li);
}

// close reply form --------------
document.querySelector("#reply_form_close").addEventListener("click", () => {
    reply_box.style.display = "none";
});



// Initial DOM render ----------------
let inHTML = [];
function listDOMonIniLoad(comment) {
    const likedText = comment.liked ? "Liked +++" : "Like";
    inHTML.push(`<li class="list-group-item" id="${comment.id}"> 
     <span> ${comment.title} </span>  
     <small class="mx-1 text-primary" job="like"> ${likedText} </small> 
     <small class="mx-1 text-info" job="reply"> Reply</small>
     <small class="mx-1 text-danger" job="delete"> Delete</small>
     <small class="mx-1 text-success" job="edit"> Edit</small>`);
}

document.addEventListener("DOMContentLoaded", () => {
    iterateData(data);
    list_wrapper.innerHTML = inHTML.join("");
});

function iterateData(arr) {
    inHTML.push("<ul>");
    arr.map((v) => {
        listDOMonIniLoad(v);
        if (v.reply) {
            return iterateData(v.reply);
        }
        inHTML.push("</li>");
    });
    inHTML.push("</ul>");
}

// close pop-up on click outside ------
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("reply_box")) {
        reply_box.style.display = "none";
    }
});

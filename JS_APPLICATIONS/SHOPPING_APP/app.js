let myCartBtnSelector = document.querySelector('#my_cart_btn')
let myCartDropdwnSelector = document.querySelector('#my_cart_container')
let prodsRowSel = document.querySelector('#prods_row')


// shopping data ------------------
const products = [
	{id:1, name: 'round chair', price:22, fav:false, incart: false, removefromcart: false},
	{id:2, name: 'Cieling fan', price:34, fav:false, incart: false, removefromcart: false},
	{id:3, name: 'Almirah set', price:50, fav:false, incart: false, removefromcart: false},
	{id:4, name: 'washing mac', price:33, fav:false, incart: false, removefromcart: false},
	{id:5, name: 'hanging lig', price:56, fav:false, incart: false, removefromcart: false}
]


// store products to local storage ---------
const data = (localStorage.getItem("dataFromStore") === null)? [...products] : JSON.parse(localStorage.getItem('dataFromStore'))

 const getAllProductsFunc = (data) =>{
 	const getAllProducts = data;
 	getAllProducts.forEach((prod, index) => loadProducts(prod))
 	return getAllProducts;
 }

document.addEventListener('DOMContentLoaded',getAllProductsFunc(data))



// Toggle My Cart Dropdown ---------------
myCartBtnSelector.addEventListener('click', ()=> {
  myCartDropdwnSelector.classList.toggle('d-none')
})


// show product item ---------------
function loadProducts(prod){
	let favourite = prod.fav ? 'fill_fav' : '';
	const prod_div = document.createElement('div');
	prod_div.classList.add('col-sm-3');
	const appendEle = prodsRowSel.appendChild(prod_div);
	appendEle.innerHTML = `
        <div class="single_product" id="${prod.id}">
   			<div class="add_pro" job="add"> + </div>
   			<div class="add_favourite ${favourite}" title="mark as favourite" job="fav" id="${prod.id}"> </div>
     		<div class="pro_img"> <img src="img/pro1.jpg" /> </div>
     		<div class="pro_title">  
     		   <span> ${prod.name}</span> 
     		   <span> $${prod.price} </span> 
     		</div>
     	</div>`
}


// add product to cart ---------------
let getAllCartItems = [...data].filter(list => list.incart === true)
let numOfItem = getAllCartItems.length;
let totalCartPrice = (getAllCartItems.length > 0) ? getAllCartItems.reduce((acc,cv)=> acc + cv.price,0): 0;
let prods_row = document.querySelector('#prods_row');
document.getElementById('cartItemNumber').innerHTML = numOfItem;
document.getElementById('total_amount').innerHTML = totalCartPrice;

const addToCart = (cData) => {
			const cartLi = document.createElement('li');
			cartLi.innerHTML = `<span class="item_img"> <img src="img/pro1.jpg" class="mr-3" />
			 ${cData.name} </span>  
			 <span>$${cData.price} </span>
			 <span class="text-danger" job="delete" id="${cData.id}"> X </span>
			 `
			myCartDropdwnSelector.insertBefore(cartLi, myCartDropdwnSelector.childNodes[0]);
}

(function loadCartData (){
    getAllCartItems.forEach((val)=> addToCart(val))
})()

prods_row.addEventListener('click', (e)=>{
	let element = e.target;
	if(element.getAttribute('job') == 'add') {
		let checkCartItem = [...data].filter(list => list.incart === true).some(i=> i.id == element.parentElement.id)
		if(!checkCartItem){
			let getCartItem = [...data].find(v => v.id == element.parentElement.id);
			addToCart(getCartItem);
			numOfItem++;
			document.getElementById('cartItemNumber').innerHTML = numOfItem;
			totalCartPrice += getCartItem.price;
			document.getElementById('total_amount').innerHTML = totalCartPrice;
			data.forEach( val=>{if(val.id === Number(element.parentElement.id)){ val.incart = true}});
		    localStorage.setItem('dataFromStore', JSON.stringify(data));
		}
		else alert('This item is already in cart, Please add another...')
	}; 

	if(element.getAttribute('job') == 'fav') markAsFav(element); 
})



// delete product from cart ---------------
const deleteFromCart = (elem) => elem.parentElement.remove()	

myCartDropdwnSelector.addEventListener('click', (e)=>{
	let element = e.target;
	if(element.getAttribute('job') == 'delete'){
		deleteFromCart(element)
		numOfItem--;
		document.getElementById('cartItemNumber').innerHTML = numOfItem;
		totalCartPrice -= getCartItem.price;
		document.getElementById('total_amount').innerHTML = totalCartPrice;
		data.forEach((val)=>{if(val.id === Number(element.id)){ val.incart = false; val.removefromcart = true}});
	    localStorage.setItem('dataFromStore', JSON.stringify(data))
	}; 
})


// mark item as favourite   ---------------
function markAsFav(elem){
	elem.classList.toggle('fill_fav');
	data.forEach((val,ind)=>{
		if(val.id === Number(elem.id)){ val.fav = !val.fav}
	});
    localStorage.setItem('dataFromStore', JSON.stringify(data))
}



// Serchbar start here   ---------------
(function searchList(){
	const search_list = document.querySelector('#search_list');
	data.forEach(list =>{
		const createLi = document.createElement('li');
		createLi.innerHTML = `<span> ${list.name} </span>`
		search_list.insertBefore(createLi, search_list.childNodes[0])
	})
	search_list.style.display = 'none';

	const inputSel = document.querySelector('#search_id');
	inputSel.addEventListener('keyup',()=> {
	    search_list.style.display = 'block';
		let searchValue = inputSel.value.toLowerCase().replace(/ /g,'');
		const li_item = Array.from(search_list.children);
		li_item.forEach(li=>{
			if(li.innerText.toLowerCase().replace(/ /g,'').indexOf(searchValue) > -1){
				li.style.display = 'block';
				li.onclick = ()=> {
					inputSel.value = li.innerText;
					li.parentElement.style.display = 'none'
				}
			}
			else{li.style.display = 'none' }
		})
	})

})()


// filter on go btn click  -------------
const goBtnSel = document.getElementById('search_btn');
goBtnSel.addEventListener('click', ()=> {
	if(document.querySelector('#search_id').value !== '') searchOnGo()
})

function searchOnGo(){
	let filterVal = document.querySelector('#search_id').value.toLowerCase().replace(/ /g,'')
	const allcards = Array.from(document.querySelectorAll('.single_product'))
	allcards.forEach(card => {
		let titleText = card.children[3].children[0].innerText.toLowerCase().replace(/ /g,'')
		if(titleText !== filterVal) card.parentElement.remove()
	})
}

// sort by products -------------

let sort_by = document.querySelector('#sort_by')
sort_by.addEventListener('change', (e)=> {
	let element = e.target;
	if(element.value !== 'null') sortByFunc(element)
})

function sortByFunc(elem){
	if(elem.value === 'bytitle'){
		data.sort((a, b)=> {
			let x = a.name.toLowerCase()
			let y = b.name.toLowerCase()
			if(x < y) return -1
			if(x > y) return 1
			return 0
		})
		const allcards = Array.from(document.querySelectorAll('.single_product'))
		allcards.forEach(card => {card.parentElement.remove() })
		getAllProductsFunc(data)
	}
	if(elem.value === 'favourite'){
		data.sort((a, b)=> {
			let x = a.fav
			let y = b.fav
			if(x < y) return 1
			if(x > y) return -1
			return 0
		})
		const allcards = Array.from(document.querySelectorAll('.single_product'))
		allcards.forEach(card => {card.parentElement.remove() })
		getAllProductsFunc(data)
	}
	if(elem.value === 'byprice'){
		const d1 = data.sort((a, b)=> {
			let x = a.price
			let y = b.price
			return x-y
		})
		const allcards = Array.from(document.querySelectorAll('.single_product'))
		allcards.forEach(card => {card.parentElement.remove() })
		getAllProductsFunc(d1)
	}
}
















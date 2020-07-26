
class UI{
	constructor(){
		this.budget_form = document.querySelector('#budget_form');
		this.expense_form = document.querySelector('#expense_form');
		this.budget_input = document.getElementById('budget_input');
		this.budget_submit = document.getElementById('budget_submit');
		this.expense_input = document.getElementById('expense_input'); 
		this.budget_value = document.getElementById('budget_value'); 
		this.expense_name = document.getElementById('expense_name'); 
		this.expense_value = document.getElementById('expense_value'); 
		this.total_value = document.getElementById('total_value'); 
		this.expense_list = document.querySelector('#expense_list');
		this.expenseList = (localStorage.getItem('data') === null)? []:JSON.parse(localStorage.getItem('data'));
	}

	// submit budget form function ---------
	loadData(){
		this.expenseList.map(item => this.addExpense(item) )
	}

	// submit budget form function ---------
	submitBudgetForm(){
		if(this.budget_input.value == '' || this.budget_input.value < 0) alert ('Add some budget value')
		else {
			this.budget_value.innerHTML = `$${this.budget_input.value}`;
			localStorage.setItem('budget', this.budget_input.value)
			this.budget_input.value = ''
		}
	}

	// Expense budget form function ---------
	submitExpenseForm(){
		let findExp = this.expenseList.some(v=> v.name.toLowerCase() === this.expense_name.value.toLowerCase())
		if(this.expense_name.value == '' || this.expense_input.value == '' || this.expense_input.value < 0){ 
		 alert ('Add some expense name and value')
		}
		else if(findExp){
			alert ('Expense is already in the list, Please add other.')
			this.expense_input.value = this.expense_name.value = ''
		}
		else {
		    let id = Date.now()
			const singleExpense = {id:id, name:expense_name.value, value:expense_input.value}

			this.addExpense(singleExpense)
			this.expense_value.innerHTML = `$${this.expense_input.value}`
			this.expense_input.value = this.expense_name.value = ''
			this.expenseList.push(singleExpense);
		    const expAm = this.totalExpenseAmount()
			this.expense_value.innerHTML = expAm;
			this.total_value.innerHTML = Number(this.budget_value.innerHTML) - expAm;
			localStorage.setItem('data',JSON.stringify(this.expenseList))
		}
	}

	// Add Expense function ------- ---------
	addExpense(item){
		let liNode = document.createElement('li');
		liNode.classList.add('list-group-item');
		liNode.innerHTML = `
		    <div id="${item.id}">
		    	<span class="mr-2"> ${item.name} </span> <span> ${item.value} </span> 
	            <div>
	              <span class="text-primary text-sm mr-2" job="edit"> Edit</span>
	              <span class="text-danger text-sm" job="delete"> Delete</span>
	            </div> 
            </div>
		     `
		this.expense_list.append(liNode);
	}

	// delete Expense function ------- ---------
	deleteExpense(element){
		let elemId = Number(element.parentElement.parentElement.id)
		this.expenseList.map((v,i)=> {
			if(v.id === elemId) {
				element.parentElement.parentElement.parentElement.remove();
				this.expenseList.splice(i,1);
			}
		})
		const expAm = this.totalExpenseAmount()
		this.expense_value.innerHTML = expAm;
		this.total_value.innerHTML = Number(this.budget_value.innerHTML) - expAm;
		localStorage.setItem('data',JSON.stringify(this.expenseList))
	}

	// Edit Expense function ------- ---------
	editExpense(element){		
		let elemId = Number(element.parentElement.parentElement.id)
		this.expenseList.map((v,i)=> {
			if(v.id === elemId) {
				this.expense_name.value = v.name;
				this.expense_input.value = v.value;
				document.getElementById('expense_submit').style.display = 'none'
				document.getElementById('expense_save').style.display = 'block'
			}
		})
	}

	// Edit Expense function ------- ---------
	saveEditExpense(){
		let self = this
 		console.log(self,'saveEditExpense');
 		document.getElementById('expense_name').value = ''
 		document.getElementById('expense_input').value = ''
		document.getElementById('expense_submit').style.display = 'block'
		document.getElementById('expense_save').style.display = 'none'
	}

	// Total Expense count function ------- ---------
	totalExpenseAmount(){
		let expAmount = this.expenseList.reduce((acc, curr)=> {
			return acc + Number(curr.value);
		},0)
		return expAmount;
	}



	
}

const ui = new UI();
// load ui on window load ---------
document.addEventListener('DOMContentLoaded', ()=>{
	ui.loadData();
	this.budget_value.innerHTML = (localStorage.getItem('budget') === null) ? 0 : `${localStorage.getItem('budget')}`
	this.total_value.innerHTML = Number(this.budget_value.innerHTML) - ui.totalExpenseAmount();
	this.expense_value.innerHTML = ui.totalExpenseAmount();

})

// submit budget form handler ---------
budget_form.addEventListener('submit', (e) => {
		e.preventDefault();
		ui.submitBudgetForm()
})

// submit budget form handler ---------
expense_form.addEventListener('submit', (e) => {
		e.preventDefault();
		ui.submitExpenseForm()
})

// edit and delete expense from list handler ---------
expense_list.addEventListener('click', e => {
	let elem = e.target;
	if(elem.getAttribute('job') === 'delete'){
		ui.deleteExpense(elem)
	}
	if(elem.getAttribute('job') === 'edit'){
		ui.editExpense(elem)
	}
})

// save edited expense handler ----------
document.querySelector('#expense_save').addEventListener('click', ui.saveEditExpense)







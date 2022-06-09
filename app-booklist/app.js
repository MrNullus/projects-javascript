//* Book Class: Represents a Book
class Book {
	
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}

}

//* UI Class: Handler UI Tasks	
class UI {

	static displayBooks() {
		const books = Store.getBooks();

		books.forEach((book) => UI.addBooksToList(book));
	}

	static addBooksToList(book) {
		const list = document.querySelector("#book-list");

		const row = document.createElement("tr");
		row.innerHTML = `
		<td>${book.title}</td>
		<td>${book.author}</td>
		<td>${book.isbn}</td>
		<td>
			<a href="#" class="btn btn-danger btn-sm delete">
				X
			</a>
		</td>
		`;

		list.appendChild(row);
	}

	static showAlert(message, className) {
		const container = document.querySelector(".container");
		const form = document.querySelector("#book-form");	
		const div = document.createElement('div');
		const text = document.createTextNode(message);

		div.className = `alert alert-${className}`;
		div.appendChild(text);

		container.insertBefore(div, form);

		// Limpo em 3 segundos
		setTimeout(document.querySelector('.alert').remove(), 3000);
	}

	static deleteBook(el) {
		if (el.classList.contains('delete')) {
			el.parentElement.parentElement.remove();
		}
	}

	static clearFields() {
		document.querySelector("#title").value = "";
		document.querySelector("#author").value = "";
		document.querySelector("#isbn").value = "";
	}

}

//* Store Class: Handles Storage
class Store {
	static getBooks() {
		let books;

		if (localStorage.getItem('books') === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem('books'));
		}

		return books;
	}

	static addBook(book) {
		const books = Store.getBooks();

		books.push(book);

		localStorage.setItem('books', JSON.stringify(books));
	}

	static removeBook(isbn) {
		const books = Store.getBooks();

		books.forEach((book, index) => {
			if (book.isbn === isbn) {
				books.splice(index, 1);
			}
		});

		localStorage.setItem('books', JSON.stringify(books));
	}
}

//* Event: Exibir Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//* Event: Add a Book
document.querySelector("#book-form").addEventListener('submit', (e) => {
	// Prevenir atual submit
	e.preventDefault();

	// Pegar valores do form
	const title = document.querySelector('#title').value;
	const author = document.querySelector('#author').value;
	const isbn = document.querySelector('#isbn').value;
	
	// Validar
	if (title === '' || author === '' || isbn === '') {	
		UI.showAlert('Por favor preencha todos os campos!', 'danger');

	} else {
		// Instanciar (class) Books 
		const book = new Book(title, author, isbn);

		// Adcionar Book na UI
		UI.addBooksToList(book);

		// Adicionar Book no Store
		Store.addBook(book);

		// Mostrar mensagem de sucesso
		UI.showAlert('Livro adicionado!', 'success');

		// Limpar Campos
		UI.clearFields();
	}
});

//* Event: Remove a Book
document.querySelector("#book-list").addEventListener('click', (e) => {
	// Deletar livro da UI
	UI.deleteBook(e.target);

	// Remover Bookde Store
	Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

	// Mostrar mensagem de remoção de livro
	UI.showAlert('Livro removido', 'success');
});

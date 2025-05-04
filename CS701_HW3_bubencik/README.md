# Homework 3 – AngularJS Shopping Cart Application
This project consists of building a Shopping Cart application using AngularJS. The app allows users to manage a shopping cart, including adding, editing, removing items, and storing cart data in localStorage. The project is broken down into three parts, each progressively adding more functionality.

## [Part 1 – AngularJS Shopping Cart with Module and Controller](./part1/part1.html)
### Overview
A shopping cart application using AngularJS's module and controller approach. The app allows you to manage a list of books, with the ability to edit the title, quantity, and unit price, as well as add/remove books from the cart.

### Features
- Editable fields for title, quantity, and unit price

- Line total for each book and an order total for all books, which updates dynamically

- Remove button to delete books from the cart

- New button to add a new book to the cart with default values

- Save button stores the cart in localStorage under the key bubencik_cart

- Load cart data from localStorage if available, or use default books if no saved data is found


## [Part 2 – AngularJS Shopping Cart with Component](./part2/part2.html)
### Overview
In this part, you will refactor the shopping cart app to use AngularJS components. Specifically, you will create a <cart-list></cart-list> component to manage the display and behavior of the shopping cart.

### Features
- Same functionality as Part 1 (editable fields, remove items, add new items, save to localStorage)

- Component-based approach for better modularity and reuse


## [Part 3 – Undo/Redo Functionality for Shopping Cart](./part3/cart-list.html)
### Overview
In this part, Undo/Redo functionality is added to the shopping cart. This will allow users to revert (undo) or reapply (redo) changes made to the cart, such as adding/removing books.

### Features
- Undo action to revert the last add/remove operation

- Redo action to reapply the last undone operation

- Uses a stack to keep track of changes and allows for seamless navigation between states



## How to Run
- Clone or download this repository.

- Open the [index.html](./index.html) file and click on a part

- Test the shopping cart’s functionality, including adding/removing books, editing, saving/loading from localStorage, and using the undo/redo features.

## Technologies Used
- AngularJS

- HTML5 and CSS3

- localStorage for data persistence


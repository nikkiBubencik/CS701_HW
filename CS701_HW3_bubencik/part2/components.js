angular.module("myApp", [])
  .component("cartList",{
    templateUrl: 'cart-list.html',
    controller: function CartControler() {
      const defaultBooks = [
        {title: 'Absolute Java',    
            qty: 1, price: 114.95},
        {title: 'Pro HTML5',        
            qty: 1, price: 27.95},
        {title: 'Head First HTML5', 
            qty: 1, price: 27.89}
      ];
      const book_key = "bubencik_cart";
      this.books = JSON.parse(localStorage.getItem(book_key)) || defaultBooks;

      this.saveBooks = function() {
        console.log("Saving to Local Storage...");
        localStorage.setItem(book_key, JSON.stringify(this.books));
      }

      this.removeBook = function(index) {
        this.books.splice(index, 1);
        this.updateTotalCost();

      }
      this.addBook = function() {
        this.books.push(
          {
            title: "New Book",
            qty: 1,
            price: 10.99
          });
          this.updateTotalCost();
      }

      this.totalCost = 0;
      this.updateTotalCost = function() {
        this.totalCost = this.books.reduce(function(total, book) {
          return total + (book.price * book.qty);
        }, 0);
      }

      this.count = 0;
      this.updateBookCount = function() {
          console.log("updateBookCount...", this.books);
          this.count = this.books.length;
          this.updateTotalCost();
      }
      
      this.$onInit = function() {
          console.log("Starting");
          this.updateBookCount();
      };
  }
});
function CartControler($scope) {
    const defaultBooks = [
      {title: 'Absolute Java',    
          qty: 1, price: 114.95},
      {title: 'Pro HTML5',        
          qty: 1, price: 27.95},
      {title: 'Head First HTML5', 
          qty: 1, price: 27.89}
    ];
    const book_key = "bubencik_cart";
    $scope.books = JSON.parse(localStorage.getItem(book_key)) || defaultBooks;

    $scope.saveBooks = function() {
      console.log("Saving to Local Storage...");
      localStorage.setItem(book_key, JSON.stringify($scope.books));
    }

    $scope.removeBook = function(index) {
      $scope.books.splice(index, 1);
    }
    $scope.addBook = function(index) {
      $scope.books.push(
        {
          title: "New Book",
          qty: 1,
          price: 10.99
        });
    }

    $scope.totalCost = 0;
    $scope.updateTotalCost = function() {
      $scope.totalCost = $scope.books.reduce(function(total, book) {
        return total + (book.price * book.qty);
      }, 0);
    }

    $scope.count = 0;
    $scope.updateBookCount = function() {
        console.log("updateBookCount...", $scope.books);
        $scope.count = $scope.books.length;
        $scope.updateTotalCost();
    }
    
    $scope.$watch('books', function() {
        $scope.updateBookCount();
    }, true)
  }
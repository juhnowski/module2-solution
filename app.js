(function () {
'use strict';

angular.module('ControllerAsApp', [])
.controller('ShoppingListController', ShoppingListController)
.controller('BoughtListController', BoughtListController)
.factory('ShoppingListFactory', ShoppingListFactory)
.factory('BoughtListFactory', BoughtListFactory);

// LIST #1 - controller
ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory) {
  var list1 = this;

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory();

  list1.items = shoppingList.getItems();

  list1.itemName = "";
  list1.itemQuantity = "";

  list1.addItem = function () {
    shoppingList.addItem(list1.itemName, list1.itemQuantity);
  }

  list1.removeItem = function (itemIndex) {
    shoppingList.removeItem(itemIndex);
  };

  list1.isEmpty = function () {
    console.log("ShoppingListController list1.isEmpty");
    return shoppingList.isEmpty();
  }
}


// LIST #2 - controller
BoughtListController.$inject = ['BoughtListFactory'];
function BoughtListController(BoughtListFactory) {
  var list2 = this;

  // Use factory to create new shopping list service
  var boughtList = BoughtListFactory();

  list2.items = boughtList.getItems();

  list2.itemName = "";
  list2.itemQuantity = "";

  list2.addItem = function () {
    try {
      boughtList.addItem(list2.itemName, list2.itemQuantity);
    } catch (error) {
      list2.errorMessage = error.message;
    }

  }

  list2.isEmpty = function () {
    return boughtList.isEmpty();
  }
}


// If not specified, maxItems assumed unlimited
function ShoppingListService() {
  var shoppingService = this;

  // List of shopping items
  var items = [
    {name:"Milk", quantity:"2 bottle"},
    {name:"Chees", quantity:"200 gramm"},
    {name:"Oil", quantity:"1 bottle"}
  ];

  shoppingService.addItem = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
  };

  shoppingService.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  shoppingService.getItems = function () {
    return items;
  };

  shoppingService.isEmpty = function(){
    console.log("shoppingService.isEmpty");
    console.log("ShoppingListService():",items.length);
    console.log("ShoppingListService():",items);
    return items.length == 0;
  };
}

function BoughtListService() {
  var boughtService = this;

  // List of bought items
  var items = [];

  boughtService.addItem = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
  };

  boughtService.getItems = function () {
    return items;
  };

  boughtService.isEmpty = function(){
    console.log("BoughtListService:",items.length);
    console.log("BoughtListService:",items);
    return items.length == 0;
  };
}

function ShoppingListFactory() {
  var shoppingFactory = function () {
    return new ShoppingListService();
  };

  return shoppingFactory;
}

function BoughtListFactory(){
  var boughtFactory = function (){
    return new BoughtListService();
  }
  return boughtFactory;
}

})();

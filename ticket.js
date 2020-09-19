function ready() {
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  // To generate 2 dimensional array of random numbers
  function rawTicket() {
    var arr = [];
    for (i = 1; i <= 90; i += 10) {
      var subArr = [];
      while (subArr.length != 3) {
        var r = getRandomArbitrary(i, i + 9);
        if (subArr.indexOf(r) === -1) subArr.push(r);
      }
      subArr.sort((a, b) => a - b);
      var arr = [...arr, [...subArr]];
    }
    return arr;
  }

  //Get indexes to delete values in a row
  function deleteRandomFour() {
    var elementsToDelete = [];
    while (elementsToDelete.length != 4) {
      var d = getRandomArbitrary(0, 9);
      if (elementsToDelete.indexOf(d) === -1) elementsToDelete.push(d);
    }
    elementsToDelete.sort((a, b) => a - b);
    return elementsToDelete;
  }

  //Removes elements from Array
  function processTicket(arr) {
    do {
      var row1 = deleteRandomFour();
      var row2 = deleteRandomFour();
      var row3 = deleteRandomFour();

      //To check wheather final ticket will be valid or not
      flag = true;
      row1.forEach((e) => {
        if (row2.includes(e) && row3.includes(e)) {
          flag = false;
        }
      });
    } while (!flag);

    row1.forEach((e) => {
      arr[e][0] = "";
    });
    row2.forEach((e) => {
      arr[e][1] = "";
    });
    row3.forEach((e) => {
      arr[e][2] = "";
    });
  }

  // Formats Array into Table Format for easy use
  function createTicketArr() {
    var firstRow = [];
    var secondRow = [];
    var thirdRow = [];
    for (i = 0; i < 9; i++) {
      firstRow[i] = arr[i][0];
      secondRow[i] = arr[i][1];
      thirdRow[i] = arr[i][2];
    }
    return [[...firstRow], [...secondRow], [...thirdRow]];
  }

  // To generate final Ticket
  arr = rawTicket();
  finalArr = createTicketArr(processTicket(arr));

  //--------------------------------------------------------------------------------------------
  //                                       TO CREATE TABLE
  //--------------------------------------------------------------------------------------------

  function generateTable(table, data) {
    for (let element of data) {
      let row = table.insertRow();
      for (key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  }
  let table = document.querySelector("table");
  generateTable(table, finalArr);
}

//Loads first ticket on page load
ready();

//Replaces old ticket with new ticket
function newTicket() {
  let table = document.querySelector("table");
  table.removeChild(table.firstChild);
  ready();
}

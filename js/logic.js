const calc_display = document.querySelector(".calc-display");
const calc_keys = document.querySelector(".calc-keys");

const calc = {
  // default display Text
  display_text: "",

  // calculator operations
  '+': function() {return this.a + this.b},
  '-': function() {return this.a - this.b},
  '*': function() {return this.a * this.b},
  '/': function() {return this.a / this.b},

  // calculate
  operate: function() {
    this.display_text = this[this.op]();
  },

  // print to display
  print: function() {
    calc_display.textContent = this.display_text;
  }
};

// ui

function getGrid(keys, count, class_name) {
  const cell_container = document.createDocumentFragment();

  for (let index = 0; index < count; index ++) {
    const cell = document.createElement("div");
    cell.textContent = keys[index];
    cell.setAttribute("class", class_name + " align-center");

    cell_container.appendChild(cell);
  }

  return cell_container;
}

// number keys
const num_keysArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', '-'];
const num_keys = getGrid(num_keysArray, 12, "num-key");

const num_keyBack = calc_keys.querySelector(".num-keys");
num_keyBack.appendChild(num_keys);

// symbol keys
const symbol_keysArray = ['+', '-', '*', '/'];
const symbol_keys = getGrid(symbol_keysArray, 4, "symbol-key");

const symbol_keyBack = calc_keys.querySelector(".symbol-keys");
symbol_keyBack.appendChild(symbol_keys);

// special keys

const special_keysArray = [' ', ' ', ' ', '='];
const special_keys = getGrid(special_keysArray, 4, "special-key");

const special_keyBack = calc_keys.querySelector(".special-keys");
special_keyBack.appendChild(special_keys);

// event listeners
function addToDisplay(e) {
  const target = e.target;

  switch (target.classList[0]) {
    case "num-key":
      calc.display_text += target.textContent;
      calc.print();
      break;

    case "symbol-key":
      // set operand 1 (numeric)
      calc.a = +calc.display_text;

      calc.display_text = target.textContent;
      calc.print();

      // set operator
      calc.op = calc.display_text;
      calc.display_text = "";
      break;

    case "special-key":
      // set operand 2 (numeric)
      calc.b = +calc.display_text;

      // result
      calc.operate();
      calc.print();
  }
}

calc_keys.addEventListener("click", addToDisplay);
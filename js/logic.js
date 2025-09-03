const calc_display = document.querySelector(".calc-display");
const calc_keys = document.querySelector(".calc-keys");

const calc = {
  // output display text content
  display_text: "",

  // pervent accidental clicks
  disable_numpad: false,
  disable_symbol: false,

  // calculator operations
  '+': function() {return this.a + this.b},
  '-': function() {return this.a - this.b},
  '*': function() {return this.a * this.b},
  '/': function() {return this.a / this.b},

  // calculate
  operate: function() {
    return this[this.op]();
  },

  // print to display
  print: function() {
    calc_display.textContent = this.display_text;
  }
};

// UI

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

// Event Listeners

// combine multiple number-characters
let operand = "";

function getUserInput(e) {
  const target = e.target;

  switch (target.classList[0]) {
    case "num-key":
      const num_key = target.textContent;

      operand = operand + num_key;

      calc.display_text = calc.display_text + num_key;
      calc.print();

      break;

    case "symbol-key":
      if (calc.disable_symbol) return;

      const symbol_key = target.textContent;

      // set operator
      calc.op = symbol_key;

      // set operand 1
      calc.a = +operand;

      // empty operand to add next operand
      operand = "";

      calc.display_text = `${calc.display_text} ${calc.op} `;
      calc.print();

      calc.disable_symbol = true;

      break;

    case "special-key":
      // set operand 2
      calc.b = +operand;

      calc.display_text = calc.display_text + calc.b;
      calc.print();

      // get operand 1
      operand = calc.operate();

      calc.display_text = operand;
      calc.print();

      calc.disable_symbol = false;

      break;
  }
}

calc_keys.addEventListener("click", getUserInput);
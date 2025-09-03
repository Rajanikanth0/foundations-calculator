const calc_display = document.querySelector(".calc-display");
const calc_keys = document.querySelector(".calc-keys");

const calc = {
  a: "", op: "", b: "",
  // output display text content
  display_text: "",

  // pervent accidental clicks
  disable_numpad: false,
  disable_symbol: false,
  disable_special: true,

  // calculator operations
  '+': function() {return +this.a + +this.b},
  '-': function() {return +this.a - +this.b},
  '*': function() {return +this.a * +this.b},
  '/': function() {return +this.a / +this.b},

  // calculate
  operate: function() {
    const total = this[this.op]();
    return +total.toFixed(2);
  },

  // print to display
  print: function() {
    calc_display.textContent = `${this.a} ${this.op} ${this.b}`;
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
let operand = "";
let first_operand = true;

function getUserInput(e) {
  const target = e.target;

  switch (target.classList[0]) {
    case "num-key":
      if (calc.disable_numpad) return;
      
      operand = operand + target.textContent;

      // operand choice
      if (first_operand) {
        calc.a = operand;
      } else {
        calc.b = operand;
      }

      calc.print();
      break;

    case "symbol-key":
      const key = target.textContent;

      if (first_operand) {
        const options = ["", "-", "+"];

        if ( options.includes(calc.a) ) {
          if ( options.includes(key) ) {
            operand = key;
            // to print on display
            calc.a = key;

            calc.print();
          }
          return;
        }
      }

      if (calc.disable_symbol) return;

      calc.op = key;
      // assign to next operand
      operand = ""; first_operand = false;

      calc.disable_symbol = true;
      calc.disable_numpad = false;

      calc.print();
      break;

    case "special-key":
      if (calc.b == "") return;

      // reset all values
      calc.a = calc.operate();
      calc.op = calc.b = "";

      calc.disable_symbol = false;
      calc.disable_numpad = true;

      calc.print();
      break;
  }
}

calc_keys.addEventListener("click", getUserInput);
const calc_display = document.querySelector(".calc-display");
const calc_keys = document.querySelector(".calc-keys");

const calc = {
  // default display Text
  display_text: "",
  clear: false,
  already: false,

  // calculator operations
  '+': function() {return this.a + this.b},
  '-': function() {return this.a - this.b},
  '*': function() {return this.a * this.b},
  '/': function() {return this.a / this.b},

  // calculate
  operate: function() {
    const [a, op, b] = this.display_text.trimEnd().split(' ');
    
    if (b == undefined) return;

    // get operand 1, operator, operand 2
    this.a = +a; this.op = op; this.b = +b;

    this.display_text = String( this[this.op]() );

    this.print();
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
      if (calc.clear) break;

      calc.display_text += target.textContent;
      calc.print();

      calc.already = false;
      break;

    case "symbol-key":
      if (calc.already) break;

      calc.display_text += ' ';

      calc.display_text += target.textContent;
      calc.print();

      calc.display_text += ' ';

      calc.clear = false;
      calc.already = true;
      break;

    case "special-key":
      // result
      calc.operate();
      calc.print();
      
      calc.clear = true;
      calc.already = false;
  }
}

calc_keys.addEventListener("click", addToDisplay);
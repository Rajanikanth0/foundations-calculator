const calc = {
  // calculator operations
  calc_funs: {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b
  },

  operate: function(a, op, b) {
    // call operations on oparands with numeric convertion
    return this.calc_funs[op](+a, +b);
  }
};

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

const calc_keys = document.querySelector(".calc-keys");

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

const special_keysArray = ['Clear', ' ', ' ', '='];
const special_keys = getGrid(special_keysArray, 4, "special-key");

const special_keyBack = calc_keys.querySelector(".special-keys");
special_keyBack.appendChild(special_keys);
const cal = {
  // calculator operations
  cal_funs: {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b
  },

  operate: function(a, op, b) {
    // call operations on oparands with numeric convertion
    return this.cal_funs[op](+a, +b);
  }
};

// add keypad grid
function getGrid(keys, count, class_name) {
  const cell_container = document.createDocumentFragment();

  for (let index = 0; index < count; index ++) {
    const cell = document.createElement("div");
    cell.textContent = keys[index];
    cell.setAttribute("class", class_name);

    cell_container.appendChild(cell);
  }

  return cell_container;
}

const num_keysArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', '-'];
const num_keys = getGrid(num_keysArray, 12, "num-key");
const num_keyBack = document.querySelector(".num-keys");
num_keyBack.appendChild(num_keys);
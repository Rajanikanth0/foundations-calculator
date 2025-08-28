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
function getGrid() {
  const cell_container = document.createDocumentFragment();
  const num_keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', '-'];

  for (let index = 0; index < 12; index ++) {
    const cell = document.createElement("div");
    cell.textContent = num_keys[index];
    cell.setAttribute("class", "num-key");

    cell_container.appendChild(cell);
  }

  return cell_container;
}

const num_keys = getGrid();
const num_keyBack = document.querySelector(".num-keys");
num_keyBack.appendChild(num_keys);
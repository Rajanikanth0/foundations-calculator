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
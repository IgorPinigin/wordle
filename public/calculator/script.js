import { findDivergence, isFloat } from "./modules/calcMethods.js";

const exerciseNode = document.getElementById("numbers-row");
const equalsNode = document.getElementById("equal-row");
const buttons = document.querySelectorAll(`button`);
const calc = document.getElementById("calc-phone");
calc.addEventListener("click", (e) => {
  console.log("jopa");
});
equalsNode.focus();

const isNumber = /^-?\d*\.?\d+$/;

const model = new Proxy(
  { value: "" },
  {
    set(target, prop, value) {
      let lastKey = findDivergence(target[prop] ? target[prop] : "", value);
      if (lastKey) {
        switch (lastKey) {
          case "=":
            exerciseNode.value = target[prop];
            let _value = new Function("return " + target[prop])();
            target[prop] = isFloat(_value)
              ? // prettier-ignore
                String(parseFloat(_value).toFixed(3))
              : String(parseInt(_value));
            break;
          case "ac":
            target[prop] = "";
            break;
          case "del":
            target[prop] = target[prop].slice(0, target[prop].length - 1);
            break;
          default:
            if (!isNumber.test(lastKey) && target[prop].length > 0) {
              if (isNumber.test(target[prop][target[prop].length - 1])) {
                target[prop] = value;
              }
            } else {
              target[prop] = value;
            }
            break;
        }
      } else {
        target[prop] = value;
      }
      equalsNode.value = target[prop];
      return true;
    },
  }
);

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    model.value += e.target.textContent;
    equalsNode.focus();
  });
});

equalsNode.addEventListener("input", (e) => {
  model.value = e.target.value;
});

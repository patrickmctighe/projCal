let firstNum = null;
let secNum = null;
let firstOp = null;
let secOp = null;
let displayVal = "0";
let answer = null;

const buttons = document.querySelectorAll("button");
const oper = document.querySelectorAll(".oper");
const num = document.querySelectorAll(".num");
const calculator = document.querySelector(".calculator");
const display = document.querySelector(".display");

function currentTime() {
  let date = new Date(); 
  let hh = date.getHours();
  let mm = date.getMinutes();


  

   hh = (hh < 10) ? "0" + hh : hh;
   mm = (mm < 10) ? "0" + mm : mm;
   
    
   let time = hh + ":" + mm;

  document.getElementById("clock").innerText = time; 
  let t = setTimeout(function(){ currentTime() }, 1000);
}

currentTime();

buttons.forEach((item) => {
  item.onclick = () => {
    // backspace
    if (item.id == "back") {
      if (firstNum !== null && firstOp == null && secNum == null) {
        display.innerText = display.innerText.substring(
          0,
          display.innerText.length - 1
        );
        firstNum = display.innerText;
        updateDisplay();
      }

      if (item.className !== null && secNum == null) {
        display.innerText = display.innerText.substring(
          0,
          display.innerText.length - 1
        );
        firstOp = null;
        updateDisplay();
      }
      if (secNum !== null) {
        display.innerText = display.innerText.substring(
          0,
          display.innerText.length - 1
        );
        secNum = secNum.substring(0, secNum.length - 1);
        updateDisplay();
      }
    }
    //clear
    if (item.id == "clear") {
      display.innerText = " ";
      firstNum = null;
      secNum = null;
      firstOp = null;
      secOp = null;
      displayVal = "0";
      answer = null;
    }
    // decimal
    if (item.value == "." && !firstNum.includes(".")) {
      firstNum = firstNum + item.value;
      updateDisplay();
    }
    if (item.value == "." && !secNum.includes(".")) {
      secNum = secNum + item.value;
      updateDisplay();
    }

    //  negative button
    if (
      item.className == "pm" &&
      firstNum !== null &&
      firstOp == null &&
      secNum == null
    ) {
      firstNum = `-${firstNum}`;
      updateDisplay();
    }
    if (
      item.className == "pm" &&
      firstNum !== null &&
      firstOp !== null &&
      secNum !== null
    ) {
      secNum = `-${secNum}`;
      updateDisplay();
    }
    if (item.value == "-" && firstNum == null && firstOp == null) {
      firstNum = operator(0, secNum, "-");
    }
    //getting first number
    if (item.className == "num" && firstNum == null && firstOp == null) {
      firstNum = item.value;

      updateDisplay();
    } else if (item.className == "num" && firstNum != null && firstOp == null) {
      firstNum = firstNum + item.value;
      updateDisplay();
    }
    // getting operator
    if (item.className == "oper" && firstOp == null && firstNum !== null) {
      firstOp = item.value;
      updateDisplay();
    }
    // getting second number

    if (item.className == "num" && firstOp != null && secNum == null) {
      secNum = item.value;
      updateDisplay();
    } else if (item.className == "num" && secNum != null) {
      secNum = secNum + item.value;
      updateDisplay();
    }
    //second operator
    if (
      firstOp != null &&
      item.className == "oper" &&
      firstNum != null &&
      secNum != null
    ) {
      display.innerText = operator(Number(firstNum), Number(secNum), firstOp);
      display.innerText = display.innerText.substring(0, 9);
      firstNum = display.innerText;
      secNum = null;
      firstOp = item.value;
    }
    //equals
    if (item.className == "equals") {
      display.innerText = operator(Number(firstNum), Number(secNum), firstOp);
      display.innerText = display.innerText.substring(0, 9);
      firstNum = display.innerText;
      secNum = null;
      firstOp = null;
    }

    console.log(firstNum);
    console.log(secNum);
    //console.log(display.innerText)
    console.log(displayVal);
    console.log(firstOp);
    //console.log(secOp)
  };
});

updateDisplay = () => {
  if (firstNum != null && secNum == null && firstOp == null) {
    display.innerText = `${firstNum}`;
    displayVal = display.innerText;
  } else if (firstNum != null && firstOp != null && secNum == null) {
    display.innerText = `${firstNum} ${firstOp}`;
    displayVal = display.innerText;
  } else if (firstNum != null && secNum != null && firstOp != null) {
    display.innerText = `${firstNum} ${firstOp} ${secNum}`;
    displayVal = display.innerText;
  }
};

function operator(a, b, op) {
  function add(a, b) {
    return a + b;
  }
  function sub(a, b) {
    return a - b;
  }
  function mult(a, b) {
    return a * b;
  }
  function divy(a, b) {
    return a / b;
  }

  if (op === "+") {
    return add(a, b);
  }
  if (op === "-") {
    return sub(a, b);
  }
  if (op === "x") {
    return mult(a, b);
  }
  if (op === "÷")
    if (b == 0) {
      return "n0pe";
    } else {
      return divy(a, b);
    }
  else {
    return "select operator";
  }
}

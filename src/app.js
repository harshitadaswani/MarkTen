console.log("script is working");

// INPUT ELEMENTS
var billAmount = document.querySelector("#billAmt");
var cashAmount = document.querySelector("#cashAmt");

// CHECKING INPUT ELEMENTS
console.log(billAmount.value);
console.log(cashAmount.value);

// BUTTON ELEMENTS
var nextButton = document.querySelector("#nextBtn");
var checkButton = document.querySelector("#checkBtn");

// Message Divs
var cashGivenDiv = document.querySelector(".cash-given");
var billAmountNotValidDiv = document.querySelector("#bill-amount-not-valid");
var errorOutputDiv = document.querySelector("#error-output");

// TABLE
var returnTable = document.querySelector("#return-table");

nextButton.addEventListener("click", () => {
  clickHandlerNext();
});

const noOfNotes = document.querySelectorAll(".noOfNotes");
console.log(noOfNotes);
const arrayNoteAmt = [2000, 500, 100, 20, 10, 5, 1];

//if bill amt filled, display cash given input field
nextButton.addEventListener("click", () => {
  hideError();
  if (Number(billAmount.value) > 0) {
    nextButton.style.display = "none";
    cashGivenDiv.style.display = "block";
  } else {
    showError("Enter valid bill amount");
  }
});

checkButton.addEventListener("click", function clickHandlerCheck() {
  hideError();
  var billAmountValue = billAmount.value;
  var cashGivenValue = cashAmount.value;
  var balanceAmt = cashGivenValue - billAmountValue;
  returnTable.classList.add("hidden");
  errorOutputDiv.classList.add("hidden");

  if (!cashGivenValue.length || !billAmountValue.length) {
    showErrorC("Enter valid bill amount and cash given to continue");
    errorOutputDiv.classList.remove("hidden");
  } else if (billAmountValue < 0) {
    showErrorC("Enter valid bill amount to continue");
  } else if (cashGivenValue < 0) {
    showErrorC("Enter valid cash amount to continue");
  } else if (balanceAmt < 0) {
    showErrorC("Cash is less than bill, please enter right amount");
    errorOutputDiv.classList.remove("hidden");
  } else if (balanceAmt === 0) {
    showErrorC("No Amount to be returned");
    errorOutputDiv.classList.remove("hidden");
  } else if (balanceAmt > 0) {
    calculateNotes(balanceAmt);
  }

  function calculateNotes(balance) {
    for (var i = 0; i < 7; i++) {
      var element = arrayNoteAmt[i];
      var currentDenomination = document.getElementById(element);
      currentDenomination.innerHTML = "";
      if (balance >= element) {
        var noOfNote = Math.floor(balanceAmt / element);
        balance = balance - (noOfNote * element);
        currentDenomination.innerHTML = noOfNote;
        returnTable.classList.remove("hidden");
      }
    }
  }
});

function showError(text) {
  errorOutputDiv.style.display = "block";
  errorOutputDiv.innerText = text;
  cashGivenDiv.style.display = "none";
}

function showErrorC(text) {
  errorOutputDiv.style.display = "block";
  errorOutputDiv.innerText = text;
}

function hideError() {
  errorOutputDiv.style.display = "none";
}

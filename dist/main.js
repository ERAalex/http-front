/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/card-types/card-types.js
class CardWidget {
  // This class response for diferent types of cards. If we need more, we can add them to list _awaviableCards
  // and use them in cardShow, note that also we need to add images to /img folder with name of card
  constructor(element) {
    this._element = element;
    this._awailableCards = ["visa", "mir", "mastercard", "express", "discover", "jsb", "diners"];
  }
  cardShow() {
    const container = this._element.querySelector(".cards-container");
    this._awailableCards.forEach(card => {
      container.innerHTML += `<div class="card-item type-${card} filter-active" style="
        width: 100px;
        height: 70px;
        background-size: 100%;
        background-repeat: no-repeat;
        margin: 10px; 
        background-position: center;">
      </div>`;
    });
  }
  cardActivate(card) {
    // remove grey filter
    const cardItem = this._element.querySelector(`.type-${card}`);
    cardItem.classList.remove("filter-active");
    return cardItem;
  }
  cardDeactivateAll() {
    const cardItems = this._element.querySelectorAll(".card-item");
    for (let i = 0; i < cardItems.length; i++) {
      cardItems[i].classList.add("filter-active");
    }
  }
}
;// CONCATENATED MODULE: ./src/js/card-form/card-form-validation.js
class CardValidation {
  // This class is for decomposing CardForm class
  constructor() {}
  validCreditCard(value) {
    // accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) return false;

    // The Luhn Algorithm. It's so pretty.
    var nCheck = 0,
      nDigit = 0,
      bEven = false;
    value = value.replace(/\D/g, "");
    for (var n = value.length - 1; n >= 0; n--) {
      var cDigit = value.charAt(n),
        newDigit = parseInt(cDigit, 10);
      if (bEven) {
        if ((newDigit *= 2) > 9) newDigit -= 9;
      }
      nCheck += newDigit;
      bEven = !bEven;
    }
    return nCheck % 10 == 0;
  }
  checkTypeCard(string) {
    // check type of card - visa, mastercard, discover, diners, jsb, mir
    const dinersCard = ["30", "36", "38", "39"]; // 14 digit
    const jsbCard = [352800, 358999]; // 16 digit
    const express = ["34", "37"]; // 15 digit
    const mir = ["2"];
    const visa = ["4"]; // 16 digit
    const mastercard = ["5"]; // 16 digit
    const discover = ["6"]; // 16 digi

    if (string.length === 14 & dinersCard.includes(string.substring(0, 2))) {
      if (!this.validCreditCard(string)) {
        return "Incorrect card input";
      }
      return "diners";
    }
    if (string.length === 15 & express.includes(string.substring(0, 2))) {
      if (!this.validCreditCard(string)) {
        return "Incorrect card input";
      }
      return "express";
    }
    if (string.length >= 16) {
      if (!this.validCreditCard(string) & string[0] != "2") {
        return "Incorrect card input";
      }
      if (visa.includes(string[0])) {
        return "visa";
      } else if (mir.includes(string[0])) {
        return "mir";
      } else if (mastercard.includes(string[0])) {
        return "mastercard";
      } else if (discover.includes(string[0])) {
        return "discover";
      } else if (Number(string.substring(0, 6)) >= jsbCard[0] & Number(string.substring(0, 6)) <= jsbCard[1]) {
        return "jsb";
      } else {
        return "Card is not defined";
      }
    }
  }
}
;// CONCATENATED MODULE: ./src/js/card-form/card-form.js


class CardForm {
  // This class response for input numbers of cards
  constructor(element) {
    this._element = element;
    this._inputField = this._element.querySelector(".card-input");
    this._buttonValidate = this._element.querySelector(".button-card");
    this._message = this._element.querySelector(".message-status");
    this._alertMessages = ["Card is not defined", "Incorrect card input", "Please enter your card number", "You didn't fill card number correctly", "Your card number is correct. Card-type: "];

    // listener part
    this.onKeyPress = this.onKeyPress.bind(this);
    this._inputField.addEventListener("keyup", this.onKeyPress);
    this.onPressButton = this.onPressButton.bind(this);
    this._buttonValidate.addEventListener("click", this.onPressButton);
  }
  checkValidInput(string) {
    // check valid input if it is a Number
    const regex = /^\d+$/;
    if (regex.test(string)) {
      return true;
    } else {
      return false;
    }
  }
  onPressButton(event) {
    event.preventDefault();
    console.log("heyyy");
    const validateClass = new CardValidation();
    const valueInput = this._inputField.value;
    const widgetCard = new CardWidget(document.querySelector(".card-main-container"));
    if (valueInput.length >= 14) {
      // if input lenght is 14+ numbers logic for return type card and show it
      // const typeCard = this.checkTypeCard(valueInput);
      const typeCard = validateClass.checkTypeCard(valueInput);

      // if card is not defined add message
      if (typeCard === "Card is not defined") {
        this._message.textContent = this._alertMessages[0];
        this._inputField.classList.add("card-alert");
        // if Lulh alghoritm show that number is not valid
      } else if (typeCard === "Incorrect card input") {
        this._message.textContent = this._alertMessages[1];
        this._inputField.classList.add("card-alert");
      } else if (widgetCard._awailableCards.includes(typeCard)) {
        widgetCard.cardDeactivateAll();
        widgetCard.cardActivate(typeCard);
        this._inputField.classList.add("card-valid");
        this._message.textContent = this._alertMessages[4] + typeCard;
      }
    } else {
      this._message.textContent = this._alertMessages[3];
    }
  }
  onKeyPress() {
    const validateClass = new CardValidation();
    const valueInput = this._inputField.value;
    const widgetCard = new CardWidget(document.querySelector(".card-main-container"));
    this._inputField.classList.remove("card-valid");
    if (valueInput.length === 0) {
      this._message.textContent = this._alertMessages[2];
      this._inputField.classList.remove("card-alert");
      widgetCard.cardDeactivateAll();
    }
    if (this.checkValidInput(valueInput) === false & valueInput.length > 0) {
      // if not valid input add red color to input field
      this._message.textContent = this._alertMessages[1];
      this._inputField.classList.remove("card-valid");
      this._inputField.classList.add("card-alert");
    } else {
      this._inputField.classList.remove("card-alert");
      widgetCard.cardDeactivateAll();
      this._message.textContent = " ";
      const checkAlert = this._element.querySelector(".incorrect-card-type") !== null;
      if (checkAlert) {
        checkAlert.remove();
      }
      if (valueInput.length >= 14) {
        // if input lenght is 14+ numbers logic for return type card and show it
        // const typeCard = this.checkTypeCard(valueInput);
        const typeCard = validateClass.checkTypeCard(valueInput);

        // if card is not defined add message
        if (typeCard === "Card is not defined") {
          this._message.textContent = this._alertMessages[0];
          this._inputField.classList.add("card-alert");
          // if Lulh alghoritm show that number is not valid
        } else if (typeCard === "Incorrect card input") {
          this._message.textContent = this._alertMessages[1];
          this._inputField.classList.add("card-alert");
        } else if (widgetCard._awailableCards.includes(typeCard)) {
          widgetCard.cardDeactivateAll();
          widgetCard.cardActivate(typeCard);
          this._inputField.classList.add("card-valid");
        }
      }
    }
  }
}
;// CONCATENATED MODULE: ./src/js/app.js


console.log("start");
document.addEventListener("DOMContentLoaded", () => {
  const widgetCard = new CardWidget(document.querySelector(".card-main-container"));
  widgetCard.cardShow();
  const widgetForm = new CardForm(document.querySelector(".card-form"));
  widgetForm.onKeyPress();
});
;// CONCATENATED MODULE: ./src/index.js



/******/ })()
;
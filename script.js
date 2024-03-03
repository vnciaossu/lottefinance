const rateEstimationBox = document.getElementById("rate-estimation");
const rateEstimationBtn = document.getElementById("rate-estimation-btn");
const rateEstimationForm = document.getElementById("rate-estimation-form");

if (rateEstimationBtn)
  rateEstimationBtn.addEventListener("click", function () {
    rateEstimationBox.style.display = "none";
    rateEstimationForm.style.display = "flex";
  });

const amountRate = document.getElementById("amount-rate");
const month = document.getElementById("month");
const amountRateResult = document.getElementById("amount-rate-result");
const monthResult = document.getElementById("month-result");
const invoiceAmount = document.getElementById("invoice-amount");

function formatAmount(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function setAmountRateValue() {
  amountRateResult.textContent = formatAmount(amountRate.value);
}

function setMonthValue() {
  monthResult.textContent = month.value;
}

function calculatePMT(rate, nper, pv, fv = 0, type = 0) {
  if (rate === 0) {
    return -(pv + fv) / nper;
  }

  const pvif = Math.pow(1 + rate, nper);
  let pmt = (rate * pv * (pvif + fv)) / (pvif - 1);

  if (type === 1) {
    pmt /= 1 + rate;
  }

  return pmt.toFixed();
}

function setInvoiceAmount() {
  invoiceAmount.textContent = formatAmount(calculatePMT(0.2 / 12, Number(month.value), Number(amountRate.value)));
}

setAmountRateValue();
setMonthValue();
setInvoiceAmount();

amountRate.addEventListener("input", function () {
  setAmountRateValue();
  setInvoiceAmount();
});

month.addEventListener("input", function () {
  setMonthValue();
  setInvoiceAmount();
});

let timeRunning = 3000;
let timeAutoNext = 7000;
let runTimeOut;
let runNextAuto = setTimeout(() => {
  showSlider('next');
}, timeAutoNext)

function showSlider(type){
  let SliderDom = document.getElementsByClassName('list-scroll')[0];
  let SliderItemsDom = document.querySelectorAll('.list-scroll .item');
  
  if(type === 'next'){
    SliderDom.appendChild(SliderItemsDom[0]);
  }else{
    SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
  }
  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {

  }, timeRunning);

  clearTimeout(runNextAuto);
  runNextAuto = setTimeout(() => {
    showSlider('next');
  }, timeAutoNext)
}
var jumpToFormButtons = document.querySelectorAll(".jump-to-form");

jumpToFormButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var form = document.getElementById("register-form");

    form.scrollIntoView({ behavior: "smooth", block: "start" });

    var firstInput = form.querySelector("input");
    if (firstInput) {
      firstInput.focus();
    }
  });
});

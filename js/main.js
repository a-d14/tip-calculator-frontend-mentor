const amountInput = document.getElementById('bill-input');
const tipInput = document.getElementById('tip-input');
const peopleInput = document.getElementById('people-input');

const tipAmount = document.getElementById('tip-amount');
const totalAmount = document.getElementById('total-amount');
const resetButton = document.querySelector(".tip-calculator__result-reset");

let billAmount = -1, tip = 0, numberOfPeople = 0;

function validateBillAmount(amount) {
    if(amount < 0 || Number.isNaN(amount)) {        
        return false
    };
    return true;
}

function validateTip(tip) {    
    if(tip < 0 || Number.isNaN(tip)) {
        return false;
    }
    return true;
}

function validatePeople(people) {    
    if(people <= 0 || !Number.isInteger(people)) {
        return false
    };
    return true;
}

function displayOutput() {
    if(billAmount != -1 && numberOfPeople != 0) {
        let totalPerPerson = (1 + tip / 100) * billAmount / numberOfPeople;
        totalAmount.textContent = '$' + totalPerPerson.toFixed(2);

        let tipPerPerson = tip/100 * billAmount / numberOfPeople;
        tipAmount.textContent = '$' + tipPerPerson.toFixed(2);

        resetButton.disabled = false;
    }
}

function handleError(el, action) {

    resetButton.disabled = true;

    let errorMsg = el.querySelector('.error');

    if(!errorMsg)
        errorMsg = el.parentElement.querySelector('.error');
    
    if(action === 'show') {
        errorMsg.classList.remove('hidden');
    } else if(action === 'remove') {
        errorMsg.classList.add('hidden');
    }
}

// [amountInput, tipInput, peopleInput].forEach((el) => {
//     el.addEventListener('keyup', function(e) {
//         const elementClicked = e.target.id;

//         console.log(e.target.value);
        

//         if(elementClicked === 'bill-amount') {
//             if(validateBillAmount(+e.target.value)) {
//                 billAmount = +target.value;
//                 handleError(el, 'remove');
//                 displayOutput();
//                 return;
//             }
//             handleError(el, 'show');
//         } else if(elementClicked === 'tip-amount') {
//             if(validateTip(+e.target.value)) {
//                 tip = +target.value;
//                 handleError(el, 'remove');
//                 displayOutput();
//                 return;
//             }
//             handleError(el, 'show');
//         } else if(elementClicked === 'bill-amount') {
//             if(validatePeople(+e.target.value)) {
//                 numberOfPeople = +target.value;
//                 handleError(el, 'remove');
//                 displayOutput();
//                 return;
//             }
//             handleError(el, 'show');
//         }

//     })
// })

document.querySelectorAll(".tip-calculator__input-container").forEach((el) => {
    el.addEventListener('keyup', (e) => {        
        const target = e.target;
                
        if(target.classList.contains("tip-calculator__input-currency")) {
            if(validateBillAmount(+target.value)) {
                billAmount = +target.value;
                handleError(el, 'remove');
                displayOutput();
                return;
            }
            handleError(el, 'show');
        } else if(target.classList.contains("tip-calculator__input-tip")) {
            if(validateTip(+target.value)) {
                tip = +target.value;
                handleError(el, 'remove');
                displayOutput();
                return;
            }
            handleError(el, 'show');
        } else if(target.classList.contains("tip-calculator__input-people")) {
            if(validatePeople(+target.value)) {
                numberOfPeople = +target.value;
                handleError(el, 'remove');
                displayOutput();
                return;
            }
            handleError(el, 'show');
        }

    });
});

document.querySelector(".tip-calculator__input-select-tip").addEventListener('click', function(e) {
    this.querySelectorAll('button').forEach((el) => el.classList.remove('active'));

    this.querySelector('input').value = '';

    if(e.target.tagName === 'BUTTON') {
        e.target.classList.add('active');
        tip = +e.target.textContent.replace(/\D/g,'');
    }
});

resetButton.addEventListener('click', () => {
    amountInput.value = '';
    tipInput.value = '';
    peopleInput.value = '';

    document.querySelectorAll(".tip-calculator__input-select-tip button").forEach((el) => {
        el.classList.remove('active');
    });

    tipAmount.textContent = '$' + '0.00';
    totalAmount.textContent = '$' + '0.00';

    resetButton.disabled = true;
});
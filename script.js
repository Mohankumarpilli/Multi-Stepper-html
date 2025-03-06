const step1 = document.querySelector('.step-1');
const step2 = document.querySelector('.step-2');
const step3 = document.querySelector('.step-3');
const step4 = document.querySelector('.step-4');
const step5 = document.querySelector('.step-5');

let nxt_btn = document.querySelector('.next-step');
let back_btn = document.querySelector('.go-back');
let sec_heading = document.querySelector('.section-heading');
let sec_info = document.querySelector('.section-info');
let sec_heading_div=document.querySelector('.section-heading-div');

const plansContainer = document.querySelector('.plan-container');
const cards = document.querySelectorAll('.card');
const prices = document.querySelectorAll('.price');
const offerContent = document.querySelectorAll('.offer');

const planChangingMY = {
    'Arcade(Monthly)': 'Arcade(Yearly)',
    'Advanced(Monthly)': 'Advanced(Yearly)',
    'Pro(Monthly)': 'Pro(Yearly)'
}

const planChangingYM = {
    'Arcade(Yearly)': 'Arcade(Monthly)',
    'Advanced(Yearly)': 'Advanced(Monthly)',
    'Pro(Yearly)': 'Pro(Monthly)'
}

const planChangingPricesMY = {'$9/mo':'$90/yr','$12/mo':'$120/yr','$15/mo':'$150/yr'};
const planChangingPricesYM = {'$90/yr': '$9/mo', '$120/yr': '$12/mo', '$150/yr': '$15/mo'}

const toggleSwitch = document.getElementById('toggleSwitch');
const month = document.getElementById('month');
const year = document.getElementById('year');

const planSelected = ['Arcade(Monthly)','$9/mo']
let word='(Monthly)';


const addonPrices = document.querySelectorAll('.addonsPrice');
const allAddOns = document.querySelectorAll(".add-ons");


const planNameElement = document.querySelector(".plan-name");
const planPriceElement = document.querySelector(".selected-plan-price");
const changePlanButton = document.querySelector(".change-plan-button");

const addOnContainer = document.querySelector(".add-ons-container");
const addOnTemplate = document.querySelector(".selected-add-on");
console.log(addOnTemplate);

const selectedPlan = document.querySelector(".selected-plan");

const totalName = document.querySelector('.total-name');
const totalPrice = document.querySelector('.total-price');


const sectionHeadingsArray = [
    "Personal info",
    "Select your plan",
    "Pick add-ons",
    "Finishing up",
];

const sectionHeadingsInfoArray = [
    "Please provide your name, email address, and phone number.",
    "You have the option of monthly or yearly billing.",
    "Add-ons help enhance your gaming experience.",
    "Double-check everything looks OK before confirming.",
];

let count = 1;


function updateStep(count) {
    for (let i = 1; i <= 4; i++) {
        let circle = document.querySelector(`#circle${i}`);
        let isActive = i === count;
        circle.style.backgroundColor = isActive ? 'hsl(206, 94%, 87%)' : 'transparent';
        circle.style.color = isActive ? 'hsl(213, 96%, 18%)' : 'white';
        circle.style.border = isActive ? 'none' : '1px solid hsl(0, 0%, 100%)';
    }
    
    sec_heading.innerText = sectionHeadingsArray[count - 1];
    sec_info.innerText = sectionHeadingsInfoArray[count - 1];
    
    back_btn.style.visibility = (count > 1) ? 'visible' : 'hidden';
    
    nxt_btn.innerText = (count === 4) ? 'Confirm' : 'Next Step';
    nxt_btn.style.backgroundColor = (count === 4) ? 'hsl(243, 100%, 62%)' : 'hsl(213, 96%, 18%)';
}


function validateInputs() {
    let isValid = true;

    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const numberInput = document.querySelector('#number');

    const nameError = document.querySelector('.name-error');
    const emailError = document.querySelector('.email-error');
    const numberError = document.querySelector('.number-error');

    if (nameInput.value.trim() === '') {
        nameError.style.visibility = 'visible';
        isValid = false; 
    } else {
        nameError.style.visibility = 'hidden';
    }

    if (emailInput.value.trim() === '') {
        emailError.style.visibility = 'visible';
        emailInput.classList.add('border-red-500'); 
        emailInput.classList.remove('focus:border-blue-500');
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailInput.value.trim())) {
        emailError.style.visibility = 'visible';
        emailInput.classList.add('border-red-500'); 
        emailInput.classList.remove('focus:border-blue-500');
        isValid = false;
    } else {
        emailError.style.visibility = 'hidden';
        emailInput.classList.remove('border-red-500'); 
        emailInput.classList.add('focus:border-blue-500'); 
    }

    if (numberInput.value.trim() === '') {
        numberError.style.visibility = 'visible';
        numberInput.classList.add('border-red-500'); 
        numberInput.classList.remove('focus:border-blue-500'); 
        isValid = false;
    } else if (!/^\+?[0-9]{10,15}$/.test(numberInput.value.trim())) {
        numberError.style.visibility = 'visible';
        numberInput.classList.add('border-red-500'); 
        numberInput.classList.remove('focus:border-blue-500'); 
        isValid = false;
    } else {
        numberError.style.visibility = 'hidden';
        numberInput.classList.remove('border-red-500'); 
        numberInput.classList.add('focus:border-blue-500'); 
    }

    return isValid;
}


toggleSwitch.addEventListener('change', () => {

    const allAddOnCheckboxes = document.querySelectorAll(".add-ons input[type='checkbox']");
    allAddOnCheckboxes.forEach((checkbox) => {
        checkbox.checked = false; 
        checkbox.parentElement.parentElement.style.borderColor='black';
        checkbox.parentElement.parentElement.style.backgroundColor='transparent';
    });

    const isYearly = toggleSwitch.checked;
    const planChanges = isYearly ? planChangingMY : planChangingYM;
    const priceChanges = isYearly ? planChangingPricesMY : planChangingPricesYM;
    const priceSuffix = isYearly ? '/yr' : '/mo';
    const totalLabel = isYearly ? 'Total (per year)' : 'Total (per month)';

    planSelected[0] = planChanges[planSelected[0]];
    planSelected[1] = priceChanges[planSelected[1]];
    console.log(planSelected);

    offerContent.forEach((each) => {
        each.style.display = isYearly ? 'block' : 'none';
    });

    prices.forEach((each) => {
        each.innerText = `$${each.dataset[isYearly ? 'year_price' : 'month_price']}${priceSuffix}`;
    });

    addonPrices.forEach((each) => {
        each.innerText = `+$${each.dataset[isYearly ? 'year_price' : 'month_price']}${priceSuffix}`;
    });

    year.style.color = isYearly ? 'hsl(213, 96%, 18%)' : 'hsl(234, 14%, 74%)';
    month.style.color = isYearly ? 'hsl(234, 14%, 74%)' : 'hsl(213, 96%, 18%)';

    totalName.innerText = totalLabel;

});


plansContainer.addEventListener('click', (eve) => {
    const targetCard = eve.target.closest('.card');

    const cardArray = Array.from(cards);

    console.log(targetCard);
    console.dir(targetCard);

    cardArray.forEach((card) => {
        card.style.border = '1px solid hsl(229,24%,87%)';
        card.style.backgroundColor = 'transparent';
    });

    targetCard.style.border = '1px solid indigo';
    targetCard.style.backgroundColor = 'hsl(206,94%,96%)';

    const word = toggleSwitch.checked ? '(Yearly)' : '(Monthly)';
    const priceType = toggleSwitch.checked ? 'year_price' : 'month_price';

    const selectedCardIndex = cardArray.indexOf(targetCard);

    if (selectedCardIndex !== -1) {
        const selectedCard = cardArray[selectedCardIndex];
        const selectedPrice = prices[selectedCardIndex].dataset[priceType];

        planSelected[0] = `${selectedCard.dataset.name}${word}`;
        planSelected[1] = `$${selectedPrice}/${toggleSwitch.checked ? 'yr' : 'mo'}`;

        console.log(planSelected);
    }
});


const selectedServices = {};

allAddOns.forEach((addOn) => {
    const checkbox = addOn.querySelector("input[type='checkbox']");
    const addOnName = addOn.querySelector(".checkbox-content h3").innerText; 
    const addOnPrice = addOn.querySelector(".addonsPrice");

    checkbox.addEventListener("change", function () {
        
        const priceType = toggleSwitch.checked ? 'year_price' : 'month_price';
        const priceSuffix = toggleSwitch.checked ? '/yr' : '/mo';
        const priceValue = `+$${addOnPrice.dataset[priceType]}${priceSuffix}`;

        if (this.checked) {
            selectedServices[addOnName] = priceValue;

            addOn.style.borderColor = "indigo";
            addOn.style.backgroundColor = "hsl(206,94%,96%)";
        } else {
            delete selectedServices[addOnName];

            addOn.style.borderColor = "hsl(229,24%,87%)";
            addOn.style.backgroundColor = "transparent";
        }
        console.log("Selected Services:", selectedServices);
    });
});


function updatePlanDetails(planSelected) {
    const [planName, planPrice] = planSelected; 
    planNameElement.innerText = planName;   
    planPriceElement.innerText = planPrice;
}


let currentPage = 4;
function goToPage(pageNumber) {
  count=pageNumber
  updateStep(count);
  document.querySelectorAll(".step-box").forEach((page, index) => {
    if (index === pageNumber - 1) {
    } else {
    }
  });
}

changePlanButton.addEventListener("click", () => {
  goToPage(2); 
});



function renderAddOns(selectedServices) {
    addOnContainer.innerHTML = "";
    if (Object.keys(selectedServices).length === 0) {
        selectedPlan.style.border = "none";
        return; 
    } else {
    }
    for (const [serviceName, servicePrice] of Object.entries(selectedServices)) {
      const addOnClone = addOnTemplate.cloneNode(true);
      console.log(addOnClone); 
  
      addOnClone.querySelector(".add-on-name").textContent = serviceName;
      addOnClone.querySelector(".add-on-price").textContent = servicePrice;
  
      addOnContainer.appendChild(addOnClone);
    }
}



function calculateTotal(planSelected, selectedServices) {
    let total = 0;
    
    const extractPrice = (price) => Number(price.replace(/[^\d.-]/g, ""));

    if (planSelected.length > 1) {
        total += extractPrice(planSelected[1]);
    }

    Object.values(selectedServices).forEach((servicePrice) => {
        total += extractPrice(servicePrice);
    });
    const suffix = toggleSwitch.checked ? '/yr' : '/mo';
    totalPrice.innerText = `$${total}${suffix}`;
    return total;
}

function thankyouPage(){
    nxt_btn.style.display='none';
    back_btn.style.display='none';
    sec_heading_div.style.display='none';
}

function hidingPages(count) {
    [step1, step2, step3, step4, step5].forEach((step, index) => {
        if (index + 1 === count) {
            step.classList.replace('hidden','flex');
        } else {
            step.classList.replace('flex','hidden');
        }
    });
}

hidingPages(count);

nxt_btn.onclick = () => {

    if (count === 1) {
        if (!validateInputs()) {
            console.error("Inputs are not valid.");
            return;
        }
    }

    if (count < 5) {
        count += 1;

        if (count === 5) {
            hidingPages(count);
            thankyouPage();
        } else {
            hidingPages(count);
            updateStep(count);
            updatePlanDetails(planSelected);
            renderAddOns(selectedServices);
            calculateTotal(planSelected, selectedServices);
        }
    }
};

back_btn.onclick = () => {
    if (count > 1) {
        count -= 1;
        hidingPages(count); 
        updateStep(count);
    }
};
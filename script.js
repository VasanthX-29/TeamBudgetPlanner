class Deal {                                           //deal object
    constructor(vendor, description, amount, date) {
      this.vendor = vendor;
      this.description = description;
      this.amount = amount;
      this.date = date;
    }
  }

let arrOfObjects=[];   // contains the deal objects

let dealsubmitBtn=document.getElementById("dealSubmitBtn");
let annualBdBtn=document.getElementById("calAnnualBudget")
let addteamBtn=document.getElementById("teamSubmitBtn");

dealsubmitBtn.addEventListener("click", addDeal)
annualBdBtn.addEventListener("click", calculateBudget)
addteamBtn.addEventListener("click", addTeam)




function addTeam()
{
  const nameofTeam=document.getElementById("tName").value;
  const nameOfManager=document.getElementById("tmName").value;

  const TeamNameSpan=document.getElementById("teamname");
  const ManagerSpan=document.getElementById("manager");

  TeamNameSpan.innerText=nameofTeam;
  ManagerSpan.innerText=nameOfManager;

  
}

function addDeal()
{
    let vendorName=document.getElementById("vendorName").value;
    let dealAmount=document.getElementById("dealAmount").value;
    let dealDate=document.getElementById("dealDate").value;
    let dealDesc=document.getElementById("dealDescription").value;

    const deal = new Deal(vendorName, dealDesc, dealAmount, dealDate);   // creating a new deal

    arrOfObjects.push(deal);

    (function findTotalDeals()
    {
      const noOfDealsElement=document.getElementById("NoofDeals");
       let num=arrOfObjects.length;
       noOfDealsElement.innerText=num;
    })();

   var div = document.createElement('div');
   div.innerHTML=`
    <div class="card w-70 ">
  <div class="card-header ch">
    ${vendorName}
  </div>
  <div class="card-body">
    <h5 class="card-title">Deal Details</h5>
    <p class="card-text ">Deal Amount : &#8377; ${dealAmount}</p>
    <p class="card-text ">Deal Date : ${dealDate}</p>
    <p class="card-text ">Deal Description : ${dealDesc}</p>
   
  </div>
</div>
    
`
const element = document.getElementById("headDiv");
element.appendChild(div);
}

function calculateDealExpenses() {         //calculating the total amount of the deals agreed upon
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        dealExpenses = 0;
        arrOfObjects.forEach((deal) => {
          dealExpenses +=parseInt(deal.amount);
          console.log(dealExpenses);
        });
        resolve(dealExpenses);
      }
       catch (error) 
       {
        reject(error);
      }
    }, 1000);
  });
}

function calculateBudget()
{
  const divElement=document.getElementById("showAnnualBudget");
  const ulElement=document.getElementById("deals");
  
  
  for(let val of arrOfObjects)
  {
    const li=document.createElement('li');
     var dealDetail="Vendor Name: "+val.vendor+" | Deal Amount: "+val.amount;
     li.innerText=dealDetail;
     ulElement.appendChild(li);
  }

  divElement.appendChild(ulElement);

    calculateDealExpenses()
    .then((budget) => {
      const divElement=document.getElementById("finalAmountDiv");
      divElement.style.visibility="visible";

      const otherExpenses=document.getElementById("otherExpAmt").value;
      const otherExpSpanElement=document.getElementById("otherExpSpan");
      const dealExpSpanElement=document.getElementById("dealExpSpan");
      const teamsSpan=document.getElementById("teamsBudgetSpan");


      otherExpSpanElement.innerText=otherExpenses;
      dealExpSpanElement.innerText=budget;
      teamsSpan.innerText=budget+parseInt(otherExpenses);
    })
    .catch((error) => {
      console.error('An error occurred while calculating the budget:', error);
    });
    


}






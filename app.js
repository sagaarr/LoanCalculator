document.getElementById('loan-form').addEventListener('submit', function(e){

  // HIDE results enetially 
  document.getElementById('results').style.display = "none";

  // SHOW Loading enetially
  document.getElementById('loading').style.display = "block";

  setTimeout(calculateIntrest, 2000);
  e.preventDefault();
});

function calculateIntrest(){
  console.log('calculating');
  // UI vars
  const UIamount = document.getElementById('amount');
  const UIinterest = document.getElementById('interest');
  const UIyearToPay = document.getElementById('years');
  const UImonthlyPayMents = document.getElementById('monthly-payment');
  const UItotalPayMent = document.getElementById('total-payment');
  const UItotalInterest = document.getElementById('total-interest');

  const principal = parseFloat(UIamount.value);
  const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
  const calculatedPayments = parseFloat(UIyearToPay.value) * 12;

  // compute monthly payments

  // THIS IS COMPOUND INTREST 
  // [P(1+i)^n]-P THIS IS STANDARD FORMULA HERE CALCULATIONS ARE ACCORDINGLY
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    UImonthlyPayMents.value = monthly.toFixed(2);
    UItotalPayMent.value = (monthly * calculatedPayments).toFixed(2);
    UItotalInterest.value = ((monthly * calculatedPayments)- principal).toFixed(2);
    document.getElementById('loading').style.display = "none";
    document.getElementById('results').style.display = "block";

  }else {
    showError('Please Check Your Number..');
  }

  
}


function showError(error) {
  // create a div 
  const errorDiv = document.createElement('div');
  // get element 
  const card = document.querySelector('.card');  // here card is a parent element of .heading ..
  const heading = document.querySelector('.heading');
  
  // add a class
  errorDiv.className = "alert alert-danger";

  // create a text node and append it to a div
  errorDiv.appendChild(document.createTextNode(error));

  // insert error above heading
  card.insertBefore(errorDiv, heading);

  // clear error after 3sec
  setTimeout(eerClear , 3000);
}

// eerClear function
function eerClear(){
  document.querySelector('.alert').remove();
}
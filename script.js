

const loadPhones =  async(searchText, dataLimit) => {


    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    const res = await fetch(url);

    const data = await res.json();

    displayPhones (data.data, dataLimit);


}
 
   const displayPhones = (phones, dataLimit) => {
    const ShowAll = document.getElementById('show-all');
     if(phones.length > 10 && dataLimit){

        phones = phones.slice(0,10);
        ShowAll.classList.remove('d-none')
     } 
       else{
        ShowAll.classList.add('d-none')
       }
    const phoneContainer = document.getElementById('phone-container');
   const  noPhone = document.getElementById('no-phone')

   console.log(noPhone)
    phoneContainer.innerHTML = ' ';

    if(phones.length === 0){

        noPhone.classList.remove('d-none')
        console.log("first")
        tootleSpinner(false)
    }

    else{

        noPhone.classList.add('d-none')
    }


    phones.forEach(phone => {

        console.log(phone)

    const phoneDiv = document.createElement('div');

        phoneDiv.classList.add('col')

        phoneDiv.innerHTML = `
        

        <div class="card">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Go SomeWhere </button>
        </div>
      </div>
        `

        phoneContainer.appendChild(phoneDiv)

       
    })

    tootleSpinner(false)

   }



  document.getElementById('btn-search').addEventListener('click', function(){
 
    processSearch(10)

  })


  const tootleSpinner = isLoading => {

  
    const loaderSection = document.getElementById('spinner')

    if(isLoading){

        loaderSection.classList.remove('d-none')
    }
     else{

        loaderSection.classList.add('d-none')
     }
  }


  document.getElementById('btn-show-all').addEventListener('click', function() {


         processSearch();
  })



  const processSearch = (dataLimit) => {

     tootleSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit)
  }



// search input field


document.getElementById('search-field').addEventListener('keypress', function(e) {

    console.log(e.key)
    if(e.key === 'Enter'){

        processSearch(10)
    }
})


  const loadPhoneDetails = async id => {

    const url = `https://openapi.programming-hero.com/api/phone/${id}`;

    const res = await fetch(url);

    const data = await res.json()

    displayPhonesDetails(data.data);

  }

  const displayPhonesDetails = phone => {

  
    const modalTitle = document.getElementById('exampleModalLabel');

    modalTitle.innerText = phone.name;

    const phonDetails = document.getElementById('phone-details')

     
    phonDetails.innerHTML = ` 
    
       <p> Release Date :   ${phone.releaseDate}  </p>

       <p>Storage : ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage Found'}
       </p>
       <p>   Others : ${phone.others ? phone.others.Bluetooth : 'No BlueTooth Information'} </p>



    `



  }



// loadPhones();

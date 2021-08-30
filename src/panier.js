//recuperation des donnees du localStorage

const allStorage=() =>{

    let values = [];
    let keys = Object.keys(localStorage);
    let i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return JSON.parse(values);
}

let basketItems=allStorage();

//ajouter les donnees sur la page
const addStorageToPage =()=>{

    const allCartItems = basketItems.map(
        (Item)=>`

        <div class="row gx-5">
        <div class="col-4">
          <img src="${Item.ImgArticle}" class="img-fluid rounded-start" alt="${Item.ImgArticle}">
        </div>
        <div class="col-8">
          <div class="card-body">
            <h5 class="card-title">${Item.NameArticle}</h5>
            
            <p class="card-text"><small class="text-muted">Prix : ${Item.PriceArticle}</small></p>
            <button value="suppress" class="suppress-btn"><i class="fas fa-times"></i></button>
          </div>
        </div>
      </div>

        `
    ).join(' ');
    document.getElementById("panier").innerHTML = allCartItems;
    
}
allStorage();
addStorageToPage();


// recuperer les prix

    const getAllPrices = ()=>{
        let allPrices=[];
        for (let item of basketItems){
            
          let price=parseInt(item.PriceArticle);
          allPrices.push(price);
          
        }
        const reducer=(accumulateur, currentValue) => accumulateur + currentValue;
        let totalPrice= allPrices.reduce(reducer,0);
        return totalPrice;
        
    }
    getAllPrices();


// display le prix final

      const displayNewTotal = ()=>{
        getAllPrices();
      let displayTotalPrice = getAllPrices();

      document.querySelector(".total-produit").innerText = `
      Total commande : ${displayTotalPrice}.00 $

      `};
      displayNewTotal();

//supprimer un article

const removeArticleFromCart = async()=>{
  addStorageToPage();

  let btnsNodeList = document.querySelectorAll('.suppress-btn');
  let allSupBtns = Array.from(btnsNodeList);
  
  for (let i=0; i<allSupBtns.length;i++){
    allSupBtns[i].addEventListener('click', ()=>{
      let selectedArticle= basketItems[i];
      let remove = basketItems.filter(elmt => elmt !== selectedArticle);
      basketItems=remove;
      addStorageToPage();
      removeArticleFromCart();
      localStorage.setItem("produit", JSON.stringify(basketItems));
    })
    displayNewTotal();
   
  }
  if(basketItems.length==0){
    document.getElementById('panier').innerHTML =`<p class="empty-cart text-center">Votre panier est vide</p>`}
    displayNewTotal(); 
}

removeArticleFromCart();


//Recuperer les valeurs du formulaire


let firstNameInput= document.getElementById("first-name");
let lastNameInput= document.getElementById("last-name");
let emailInput= document.getElementById("inputEmail");
let adressInput= document.getElementById("inputAddress");
let cityInput= document.getElementById("inputCity");
let firstNameMissing= document.getElementById("emptyFirstName");


// const validateForm =()=>{
//   //check if names input are empty
//   if(firstNameInput.value)
// }

document.getElementById("send-data").addEventListener("click",(e)=>{
  e.preventDefault();
  
  const valuesForm= {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    adress: adressInput.value,
    city: cityInput.value
  }

  validateForm();
  console.log(valuesForm);
});


//valider les donnees du formulaire




// //envoyer les donnees du formulaire
// //clear localStorage)
// document.getElementById("send-data").addEventListener("click", formValidate);
// (e)=>{
//   // e.preventDefault();
//   // localStorage.clear();

// }




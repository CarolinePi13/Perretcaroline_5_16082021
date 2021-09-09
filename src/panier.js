//----------------------recuperation des donnees du localStorage//---------------------------------------
const displayAnEmptyCart=()=>{
  document.getElementById('actualiser').classList.add('btn--hidden');
    const emptyCart=document.getElementById('CartTable').innerHTML =`<p class="empty-cart text-center">Oh! Votre panier est vide!</p>
<i class="far fa-sad-tear"></i>
<div class="btn fillUP btn-sub"><a href="index.html">Retour à la boutique!</a></div>`;
  return emptyCart;
}
const allStorage=() =>{

   if(localStorage.getItem('produit')=== null ){
     displayAnEmptyCart();


   }else{let values = [];
    
    values.push(localStorage.getItem('produit'))
    

    return JSON.parse(values);
   }
}
let basketItems=allStorage();

  

//-----------------------------ajouter les donnees sur la page//------------------------------
const sousTotal =(a,b)=>{

   let result=(a*b);
   return result;

}

const addStorageToPage =()=>{
    let basketItems=allStorage();
      const allCartItems = basketItems.map(
          (Item)=>
          `
          <tr>
          <td scope="row">
          <img src="${Item.ImgArticle}" class="img-fluid rounded-start img-size" alt="${Item.ImgArticle}">
          </td>
          <td><p class="card-title">${Item.NameArticle}</p></td>
          <td>
          <div class="CartItem-quantity">
          <select  attr-rctcode="${Item.IdArticle}">
          <option id="selected"value="${Item.QuantiteArticle}" selected="selected">${Item.QuantiteArticle}</option>
          <option value="1" >1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          
          </select>
          </div>
          </td>
          <td>
          <div class="CartItem-price--unit">${Item.PriceArticle} €</div>
          </td>
          <td>
          <div class="CartItem-price--total">${sousTotal(parseInt(Item.PriceArticle),parseInt(Item.QuantiteArticle))}.00 €</div>
          <input type="hidden" name="productCode" value="${Item.IdArticle}">
          </td>
          <td>  <button type="button" value="suppress" class="suppress-btn"><i class="fas fa-trash-alt"></i></button></td>
          </tr>
        
  
          `
      ).join(' ');
      document.querySelector("#CartTableBody").innerHTML = allCartItems;
      
      
  }
allStorage();
addStorageToPage();


//----------------------------------- recuperer les prix-----------------------------------------


const getAllPrices = ()=>{
        let allPrices=[];
        for (let item of basketItems){
          
          let price=sousTotal(parseInt(item.PriceArticle),parseInt(item.QuantiteArticle));
          allPrices.push(price);
          
        }
        const reducer=(accumulateur, currentValue) => accumulateur + currentValue;
        let totalPrice= allPrices.reduce(reducer,0);
        return totalPrice;
        
    }
    getAllPrices();


//-------------------------------- display le prix final----------------------------------------------

const displayNewTotal = ()=>{
        getAllPrices();
      let displayTotalPrice = getAllPrices();

      document.querySelector(".total-produit").innerText = `
      Total commande : ${displayTotalPrice}.00 €

      `};
      displayNewTotal();

//----------------------------------supprimer un article-------------------------------------------
const removeArticleFromCart = async()=>{
  await addStorageToPage();
  let btnsNodeList = document.querySelectorAll('.suppress-btn');
  let allSupBtns = Array.from(btnsNodeList);
  
  for (let i=0; i<allSupBtns.length;i++){
    allSupBtns[i].addEventListener('click', ()=>{
      let selectedArticle= basketItems[i];
      let remove = basketItems.filter(elmt => elmt !== selectedArticle);
      basketItems=remove;
      localStorage.setItem("produit", JSON.stringify(basketItems));
      
      addStorageToPage();
      removeArticleFromCart();
    })
    displayNewTotal();
   
  }
  if(basketItems.length==0){
   displayAnEmptyCart();
  };

    displayNewTotal(); 
}

removeArticleFromCart();


const changeQuantite=()=>{
   document.getElementById('actualiser').addEventListener('click',(e)=>{
    let selectNewQuantite=Array.from(document.querySelectorAll('select'))
    
      for (let i=0; i< basketItems.length; i++){
      let newQuantite= parseInt(selectNewQuantite[i].value);
      basketItems[i].QuantiteArticle=newQuantite;
    
    }
   
  localStorage.setItem("produit", JSON.stringify(basketItems));
  allStorage();
  addStorageToPage();
  displayNewTotal();
  removeArticleFromCart();
  
}
)
  
}

changeQuantite();



//------------------------------Recuperer les valeurs du formulaire--------------------------------------------


let inputs = document.querySelectorAll(`input[type='text'], input[type='email']`);

let formulaire=document.querySelector('form');

// un formulaire vide ou avec uniquement des espaces ou vide ou comportant moins de 2 caracteres ne peut pas etre envoyé.---------
formulaire.addEventListener('submit', (e)=>{
  e.preventDefault();
  var valid= true;
  for (let input of inputs){
   
    valid = valid && input.reportValidity() && basketItems.length>0;
    
    if (!valid){
      
      console.log('not valid');
      input.nextElementSibling.classList.add('show');
      input.classList.add('error');
      break;
      
    }else if (input.value==' '|| input.value.length < 2){
      
      input.nextElementSibling.classList.add('show');
      input.classList.add('error');
      valid=false;
      break;
    }
    
  }
  if(valid){
    
    let totalCommande= getAllPrices();
    localStorage.setItem('totalPrice',JSON.stringify(totalCommande) )
  
    let contactData={
      firstName: inputs[0].value,
      lastName: inputs[1].value,
      address: inputs[3].value,
      city: inputs[4].value,
      email: inputs[2].value
    }
    let productsData=[];
    for (let item of basketItems){
      productsData.push(item.IdArticle);
    }
    var myInit = { method: "POST",
                  headers: {
                    "Content-Type": "Application/json",
                  },
                  body: JSON.stringify({
                    contact: contactData,
                    products: productsData
                  }),
                  mode: 'cors',
                  };

    const postData = () => {
        fetch('http://localhost:3000/api/cameras/order', myInit)       
        .then ((response)=> response.json())
        .then (json => {
          let order= json.orderId;
          localStorage.setItem('order', JSON.stringify(order));
          window.location.href="./thanksorder.html";
        })
        
        

    };
    postData();
    
  }
 
}

)

// quand les erreurs sont corrigées sur les inputs les messages d'erreur disparaissent

inputs.forEach(element => {
  element.addEventListener('input', ()=>
  {
    
    if (element.validity.valid){
      element.nextElementSibling.classList.remove('show');
      element.classList.add('error');
    }
  })
});



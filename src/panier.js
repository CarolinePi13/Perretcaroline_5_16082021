
//---Affichage d'un panier vide lorsque rien n'a ete ajoute au panier mais aussi lorsque l'utilisateur supprime tous les elements //-----------------------



const displayAnEmptyCart=()=>{

  document.getElementById('actualiser').classList.add('btn--hidden');
  const emptyCart=document.getElementById('CartTable').innerHTML =`
      <p class="empty-cart text-center">Oh! Votre panier est vide!</p>
      <i class="far fa-sad-tear"></i>
      <div class="btn fillUP btn-sub"><a href="index.html">Retour à la boutique!</a></div>`;
  return emptyCart;
}

//----------------------recuperation des donnees du localStorage//---------------------------------------
const getAllStorage=() =>{

   if(localStorage.getItem('produit')=== null ){
     displayAnEmptyCart();
    let values = [];
    return values;
   } else{
     let values = [];
    
    values.push(localStorage.getItem('produit'))
    

    return JSON.parse(values);
   }
}
getAllStorage();
let basketItems=getAllStorage();


  

//-----------------------------ajouter les donnees sur la page------------------------------

          //--------------------calcul de sous-total--------------------------
const sousTotal =(a,b)=>{

   let result=(a*b);
   return result;

}
        //--------------Integre l'affichage des artciles dans la page HTML----------
const addStorageToPage =()=>{

    
    if (basketItems.length>0){
      const allCartItems = basketItems.map(
          (Item)=>
          `
          <div class="cart">
          <div class="cart_img_supp">
            <div class="cart_img">
                <img src="${Item.ImgArticle}" class="img-fluid rounded-start img-size" alt="${Item.ImgArticle}">
            </div>
            <div class="cart-middle">
              <p class="card-title mt-3 mt-sm-0">${Item.NameArticle}</p>
              <div class="CartItem-price--unit">${Item.PriceArticle} €</div>
              <div class="CartItem-quantity mt-2 mt-sm-0">
                <select  attr-rctcode="${Item.IdArticle} aria-label="quantité de l'article, selectionner une quantité pour la modifier">

                  <option id="selected"value="${Item.QuantiteArticle}" selected="selected">${Item.QuantiteArticle}</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                
                </select>
              </div>
            </div>
            <button type="button" aria-label ="supprimer l'article" value="suppress" class="suppress-btn mt-5 mt-sm-0"><i class="fas fa-trash-alt"></i></button>
          </div> 
            
          <div class="item-price">
          
              
              <input type="hidden" name="productCode" value="${Item.IdArticle}">
            
              
          </div>
        
  
          `
      ).join(' ');
      document.querySelector("#CartTableBody").innerHTML = allCartItems;
      
    }
  }
getAllStorage();
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
    


//-------------------------------- display le prix final----------------------------------------------

const displayNewTotal = ()=>{
        
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
      
    
    }
    if(basketItems.length==0){
    displayAnEmptyCart();
   
    };
    displayNewTotal(); 
 
}
removeArticleFromCart();



//----------------------------------changer la quantite du produit-------------------------------------------
const changeQuantite=()=>{

   document.getElementById('actualiser').addEventListener('click',()=>{

    let selectNewQuantite=Array.from(document.querySelectorAll('select'))
    
      for (let i=0; i< basketItems.length; i++){
        let newQuantite= parseInt(selectNewQuantite[i].value);
        basketItems[i].QuantiteArticle=newQuantite;
    
    }
   
  localStorage.setItem("produit", JSON.stringify(basketItems));

  getAllStorage();
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
const checkAndSend=()=>{
formulaire.addEventListener('submit', (e)=>{

  e.preventDefault();             // empeche le reload de la page

  var valid= true;                // verifier la validite avec l'API de verification integree a l'hTML
  
  const check =()=>{    
    
    for (let input of inputs){
      
        valid = valid && input.reportValidity();

        
        if (!valid){// si valid =true, montrer un erreur en rouge sous l'input avec l'erreur
          e.preventDefault();
          console.log('not valid');
          input.nextElementSibling.classList.add('show');
          
          break;
          
        }else if (input.value==' ' || input.value.length < 2 ) {// l'input ne peut pas conternir seulement un espace ou moins de deux caracteres
          valid=false;
          e.preventDefault();
          input.nextElementSibling.classList.add('show');
      
          break;

        }
        
      }}
    check();

    if(basketItems.length === 0){// empeche l'evois du formulaire si il est vide
    alert('Votre panier est vide!')}

    // else if (!valid){
    //   check();
    // }

    else if (valid){// si valid recupere le prix total de la commande
      e.preventDefault();

      let totalCommande= getAllPrices();

      localStorage.setItem('totalPrice',JSON.stringify(totalCommande) )
    
      let contactData={// recupere les donnees du fornulaire
        firstName: inputs[0].value,
        lastName: inputs[1].value,
        address: inputs[3].value,
        city: inputs[4].value,
        email: inputs[2].value
      }

      let productsData=[];// recupere les id des produits du panier

      for (let item of basketItems){
        productsData.push(item.IdArticle);
      }

      var myInit = { method: "POST",//configure la methode post pour fonction postData d'envoyer les donnes a l'API
                    headers: {
                      "Content-Type": "Application/json",
                    },
                    body: JSON.stringify({
                      contact: contactData,
                      products: productsData
                    }),
                    mode: 'cors',
                    };

      const postData = () => {// post les donnees, recupere la reponse de l"API et l'id de commande et permet d'envoyer sur la page de remerciement
          fetch('http://localhost:3000/api/cameras/order', myInit)       
          .then ((response)=> response.json())
          .then (json => {
            let order= json.orderId;
            localStorage.setItem('order', JSON.stringify(order));//met l'id de commade dans le local storage
            window.location.href="./thanksorder.html";
          })
          
          

      };
      postData();
      checkAndSend();

    }else{
    
    console.log('error');
    }
  
}

)
}
checkAndSend();
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



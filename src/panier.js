//----------------------recuperation des donnees du localStorage//---------------------------------------

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
          <td>  <button value="suppress" class="suppress-btn"><i class="fas fa-times"></i></button></td>
          </tr>
        
  
          `
      ).join(' ');
      document.getElementById("CartTableBody").innerHTML = allCartItems;
      
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
    document.getElementById('CartTable').innerHTML =`<p class="empty-cart text-center">Votre panier est vide</p>
    <div class="btn fillUP btn-sub"><a href="index.html">Remplir votre panier</a></div>`}
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


const submit=()=>{
document.forms['coordonees'].addEventListener('submit',(e)=>
{
  e.preventDefault();
  let erreur;
  let inputs = this;

  //check si le panier est vide-------------------------
  if(basketItems.length==0){
    return false;
  }
  
  //check le prenom-------------------------

    if (/^[^0-9±!@£$%^&*_+§¡€#¢§¶•ªº«\\<>?:;|=.,]{1,20}$/.test(inputs ['firstName'])){
      console.log('ok');
   }else{
       erreur= 'Ce champ ne doit pas contenir de caracteres speciaux ou de chiffres'
    document.getElementById("erreur-prenom").innerText=erreur
    }

  //check le nom-----------------------------
    if (/^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\<>?:;|=.,]{1,20}$/.test(inputs ['lastName'])){
      console.log('ok');
    }else{
      erreur= 'Ce champ ne doit pas contenir de caracteres speciaux ou de chiffres'
      document.getElementById("erreur-nom").innerText=erreur
    }

  // check l'email---------------------------
  
  // check l'adresse ----------------------------
  // if (/^[a-zA-Z0-9\s,.'-]{3,}$/.test(inputs ['adress'])){
  //   console.log('ok');
  //   }
  //check la ville ------------------------------

})

}
submit();





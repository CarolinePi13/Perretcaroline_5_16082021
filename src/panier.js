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
            <button type="reset" value="suppress" class="suppress-btn"><i class="fas fa-times"></i></button>
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
console.log(displayTotalPrice);
document.querySelector(".total-produit").innerText = `
Total commande : ${displayTotalPrice}.00 $

`};
displayNewTotal();
//supprimer un article
const removeArticleFromCart = ()=>{
    let deleteBtn =document.querySelectorAll('.suppress-btn');
     for (let i= 0; 0<deleteBtn.length; i++){
            deleteBtn[i].addEventListener("click",(e)=>{ 
           let selectedArticle=basketItems[i];
           const remove=basketItems.filter(elmt => elmt !== selectedArticle);
           basketItems=remove;
           addStorageToPage();
           localStorage.setItem("produit", JSON.stringify(basketItems));
           removeArticleFromCart();
           
        }
       );
       displayNewTotal();
    }
    document.getElementById("panier").innerHTML = `<p class="empty-cart text-center">Votre panier est vide</p>`;
    displayNewTotal();
}
removeArticleFromCart();

//envoyer les donnees du formulaire et les produits

//clear localStorage

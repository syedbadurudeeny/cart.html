let shop = document.getElementById("shop");


let shoppingItems = [{
    id: "shirt1",
    imgLink : "Img1.jpg.jpg",
    price : 250 ,
    desc : "The customer himself, the customer will be able to pursue the adipiscing of the company. Architect, for pain! Born to refuse the flattery of life!",
    name : "casual shirt"
},{
    id: "shirt2",
    imgLink : "Img2.jpg.jpg",
    price : 274,
    desc : "The customer himself, the customer will be able to pursue the adipiscing of the company. Architect, for pain! Born to refuse the flattery of life!",
    name : "Suit Mens"
},{
    id: "shirt3",
    imgLink : "Img3.jpg.jpg",
    price : 399 ,
    desc : "The customer himself, the customer will be able to pursue the adipiscing of the company. Architect, for pain! Born to refuse the flattery of life!",
    name : "T - shirt"
},{
    id: "shirt4",
    imgLink : "Img4.jpg.jpg",
    price : 455,
    desc : "The customer himself, the customer will be able to pursue the adipiscing of the company. Architect, for pain! Born to refuse the flattery of life!",
    name : "plane shirt"
}]

var basket = JSON.parse(localStorage.getItem("data")) || []

function generateShop() {
    return (shop.innerHTML = shoppingItems.map((x) =>{
        let {id, imgLink, price, desc, name} = x;
        let search = basket.find((x)=> x.id === id) || []
       return `<div class="item">
       <div id="cartImg">
            <img src=${imgLink} width="190px">
            <div class="cartItemsContents">  
               <h3 class="name">${name}</h3>
               <p class="paraLorem">
                  ${desc}</p>
               <div class="butttons">
                   <h3 class="price">${price}</h3>
                   <div class="addButtons">
                   <i onclick ="increment(${id})" class="fa-solid fa-plus"></i>
                   <h3 id=${id} class="quantity">${search.item === undefined? 0 : search.item}</h3>
                   <i onclick ="decrement(${id})" class="fa-solid fa-minus"></i>
               </div>
               </div>
            </div>
           </div>
   </div>` 
}).join(""))
}

generateShop();


function increment(id){
    let shoppingproduct = id;
    
    let search = basket.find((x)=> x.id === shoppingproduct.id)

    if(search === undefined){
    basket.push({
        id : shoppingproduct.id,
        item : 1
    })
}
else{search.item += 1}
update(shoppingproduct.id)

localStorage.setItem("data",JSON.stringify(basket))
}

function decrement(id){
    let shoppingproduct = id;
    
    let search = basket.find((x)=> x.id === shoppingproduct.id)
    if(search === undefined) return
    else if(search.item === 0){
   return
}
else{search.item -=1}

update(shoppingproduct.id)

basket = basket.filter((x)=> x.item !==0);

localStorage.setItem("data",JSON.stringify(basket))
}

function update(id){
    let insert = id;
    let search = basket.find((x)=> x.id === insert)
    document.getElementById(id).innerHTML = search.item;
    calculation();
}

function calculation(){
   let cals = document.getElementById("quantityCart")
   cals.innerHTML = basket.map((x)=> x.item).reduce((x,y) => x + y , 0); 
}

calculation()


let shoppingItems = [{
    id: "shirt1",
    imgLink : "Img1.jpg.jpg",
    price : 250 ,
    desc : "The customer himself, the customer will be able to pursue the adipiscing of the company. Architect, for pain! Born to refuse the flattery of life!",
    name : "Casual Shirt"
},{
    id: "shirt2",
    imgLink : "Img2.jpg.jpg",
    price : 274,
    desc : "The customer himself, the customer will be able to pursue the adipiscing of the company. Architect, for pain! Born to refuse the flattery of life!",
    name : "Formals Shirt"
},{
    id: "shirt3",
    imgLink : "Img3.jpg.jpg",
    price : 399,
    desc : "The customer himself, the customer will be able to pursue the adipiscing of the company. Architect, for pain! Born to refuse the flattery of life!",
    name : "Full Plane Lycra"
},{
    id: "shirt4",
    imgLink : "Img4.jpg.jpg",
    price : 455,
    desc : "The customer himself, the customer will be able to pursue the adipiscing of the company. Architect, for pain! Born to refuse the flattery of life!",
    name : "Suit For Mens"
}]


let label = document.getElementById('label')
let shoppingCart = document.getElementById('shopping-cart')

let basket = JSON.parse(localStorage.getItem("data")) || [];

function calculation(){
    let cals = document.getElementById("quantityCart")
    cals.innerHTML = basket.map((x)=> x.item).reduce((x,y) => x + y , 0); 
 }
 
 calculation();

let generateCartItem = () =>{
    if(basket.length !== 0){
    return (shoppingCart.innerHTML = basket.map((x)=> {
     let { id , item} = x;
     let search = shoppingItems.find((y)=> y.id === id) || [];
        return `
        <div class="cart-item">
       <img width="50px" src=${search.imgLink} alt="load img" class="images" />
       <div class="details">

       <div class="title-price-x">
       <h4>
       <p class="pName">${search.name}</p>
       <p class="cost">${search.price}</p>
       </h4>
       <i onclick="removeItem(${id})" class="fa-solid fa-xmark"></i>
       </div>

       
       <div class="addButtons localBtn">
       <i onclick ="increment(${id})" class="fa-solid fa-plus"></i>
       <h3 id=${id} class="quantity">${item}</h3>
       <i onclick ="decrement(${id})" class="fa-solid fa-minus"></i>
       </div>
       
       <h3>${item * search.price }</h3>
       </div>
       </div>
        </div> 
       `
    }).join(" "));
    }
    else{
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="cart.html">
        <button class="HomeBtn">Back To Home</button>
        </a>
        `;
    }
 }

 generateCartItem();

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
generateCartItem();
localStorage.setItem("data",JSON.stringify(basket))
}

function decrement(id){
    let shoppingproduct = id;
    
    let search = basket.find((x)=> x.id === shoppingproduct.id)
    if(search === undefined) return
    else if(search.item === 0) return
else{search.item -=1}

update(shoppingproduct.id)

basket = basket.filter((x)=> x.item !==0);
generateCartItem();
localStorage.setItem("data",JSON.stringify(basket))
}

function update(id){
    let insert = id;
    let search = basket.find((x)=> x.id === insert)
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
}

function removeItem(id){
let selecteditem = id;

basket = basket.filter((x)=> x.id !== selecteditem.id);
generateCartItem();
TotalAmount();
calculation();
localStorage.setItem("data",JSON.stringify(basket))
}

function clearCart()
{
    basket = [];
    generateCartItem();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket))
}
function TotalAmount(){
    if(basket.length !== 0){
       let amount = basket.map((x)=>{
        let {item , id} = x;
        let search = shoppingItems.find((y)=> y.id === id) || [];
        return item * search.price;
       }).reduce((x, y) => x + y, 0)
       console.log(amount)
       label.innerHTML = `
       <h2>Total Bill : ${amount}</h2>
       <button class="checkout">Checkout</button>
       <button onclick="clearCart()" class="removeAll">Clear Cart</button>
       `;
    }

}
TotalAmount();
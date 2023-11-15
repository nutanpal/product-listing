let productDiv = document.querySelector(".product")
let categoryListDiv = document.querySelector(".categoryList");
let allCat = [];
// let  checkCat =["men's clothing","jewelery","electronics","women's clothing"]
// console.log(checkCat.includes("women's clothing"));

let displayProduct = async ( allCheckCat=[]) => {
  // categoryListDiv.innerHTML = '';
  productDiv.innerHTML = "";
  let product = await fetch("https://fakestoreapi.com/products");
  let finalProduct = await product.json();
// console.log(finalProduct);
  finalProduct.forEach((element) => {
    // finalProduct.forEach(element =>{
    //   productDiv.innerHTML += `<div class="productItems">
    //        <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="">
    //        <p>Price $109.95 | 4 </p>
    //       <h3>Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops </h3>
    //   </div>`

    // distinct category data
    if (!allCat.includes(element.category)) {
      categoryListDiv.innerHTML += `<label>
          <input type="checkbox" value="${element.category}" onclick='catFilter()'> ${element.category}
          </label>`;
      allCat.push(element.category);
    }
    // when all checkboxes are checked or none selected - whole list displayed but when particular categories selected - filter to only those product categories.
    //if nothing is checked - all cat selected-put all 4 categories
    if (allCheckCat.length == 0) {
      allCheckCat = allCat;
      // console.log("hello");
    }
    if (allCheckCat.includes(element.category)) {
      //product data
      productDiv.innerHTML += `<div class="productItem">
        <img src="${element.image}" alt="product image">
        <h4>${element.category}</h4>
        <p>Price $ ${element.price}| rate: ${element.rating.rate}</p>
      <h3>${element.title}</h3>
      </div>`;
      //
    }
  });
};
displayProduct();
let catFilter = () => {
  let checkInput = document.querySelectorAll("input[type=checkbox]");
  let checkdata = [];
  checkInput.forEach((e) => {
    if (e.checked) {
      //console.log(e)
      console.log(e.value);
      checkdata.push(e.value);
    }
  })
  console.log(checkdata);
  displayProduct(checkdata)

}

/* the api is 3rd party so use async awiat as getting data can take time The function has to be async for the await to work.
  fetch api with await and get out of to json - has to  await too.
  keep category data before product data as its based on what we choose to filter*/

  /*binded the function onclick of the label in loop
when checkbox working function fired as the data already loaded. Cant do directly as the fun will be called before data loaded and node empty error.
-pass checkdata as parameter in displayProduct function

- need to show distinct category names not all 20 . label tag has to be dynamic.
*/ 
  
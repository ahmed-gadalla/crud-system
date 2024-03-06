var productNameInput = document.getElementById("productNameInput");

var productPriceInput = document.getElementById("productPriceInput");

var productCategoryInput = document.getElementById("productCategoryInput");

var productDescriptionInput = document.getElementById(
  "productDescriptionInput"
);
var updateIndex = 0;

productList = [];

var searchInput = document.getElementById("searchInput");

if (localStorage.getItem("product") != null) {
  productList = JSON.parse(localStorage.getItem("product"));
  displayData();
}

function addProduct() {
  if (regexName()) {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      description: productDescriptionInput.value,
    };
    productList.push(product);
    localStorage.setItem("product", JSON.stringify(productList));
    clearForm();

    displayData();

    console.log(productList);
  } else {
    notmatch();
  }
}

function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
}

function displayData() {
  var box = "";

  for (var i = 0; i < productList.length; i++) {
    box += `<tr>
        <td> ${productList[i].name} </td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>

        <td> ${productList[i].description} </td>

        <td> <button class="btn btn-warning " onclick= "setData(${i})">update</button> <button class="btn btn-danger " onclick = " deleteItem (${i} )  ">delete</button></td>
      </tr>`;
  }

  document.getElementById("tableBody").innerHTML = box;
}

function deleteItem(index) {
  productList.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(productList));
  displayData();
}

function regexName() {
  var regex = /^[A-Z][a-z]{2,8}$/;
  return regex.test(productNameInput.value);
}

function notmatch() {
  alert("name not match");
}

function search() {
  var term = searchInput.value;

  var box = "";

  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
      box += `<tr>
      <td> ${productList[i].name} </td>
      <td>${productList[i].price}</td>
      <td>${productList[i].category}</td>

      <td> ${productList[i].description} </td>

      <td> <button class="btn btn-warning ">update</button> <button class="btn btn-danger ">delete</button></td>
    </tr>`;
    }
  }

  document.getElementById("tableBody").innerHTML = box;
}

function setData(index) {
  updateIndex = index;
  var curentProduct = productList[index];
  productNameInput.value = curentProduct.name;
  productPriceInput.value = curentProduct.price;
  productCategoryInput.value = curentProduct.category;
  productDescriptionInput.value = curentProduct.description;
  // document.getElementById("addBtn").classList.remove("d-block");
  document.getElementById("addBtn").classList.add("d-none");
  document.getElementById("updateBtn").classList.remove("d-none");
  // document.getElementById("updateBtn").classList.add("d-block");

  console.log(curentProduct);
}

function updateProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
  };
  productList.splice(updateIndex, 1, product);
  localStorage.setItem("product", JSON.stringify(productList));

  displayData();
  clearForm();
  document.getElementById("addBtn").classList.remove("d-none");
  document.getElementById("updateBtn").classList.add("d-none");
}

/// <reference types="../JS/@types/jquery" />

let recipesList = [];
let listOfCategoriesData = [];
let categoryList = [];
let listOfAreas = [];
let listOfIngredients=[];
let listMealsFromIngredients=[];


// Function to fetch all recipes
async function fetchAllRecipes() {
  try {
    $(".loading").removeClass("d-none").addClass("d-flex");
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    recipesList = data.meals;
    $(".loading").removeClass("d-flex").addClass("d-none");
    display(recipesList);
  } catch (error) {
    alert("No meal with that name or there was a network error: " + error.message);
  }
}

// Function to display meals on the homepage
function display(recipes) {
  let allMeals = "";
  const mealCount = Math.min(recipes.length, 25);
  for (let i = 0; i < mealCount; i++) {
    allMeals += `
      <div class="col-md-3 displayo">
          <div class="item">
              <img src="${recipes[i].strMealThumb}" alt="${recipes[i].strMeal}" class="w-100" />
              <div class="caption">
                  <h3>${recipes[i].strMeal}</h3>
              </div>
          </div>
      </div>`;
  }
  $(".row").html(allMeals);
}

fetchAllRecipes(); // Initial fetch

// Aside functionality
function openAside(callBack) {
  $(".side").css({ left: "0" });
  $(".open-aside").addClass("d-none");
  $(".close-aside").removeClass("d-none");
  if (typeof callBack === "function") callBack();
}

$(".open-aside").on("click", function () {
  openAside(() => $(".trans").delay(100).slideDown(1000));
});

function closeAside(callBack) {
  $(".side").css({ left: "-300px" });
  $(".open-aside").removeClass("d-none");
  $(".close-aside").addClass("d-none");
  if (typeof callBack === "function") callBack();
}

$(".close-aside").on("click", function () {
  closeAside(() => $(".trans").slideUp(1000));
});

// Display meal info when a meal is clicked
$(".row").on("click", ".col-md-3.displayo, .col-md-3.displayu ,.col-md-3.displayt ,.col-md-3.displayz", async function (e) {
    let mealName = $(e.target).closest(".col-md-3").find("h3").text();
    let mealData = await fetchRecipesByMealName(mealName);
    
    if (mealData && mealData.meals && mealData.meals.length > 0) {
      let currentMeal = mealData.meals[0];
      displayMealInfo(currentMeal);
    } else {
      alert("Meal not found or details are unavailable.");
    }
  });
  

// Fetch meal by name
async function fetchRecipesByMealName(mealName) {
  try {
    $(".loading").removeClass("d-none").addClass("d-flex");
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    $(".loading").removeClass("d-flex").addClass("d-none");
    return data;
  } catch (error) {
    alert("No meal with that name or there was a network error: " + error.message);
  }
}

// Display detailed meal info
function displayMealInfo(meal) {
  $("header").html(`
    <div class="container py-5 text-white">
      <div class="row">
        <div class="col-md-4">
          <img src="${meal.strMealThumb}" class="w-100" alt="${meal.strMeal}" />
          <h3>${meal.strMeal}</h3>
        </div>
        <div class="col-md-8">
          <h2>Instructions</h2>
          <p>${meal.strInstructions}</p>
          <h4>Area: ${meal.strArea}</h4>
          <h4>Category: ${meal.strCategory}</h4>
          <h4>Ingredients:</h4>
          <ul class="list-unstyled d-flex flex-wrap">${generateIngredients(meal)}</ul>
          <h3 class="mb-3">Tags: ${meal.strTags || "N/A"}</h3>
          <a href="${meal.strSource}" class="btn btn-success">Source</a>
          <a href="${meal.strYoutube}" class="btn btn-danger">YouTube</a>
        </div>
      </div>
    </div>`);
}

// Generate ingredients HTML list
function generateIngredients(meal) {
  let ingredientsHTML = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) ingredientsHTML += `<li class="alert alert-info m-2 p-1">${measure ? measure + " " : ""}${ingredient}</li>`;
  }
  return ingredientsHTML;
}


$(".category").on("click", async function () {
  closeAside();
  const categoriesData = await fetchCategories();
  if (categoriesData) {
      categoryInsteadOfHeader();
  }
});

// Fetch and display categories
async function fetchCategories() {
try {
  $(".loading").removeClass("d-none").addClass("d-flex");
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  if (!response.ok) throw new Error("Network response was not ok");

  const data = await response.json();
  $(".loading").removeClass("d-flex").addClass("d-none");
  categoryList = data.categories;
  return data;
} catch (error) {
  $(".loading").removeClass("d-flex").addClass("d-none");
  alert("No meal with that name or there was a network error: " + error.message);
  return null; // Return null if there was an error
}
}

// Display categories
function categoryInsteadOfHeader() {
if (categoryList && categoryList.length > 0) { // Check if categoryList has data
  let allCategories = categoryList.map(category => `
    <div class="col-md-3 displayi">
      <div class="item">
        <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="w-100" />
        <div class="caption">
          <h4>${category.strCategory}</h4>
          <p>${category.strCategoryDescription}</p>
        </div>
      </div>
    </div>`).join('');
  
  $(".row").html(allCategories);
  console.log("hello from instead of");
} else {
  console.log("No categories available to display.");
}
}


// fetch Meals In side Categories
async function fetchMealsInsideCategories(mealName) {
    try {
      $(".loading").removeClass("d-none").addClass("d-flex");
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`);
      if (!response.ok) throw new Error("Network response was not ok");
  
      const data = await response.json();
      $(".loading").removeClass("d-flex").addClass("d-none");
      listOfCategoriesData=data;   
     
      return data;
    } catch (error) {
      alert("No meal with that name or there was a network error: " + error.message);
    }
}


//display Category Meals
function displayCategoryMeals(ayhaga){
    let allMeals = "";
    for (let i = 0; i < listOfCategoriesData.meals.length; i++) {
      allMeals += `
        <div class="col-md-3 displayu">
            <div class="item">
                <img src="${ayhaga[i].strMealThumb}" alt="${ayhaga[i].strMeal}" class="w-100" />
                <div class="caption">
                    <h3>${ayhaga[i].strMeal}</h3>
                </div>
            </div>
        </div>`;
    }
    $("header .row").html(allMeals);
}

//click on category meal
$(".row").on("click", ".col-md-3.displayi", async function (e) {
    let mealName = $(e.target).closest(".col-md-3").find("h4").text();
    let mealData = await fetchMealsInsideCategories(mealName);
    
    if (mealData && mealData.meals && mealData.meals.length > 0) {
      let currentMeal = mealData.meals;
     console.log(currentMeal);
     displayCategoryMeals(currentMeal)
    } else {
      alert("Meal not found or details are unavailable.");
    }
});


// fetch Area from API
async function fetchArea() {
    try {
        $(".loading").removeClass("d-none").addClass("d-flex");
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        $(".loading").removeClass("d-flex").addClass("d-none");
        console.log(data.meals);
        listOfAreas = data;
        return data;
    } catch (error) {
        alert("No meal with that name or there was a network error: " + error.message);
    }
}


//click on Area li
$(".area").on("click", async function () {
    closeAside();
    await fetchArea();
    areasInsteadOfHeader();
});

// Display Areas
function areasInsteadOfHeader() {
    let allCategories = ``;
    if (listOfAreas.meals && listOfAreas.meals.length > 0) {
        for (let i = 0; i < listOfAreas.meals.length; i++) {
            allCategories += `
            <div class="col-md-3 displayy text-white text-center">
                <div class="inner">
                    <i class="fa-solid fa-city fs-1"></i>
                    <h4>${listOfAreas.meals[i].strArea}</h4> 
                </div>
            </div>`;
        }
    } else {
        allCategories = `<div class="col-12"><h4>No areas found</h4></div>`; 
    }
    $(".row").html(allCategories);
}



async function fetchClickedArea(area) {
    try {
        $(".loading").removeClass("d-none").addClass("d-flex");
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        $(".loading").removeClass("d-flex").addClass("d-none");
       
        return data;
    } catch (error) {
        alert("No meal with that name or there was a network error: " + error.message);
    }
}

let listOfAreasMeals = [];

// Click event for area meals
$(".row").on("click", ".col-md-3.displayy", async function (e) {
    let mealName = $(e.target).closest(".col-md-3").find("h4").text();
    let mealData = await fetchClickedArea(mealName);
    
    if (mealData && mealData.meals && mealData.meals.length > 0) {
        listOfAreasMeals = mealData.meals; 
        console.log(listOfAreasMeals);
        displayAreasMeals(listOfAreasMeals); 
    } else {
        alert("Meal not found or details are unavailable.");
    }
});

// Display meals based on the selected area
function displayAreasMeals(meals) { 
    let allCategories = ``;

    for (let i = 0; i < meals.length; i++) { 
        allCategories += `
        <div class="col-md-3 displayt">
            <div class="item">
                <img src="${meals[i].strMealThumb}" alt="${meals[i].strMeal}" class="w-100" />
                <div class="caption">
                    <h3>${meals[i].strMeal}</h3>
                </div>
            </div>
        </div>`;
    }

    $(".row").html(allCategories); 
}

// Function to fetch ingredients
async function fetchIngredients() {
  try {
    $(".loading").removeClass("d-none").addClass("d-flex");
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
   listOfIngredients=data;
   console.log(listOfIngredients);
    $(".loading").removeClass("d-flex").addClass("d-none");
  } catch (error) {
    alert("No meal with that name or there was a network error: " + error.message);
  }
}


// Display ingredients
function ingredientsInsteadOfHeader() {
  let allCategories = ``;
      for (let i = 0; i < 21; i++) {
        const description = listOfIngredients.meals[i].strDescription ? listOfIngredients.meals[i].strDescription.slice(0,120) : " No description available "; 

          allCategories += `
          <div class="col-md-3 displayr text-white text-center">
              <div class="inner">
                 <i class="fa-solid fa-drumstick-bite fs-1"></i>
                  <h4>${listOfIngredients.meals[i].strIngredient}</h4> 
                  <p>${description}</p>
              </div>
          </div>`;
      }
  $(".row").html(allCategories);
}


// Click event for area meals
$(".row").on("click", ".col-md-3.displayr", async function (e) {
  let mealName = $(e.target).closest(".col-md-3").find("h4").text();
  let mealData = await fetchIngredientsMeals(mealName);
  
  if (mealData && mealData.meals && mealData.meals.length > 0) {
      listOfAreasMeals = mealData.meals; 
      console.log(listOfAreasMeals);
      displayIngredientsMeals(listOfAreasMeals); 
  } else {
      alert("Meal not found or details are unavailable.");
  }
});

// click on ingredients li
$(".ingredients").on("click", async function () {
  closeAside();
  await fetchIngredients();
  ingredientsInsteadOfHeader()
});


fetchIngredientsMeals("Chicken")
// Function to fetch meals from ingredients
async function fetchIngredientsMeals(meal) {
  try {
      $(".loading").removeClass("d-none").addClass("d-flex");
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      $(".loading").removeClass("d-flex").addClass("d-none");
      console.log(data.meals);
      return data; // return data here
  } catch (error) {
      alert("No meal with that name or there was a network error: " + error.message);
  }
}


//display ingredients meals
function displayIngredientsMeals(meals) { 
  let allCategories = ``;
  for (let i = 0; i < meals.length; i++) { 
      allCategories += `
      <div class="col-md-3 displayz">
          <div class="item">
              <img src="${meals[i].strMealThumb}" alt="${meals[i].strMeal}" class="w-100" />
              <div class="caption">
                  <h3>${meals[i].strMeal}</h3>
              </div>
          </div>
      </div>`;
  }

  $(".row").html(allCategories); 
}




function contactUsInsteadOfHeader() {
  $("header .container .row").addClass("vh-100 d-flex justify-content-center align-items-center align-content-center");
  $("header .container .row").html(`
    <div class="col-md-6">
      <input type="text" placeholder="Enter Your Name" class="form-control" id="name"/>
      <p class="text-danger alert alert-danger mt-3 d-none">Minimum length 4 letters</p>
    </div>
    <div class="col-md-6">
      <input type="email" placeholder="Enter Your Email" class="form-control" id="email"/>
      <p class="text-danger alert alert-danger mt-3 d-none">Email not valid *example@yyy.zzz</p>
    </div>
    <div class="col-md-6">
      <input type="text" placeholder="Enter Your Phone" class="form-control" id="phone"/>
      <p class="text-danger alert alert-danger mt-3 d-none">It should include 11 digits starting with (010/011/012/015)</p>
    </div>
    <div class="col-md-6">
      <input type="number" placeholder="Enter Your Age" class="form-control" id="age"/>
      <p class="text-danger alert alert-danger mt-3 d-none">Age from 18 to 80</p>
    </div>
    <div class="col-md-6">
      <input type="password" placeholder="Enter Your Password" class="form-control" id="password"/>
      <p class="text-danger alert alert-danger mt-3 d-none">It must contain at least one capital letter, numbers, and not less than 8 characters.</p>
    </div>
    <div class="col-md-6">
      <input type="password" placeholder="Enter Your Repassword" class="form-control" id="password2"/>
      <p class="text-danger alert alert-danger mt-3 d-none">Passwords do not match</p>
    </div>
    <div class="col-md-12 d-flex justify-content-center align-items-center">
      <button id="submitBtn" disabled class="btn btn-outline-danger px-3 mt-3">Submit</button>
    </div>
  `);

}

function validation(id) {
  var regex = {
    name: /^[A-Z][a-zA-Z]{3,10}$/,  // Name: First letter uppercase, 4-11 characters
    email: /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email: Standard email regex
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,  // Password: At least 1 letter, 1 number, 8 characters
    phone: /^(010|011|012|015)\d{8}$/, // Phone: Start with 010/011/012/015 and 11 digits
    age: /^(1[8-9]|[2-7][0-9]|80)$/  // Age: Between 18 and 80
  };

  var myString = $("#" + id).val();

  if (regex[id].test(myString)) {
    $("#" + id).next(".alert").hide();  // Hide error message if valid
    return true;
  } else {
    $("#" + id).next(".alert").show();  // Show error message if invalid
    return false;
  }
}


// Function to validate the entire form
function validateForm() {
  let isValid = true;

  $("input").each(function() {
    let fieldId = $(this).attr("id");
    if (!validation(fieldId)) {
      isValid = false;
    }
  });

  if (isValid) {
    $("#submitBtn").prop("disabled", false);  // Enable submit button if all fields are valid
  } else {
    $("#submitBtn").prop("disabled", true);  // Disable submit button if any field is invalid
  }
}

$("input").on("input", function() {
  validateForm();
});



// click on contact us li
$(".contactUs").on("click", async function () {
  closeAside();
  contactUsInsteadOfHeader()

});


// click on search li
// This function is triggered when the search button is clicked
$(".search").on("click", async function () {
  closeAside();  // Close the side menu
  searchInsteadOfHeader();  // Replace header with search input fields
});

// This function replaces the header with search input fields
function searchInsteadOfHeader() {
  $("header").html(`
    <div class="container py-5">
      <div class="row">
        <div class="col-md-6">
          <input type="text" class="form-control searchByName" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
          <input type="text" class="form-control searchByLetter" placeholder="Search By First Letter">
        </div>
      </div>
      <div class="row cartona py-3 g-3"></div>
    </div>
  `);
}

// Function to display searched meals
function displaySearchedMeals(recipes) {
  let cartona = "";
  
  // If no meals are found, display a "No meals found" message
  if (recipes.length === 0) {
    cartona = `<div class="col-12 text-center">No meals found</div>`;
  } else {
    // Loop through the recipes and create meal cards
    for (let i = 0; i < recipes.length; i++) {
      cartona += `
        <div class="col-md-3 displayn">
          <div class="item">
            <img src="${recipes[i].strMealThumb}" alt="${recipes[i].strMeal}" class="w-100" />
            <div class="caption">
              <h3>${recipes[i].strMeal}</h3>
            </div>
          </div>
        </div>`;
    }
  }

  // Insert the created meal cards into the .row.cartona container
  $(".row.cartona").html(cartona);
  
  // Attach the click event handler for dynamically added .displayn elements
  $(".row").on("click", ".col-md-3.displayn", async function (e) {
    // Get the meal name from the clicked element
    let mealName = $(e.target).closest(".col-md-3").find("h3").text();
    
    // Fetch meal data by meal name
    let mealData = await fetchRecipesByMealName(mealName);
    
    // If meal data is found, display the meal details
    if (mealData && mealData.meals && mealData.meals.length > 0) {
      let currentMeal = mealData.meals[0];
      console.log("Meal found: ", currentMeal);
      
      displayMealInfo(currentMeal); // Call function to display detailed info
    } else {
      alert("Meal not found or details are unavailable.");
    }
  });
}



// Attach event listener for the search by name
function attachSearchListener() {
  $(document).on("input", ".searchByName", async function () {
    let myString = $(this).val().trim();
    if (myString) {
      try {
        let data = await fetchRecipesByMealName(myString);
        if (data && data.meals) {
          $(".row.cartona").empty();
          displaySearchedMeals(data.meals);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      $(".row.cartona").empty();
    }
  });
}

// Fetch recipes by name from the API
async function fetchRecipesByMealName(mealName) {
  try {
    $(".loading").removeClass("d-none").addClass("d-flex");
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    $(".loading").removeClass("d-flex").addClass("d-none");
    return data;
  } catch (error) {
    alert("No meal with that name or there was a network error: " + error.message);
  }
}

// Attach event listener for the search by first letter
function attachedSearchListener() {
  $(document).on("input", ".searchByLetter", async function () {
    let myLetter = $(this).val().trim();
    if (myLetter) {
      try {
        let data = await fetchRecipesByMealLetter(myLetter);
        if (data && data.meals) {
          $(".row.cartona").empty();
          displaySearchedMeals(data.meals);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      $(".row.cartona").empty();
    }
  });
}

// Fetch recipes by first letter from the API
async function fetchRecipesByMealLetter(mealLetter) {
  try {
    $(".loading").removeClass("d-none").addClass("d-flex");
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${mealLetter}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    $(".loading").removeClass("d-flex").addClass("d-none");
    return data;
  } catch (error) {
    alert("No meal with that name or there was a network error: " + error.message);
  }
}

// Initialize search listeners
$(function () {
  attachSearchListener(); 
  attachedSearchListener();
});




























































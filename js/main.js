var $form = document.querySelector('form');
var $name = document.querySelector('.name-input');
var $heightFeet = document.querySelector('#feet');
var $heightInches = document.querySelector('#inches');
var $age = document.querySelector('#age');
var $activity = document.querySelector('#activity-select');
var $goals = document.querySelector('#goals-select');

$form.addEventListener('submit', createProfile);

function createProfile(event) {

  event.preventDefault();

  var profile = {
    name: $name.value,
    heightFeet: $heightFeet.value,
    heightInches: $heightInches.value,
    age: $age.value,
    activity: $activity.value,
    goal: $goals.value
  };
}

function foodSearch(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.edamam.com/api/nutrition-data?app_id=7ada5aa0&app_key=2c532783d51fc65b4be5f8b072764ff1&nutrition-type=logging&ingr=' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var foodData = xhr.response;
    // console.log(foodData);
    var servingSize = Math.floor(foodData.totalWeight);
    var calories = Math.floor(foodData.calories);
    var carbs = Math.floor(foodData.totalNutrients.CHOCDF.quantity);
    var protein = Math.floor(foodData.totalNutrients.PROCNT.quantity);
    var fat = Math.floor(foodData.totalNutrients.FAT.quantity);

    // console.log(name, 'serving size: ', servingSize, 'grams');
    // console.log(name, 'calorie count: ', calories);
    // console.log(name, 'carbs count: ', carbs, 'grams');
    // console.log(name, 'protein count: ', protein, 'grams');
    // console.log(name, 'fat count: ', fat, 'grams');

    var $calories = document.createElement('li');
    $calories.textContent = 'calorie count: ' + calories;
    var $carbs = document.createElement('li');
    $carbs.textContent = 'carb count: ' + carbs + ' grams';
    var $protein = document.createElement('li');
    $protein.textContent = 'protein count: ' + protein + ' grams';
    var $fat = document.createElement('li');
    $fat.textContent = 'fat count: ' + fat + ' grams';
  }
  );
  xhr.send();
}

foodSearch('avocado');

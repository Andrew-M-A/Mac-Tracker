var $account = document.querySelector('[data-view="account"');
var $profile = document.querySelector('[data-view="profile"');
var $form = document.querySelector('form');
var $name = document.querySelector('.name-input');
var $gender = document.querySelector('#gender');
var $heightFeet = document.querySelector('#feet');
var $heightInches = document.querySelector('#inches');
var $weight = document.querySelector('#weight');
var $age = document.querySelector('#age');
var $activity = document.querySelector('#activity-select');
var $goals = document.querySelector('#goals-select');

$form.addEventListener('submit', createProfile);

function createProfile(event) {

  event.preventDefault();

  var profile = {
    name: $name.value,
    gender: $gender.value,
    heightFeet: $heightFeet.value,
    heightInches: $heightInches.value,
    weight: $weight.value,
    age: $age.value,
    activity: $activity.value,
    goal: $goals.value
  };

  renderProfile(profile);
}

function renderProfile(profile) {

  var $profName = document.querySelector('#profile-name');
  $profName.textContent = profile.name + '\'s' + ' Profile';

  var $profAge = document.querySelector('#prof-age');
  $profAge.textContent = 'Age: ' + profile.age;

  var $profHeight = document.querySelector('#prof-height');
  $profHeight.textContent = 'Height: ' + profile.heightFeet + '\'' + profile.heightInches + '"';

  var $profWeight = document.querySelector('#prof-weight');
  $profWeight.textContent = 'Weight: ' + profile.weight;

  var $profActivity = document.querySelector('#prof-activity');
  $profActivity.textContent = 'Activity Level: ' + profile.activity;

  var $profGoal = document.querySelector('#prof-goal');
  $profGoal.textContent = 'Goal: ' + profile.goal;

  var totalInches = parseInt(profile.heightFeet) * 12 + parseInt(profile.heightInches);

  // MIFFLIN - ST JEOR EQUATION
  var bmrMale = Math.floor((4.536 * profile.weight) + (15.88 * totalInches) - (5 * profile.age) + 5);

  var bmrFemale = Math.floor((4.536 * profile.weight) + (15.88 * totalInches) - (5 * profile.age) - 161);

  if (profile.gender === 'male') {
    profile.bmr = bmrMale;
  } else {
    profile.bmr = bmrFemale;
  }

  console.log(profile.activity);

  if (profile.activity === 'sedentary') {
    console.log('workin');
  } else if (profile.activity === 'light') {
    console.log('gettin there');
  } else if (profile.activity === 'moderate') {
    console.log('be readyyyyy');
  } else {
    console.log('come on girl, lesss goooo');
  }

  $account.className = 'hidden';
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

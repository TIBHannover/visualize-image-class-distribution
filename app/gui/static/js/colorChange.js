$(document).ready(function () {
var r = document.querySelector(':root');
console.log(r)
// Create a function for setting a variable value
$(".blue").click(function blue() {
  // Set the value of variable --blue to another value (in this case "lightblue")
  r.style.setProperty('--background', 'white');
  r.style.setProperty('--header', '#5152FC');
  r.style.setProperty('--highlight', '#5152FC');
  r.style.setProperty('--redish', '#4CAFFF');
  r.style.setProperty('--redhover', '#4CAFFF');
});

$(".yellow").click(function blue() {
  // Set the value of variable --blue to another value (in this case "lightblue")
  r.style.setProperty('--background', '#ABD699');
  r.style.setProperty('--header', '#16123F');
  r.style.setProperty('--highlight', '#FFE26A');
  r.style.setProperty('--redish', '#C7DDCC');
  r.style.setProperty('--redhover', '#75C9B7');
});

$(".paris").click(function blue() {
  // Set the value of variable --blue to another value (in this case "lightblue")
  r.style.setProperty('--background', '#FBA92C');
  r.style.setProperty('--header', '#141414');
  r.style.setProperty('--highlight', '#FFFFFF');
  r.style.setProperty('--redish', '#565656');
  r.style.setProperty('--redhover', '#9E9E9E');
});

});

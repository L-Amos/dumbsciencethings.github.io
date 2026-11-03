/* CONSTANTS */
var POTATO_ENERGY = 1650.914339

/**
 * Calculates and displays the number of potatoes required to output a certain power for certain number of hours.
 * @returns none
 */
function calc_num_potatoes() {
    /* Check inputs */
    power = Number(document.forms["potato_calc"]["power"].value) ;
    if (!check_positive_number(power)) {
      return
    }
    time = Number(document.forms["potato_calc"]["time"].value) ;
    if (!check_positive_number(time)) {
      return
    }
  /* Calculate and display required number of potatoes */
  num_potatoes = Math.ceil((power * time * 3600)/(POTATO_ENERGY))
  document.getElementById("potatoes_answer").innerHTML = "To power your " + power + "W device for " + time + " hours, you would need <strong>" + num_potatoes + " potatoes!</strong>"
}

/**
 * Tests whether a given input is a positive number.
 * @param {float} input Input to test
 * @returns 0 if test fails, 1 if test passes.
 */
function check_positive_number(input) {
  if (isNaN(input) || (input < 0) || input == "") {
      alert("Please enter a POSITIVE NUMBER in both fields!.") ;
      return 0
    }
  return 1
}

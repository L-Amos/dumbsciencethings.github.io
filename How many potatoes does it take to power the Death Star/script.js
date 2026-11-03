/* CONSTANTS */
var POTATO_ENERGY = 1650.914339
var power
var time
var num_potatoes

/**
 * Calculates and displays the number of potatoes required to output a certain power for certain number of hours.
 * @returns none
 */
function calc_num_potatoes() {
    /* Check inputs */
    power = Number(document.forms["potato_calc"]["power"].value) ;
    if (!check_positive_number(power)) {
      console.log(power)
      console.log("This one")
      return
    }
    time = Number(document.forms["potato_calc"]["time"].value) ;
    if (!check_positive_number(time)) {
      return
    }
  /* Calculate and display required number of potatoes */
  num_potatoes = Math.ceil((power * time * 3600)/(POTATO_ENERGY))
  document.getElementById("potatoes_answer").innerHTML = `To power your ${power}W device for ${time} hours, you would need <strong>${num_potatoes} potatoes!</strong>`
}

/**
 * Calculates and displays the amount of time a given number of potatoes could power a device of given power requirements.
 * @returns none
 */
function calc_time() {
    /* Check inputs */
    var power = Number(document.forms["time_calc"]["power"].value) ;
    if (!check_positive_number(power)) {
      return
    }
    var num_potatoes = Number(document.forms["time_calc"]["num_potatoes"].value) ;
    if (!check_positive_number(num_potatoes)) {
      return
    }
  /* Calculate and display the amount of time you have */
  time = Math.round((POTATO_ENERGY*num_potatoes/(power*3600))*100)/100
  document.getElementById("time_answer").innerHTML = `If you had ${num_potatoes} potatoes, you could power your ${power}W device for <strong>${time} hours!</strong>`
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

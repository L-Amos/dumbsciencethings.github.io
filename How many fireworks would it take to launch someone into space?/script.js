/* CONSTANTS */
var M_S = 2.7
var V_S = 71
var R_E = 6378*10**3
var G = 6.67*10**-11
var M=5.97*10**24
var ESCAPE_VEL = Math.sqrt(2*G*M/R_E)
var weight
var height
var v
var m_m

/**
 * Calculates and displays the number of fireworks required to reach a certain height given a certain pilot weight.
 * @param {boolean} change_weight_height Bool value for whether weight/height has changed
 * @returns none
 */
function calc_num_fireworks(change_weight_height=false) {
  if (change_weight_height) {
    /* Check inputs */
    weight = Number(document.forms["firework_calc"]["weight"].value) ;
    if (!check_positive_number(weight)) {
      return
    }
    height = Number(document.forms["firework_calc"]["height"].value) ;
    if (!check_positive_number(height)) {
      return
    }
    /* Calculate velocity and maximum mortar mass */
    v = Math.sqrt(2*G*M*(1/R_E - 1/(R_E + height)))
    m_m = Math.floor(M_S*V_S/v*1000)/1000
    /* Set up new mortar mass slider */
    document.forms["firework_calc"]["mortar_weight"].max = m_m
    document.forms["firework_calc"]["mortar_weight"].min = m_m/10
    document.forms["firework_calc"]["mortar_weight"].step = m_m/10
    document.forms["firework_calc"]["mortar_weight"].value = m_m/2
    document.forms["firework_calc"]["mortar_weight"].disabled = false
  } 
  /* Calculate and display required number of fireworks */
  m_m = document.forms["firework_calc"]["mortar_weight"].value
  num_fireworks = Math.ceil((weight*v)/(M_S*V_S - m_m*v))
  document.getElementById("fireworks_answer").innerHTML = "The heaviest your mortar could be is " + document.forms["firework_calc"]["mortar_weight"].max + "kg. With a mortar weight of " + m_m +  "kg you would need <strong>" + num_fireworks + " fireworks!</strong>"
}

/**
 * Calculates the velocity and height reached if a pilot of a certain weight launches with a certain number of fireworks.
 * @param {boolean} change_weight_num_fireworks Bool value for whether weight/num_fireworks has changed
 * @returns none
 */
function calc_vel_height_reached(change_weight_num_fireworks=false) {
  if (change_weight_num_fireworks) {
    /* Check inputs */
    weight = Number(document.forms["height_calc"]["weight"].value) ;
    if (!check_positive_number(weight)) {
      return
    }
    num_fireworks = Number(document.forms["height_calc"]["num_fireworks"].value) ;
    if (!check_positive_number(num_fireworks)) {
      return
    }
    document.forms["height_calc"]["mortar_weight"].disabled = false;
  }
  /* Calculate */
  v = Math.sqrt(2*G*M*(1/R_E - 1/(R_E + height)))
  m_m = document.forms["height_calc"]["mortar_weight"].value
  var m_tot = weight + num_fireworks*m_m
  v = Math.round((num_fireworks*M_S*V_S)/(m_tot)*100)/100
  height = Math.round((v**2*R_E**2)/(2*G*M)*((1-(v**2*R_E)/(2*G*M))**-1)*100)/100
  v = Math.round(v*100)/100
  /* Check if escaped Earth's gravitational field */
  if (v > ESCAPE_VEL) {
    var last_part_of_answer = " <strong>escape Earth's gravitational field completely.</strong>"
  }
else {
    var last_part_of_answer = "reach a height of <strong>" + height + " metres</strong>  before crashing back to the ground."
  }
  /* Display answer */
  document.getElementById("height_answer").innerHTML = "With " + num_fireworks + " fireworks and a mortar weight of " + m_m + "kg, weighing  " + weight + "kg yourself, you would shoot up at a velocity of " + v + "m/s and " + last_part_of_answer 
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

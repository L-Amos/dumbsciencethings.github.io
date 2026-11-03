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

function calc_num_fireworks(change_weight_height=false) {
  if (change_weight_height) {
    weight = Number(document.forms["firework_calc"]["weight"].value) ;
    if (!check_positive_number(weight)) {
      return
    }
    height = Number(document.forms["firework_calc"]["height"].value) ;
    if (!check_positive_number(height)) {
      return
    }
  /* Calculate */
    v = Math.sqrt(2*G*M*(1/R_E - 1/(R_E + height)))
    m_m = Math.floor(M_S*V_S/v*1000)/1000
    document.forms["firework_calc"]["mortar_weight"].max = m_m
    document.forms["firework_calc"]["mortar_weight"].min = m_m/10
    document.forms["firework_calc"]["mortar_weight"].step = m_m/10
    document.forms["firework_calc"]["mortar_weight"].value = m_m/2
    document.forms["firework_calc"]["mortar_weight"].disabled = false
  } 
  m_m = document.forms["firework_calc"]["mortar_weight"].value
  num_fireworks = Math.ceil((weight*v)/(M_S*V_S - m_m*v))
  document.getElementById("fireworks_answer").innerHTML = "The heaviest your mortar could be is " + document.forms["firework_calc"]["mortar_weight"].max + "kg. With a mortar weight of " + m_m +  "kg you would need " + num_fireworks + " fireworks!"
}
  
function calc_vel_height_reached() {
  weight = Number(document.forms["height_calc"]["weight"].value) ;
  if (!check_positive_number(weight)) {
    return
  }
  num_fireworks = Number(document.forms["height_calc"]["num_fireworks"].value) ;
  if (!check_positive_number(num_fireworks)) {
    return
  }
  document.forms["height_calc"]["mortar_weight"].disabled = false;
  /* Calculate */
  v = Math.sqrt(2*G*M*(1/R_E - 1/(R_E + height)))
  m_m = document.forms["height_calc"]["mortar_weight"].value
  var m_tot = weight + num_fireworks*m_m
  v = Math.round((num_fireworks*M_S*V_S)/(m_tot)*100)/100
  height = Math.round((v**2*R_E**2)/(2*G*M)*((1-(v**2*R_E)/(2*G*M))**-1)*100)/100
  v = Math.round(v*100)/100
  if (v > ESCAPE_VEL) {
    var last_part_of_answer = " escape Earth's gravitational field completely."
  }
else {
    var last_part_of_answer = "reach a height of " + height + " metres before crashing back to the ground."
  }
  document.getElementById("height_answer").innerHTML = "With " + num_fireworks + " fireworks and a mortar weight of " + m_m + "kg, weighing  " + weight + "kg yourself, you would shoot up at a velocity of " + v + "m/s and " + last_part_of_answer 
}


function check_positive_number(input) {
  if (isNaN(input) || (input < 0) || input == "") {
      alert("Please enter a POSITIVE NUMBER in both fields!.") ;
      return 0
    }
  return 1
}

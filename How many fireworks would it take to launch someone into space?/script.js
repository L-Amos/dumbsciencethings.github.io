var M_S = 2.7
var V_S = 71
var R_E = 6378*10**3
var G = 6.67*10**-11
var M=5.97*10**24
var weight
var height
var v
var m_m
var escape_vel = Math.sqrt(2*G*M/R_E)

function calc() {
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
  document.forms["firework_calc"]["mortar_weight"].disabled = false
  calc_num()
}

function calc_num() {
  m_m = document.forms["firework_calc"]["mortar_weight"].value
  num_fireworks = Math.ceil((weight*v)/(M_S*V_S - m_m*v))
  document.getElementById("answer").innerHTML = "The heaviest your mortar could be is " + document.forms["firework_calc"]["mortar_weight"].max + "kg. With a mortar weight of " + m_m +  "kg you would need " + num_fireworks + " fireworks!"
}

function calc2() {
  document.forms["height_calc"]["mortar_weight"].disabled = false;
  weight = Number(document.forms["height_calc"]["weight"].value) ;
  if (!check_positive_number(weight)) {
    return
  }
  num_fireworks = Number(document.forms["height_calc"]["num_fireworks"].value) ;
  if (!check_positive_number(num_fireworks)) {
    return
  }
  /* Calculate */
  v = Math.sqrt(2*G*M*(1/R_E - 1/(R_E + height)))
  m_m = document.forms["height_calc"]["mortar_weight"].value
  var m_tot = weight + num_fireworks*m_m
  v = Math.round((num_fireworks*M_S*V_S)/(m_tot)*100)/100
  height = Math.round((v**2*R_E**2)/(2*G*M)*((1-(v**2*R_E)/(2*G*M))**-1)*100)/100
  v = Math.round(v*100)/100
  if (v > escape_vel) {
    var last_bit = " escape Earth's gravitational field completely."
  }
else {
    var last_bit = "reach a height of " + height + " metres before crashing back to the ground."
  }
  document.getElementById("answer2").innerHTML = "With " + num_fireworks + " fireworks and a mortar weight of " + m_m + "kg, weighing  " + weight + "kg yourself, you would shoot up at a velocity of " + v + "m/s and " + last_bit 
}


function check_positive_number(input) {
  if (isNaN(input) || (input < 0) || input == "") {
      alert("Please enter a POSITIVE NUMBER in both fields!.") ;
      return 0
    }
  return 1
}

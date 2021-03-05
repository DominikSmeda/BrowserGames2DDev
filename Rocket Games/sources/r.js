// $(document).ready(function () {
//
// const PLANETSIMG = ['p1.gif', 'p4.gif', 'p5.gif', 'p6.gif'];
//
// $('#boardGame').on('contextmenu', function (e) {
//
//     $('#addPlanetBox').css({'display': 'block', 'top': e.clientY, 'left': e.clientX});
//     return false;
//
// });
//
// $('#addPlanetBox #add').on('click', function() {
//       $('#addPlanetBox').css({'display': 'none'});
//       $('#planetManager').css({'display': 'block'});
// });
//
// createPlanetManager();
// function createPlanetManager(){
//
//   PLANETSIMG.forEach(function(pic) {
//     let div = $('<div>');
//     $('#planetManager').append(div);
//     let img = $('<img src="img/planets/'+pic+'"/>');
//     div.append(img);
//   });
// }
//
//
// $('#planetManager div').on('click', function(e) {
//     //e.numberPhoto = $('#planetManager div ').index(this);
//     addPlanet(e);
//
// });
//
// function addPlanet(e) {
//   let PLANETDEFAULTSIZE = 40;
//   var planet = $(`<div class="planet">`);
//   $('#boardGame').append(planet);
//   planet.css({ 'top': e.clientY - PLANETDEFAULTSIZE / 2, 'left': e.clientX - PLANETDEFAULTSIZE / 2 });
//
//   let newPlanet = { x: e.clientX - PLANETDEFAULTSIZE / 2, y: e.clientY - PLANETDEFAULTSIZE / 2 };
//   planetsCoords.push(newPlanet);
//
//   if (planetsCoords.length < 2)
//     $('#spaceShip').css({ 'top': e.clientY - PLANETDEFAULTSIZE / 2, 'left': e.clientX - PLANETDEFAULTSIZE / 2 });
//
// }
//
//
// });

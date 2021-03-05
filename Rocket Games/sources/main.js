$(document).ready(function () {

    const PLANETDEFAULTSIZE = 60;
    let planetsCoords = [];
    let isFlying = false;
    let currentPlanet = 0;

    $('#boardGame').on('click', function (e) {
        NewPlanetCoords = { x: e.clientX, y: e.clientY };
        addPlanet();
    });

    $('#step').on('click', function () {
        // console.log('setp' + currentPlanet);
        incrementCurrentPlanet();
        let x = planetsCoords[currentPlanet].x;
        let y = planetsCoords[currentPlanet].y;
        $('#spaceShip').css({ 'top': y, 'left': x });

    });

    $('#jump').on('click', function () {
        newFlight('next');
    });
    var flyTimer = 0;
    $('#fly').on('click', function () {

        if ($(this).text() == 'Fly') {
            flyTimer = setInterval(() => {
                newFlight('next');
            }, 2000);
            $(this).text('Stop');
        }
        else {
            $(this).text('Fly');
            clearInterval(flyTimer);
        }
    });

    function animateRocket() {
        if (isFlying) {
            Fly();
        }
        requestAnimationFrame(animateRocket);
    }

    animateRocket();

    let AnimationStep = 0;
    let destination = 0;

    function newFlight(dest) {

        // console.log('dest:', dest);
        if (dest == 'next') {
            destination = currentPlanet + 1;
            // console.log('undefn', destination);
        }
        else {
            destination = dest;
            // console.log('dest', destination);
        }

        $('#spaceShip').css('background-image', 'url(img/other/rocket.png)');
        isFlying = true;
        // console.log('innerdest');
    }

    function Fly() {
        // console.log('outer');
        // console.log('destination', destination)
        let startPoint = planetsCoords[currentPlanet];
        let endPoint = planetsCoords[parseInt(destination)] || planetsCoords[0];

        let vector = {
            x: (endPoint.x - startPoint.x) / 100,
            y: (endPoint.y - startPoint.y) / 100
        }

        let angle = Math.atan2(endPoint.x - startPoint.x, - (endPoint.y - startPoint.y)) * (180 / Math.PI);
        $('#spaceShip').css({ 'top': '+=' + vector.y, 'left': '+=' + vector.x, 'transform': 'rotate(' + angle + 'deg)' });
        AnimationStep++;
        if (AnimationStep == 30) {
            isFlying = false;
            moveOnCircle();
        }
        if (AnimationStep == 100) {
            setCurrentPlanet(destination);
            isFlying = false;
            AnimationStep = 0;
            $('#spaceShip').css('background-image', 'url(img/other/rocket2.png)');

        }

    }
    let planet;
    $('#boardGame').on('click', '.planet', function (e) {
        planet = $(this);
        $('#planetBox').css({ 'top': parseInt($(this).css('top')) - 20, 'left': parseInt($(this).css('left')) + 50, 'display': 'block' });

        $('#planetBox #go').on('click', function () {

            let y = parseInt(planet.css('top'));
            let x = parseInt(planet.css('left'));
            planetsCoords.forEach(function (pl, i) {
                if (pl.x == x && pl.y == y) {
                    newFlight(i);
                    $('#planetBox').css({ 'display': 'none' });
                }
            });
        });

        return false;
    });

    $('#planetBox #destroy').on('click', function () {
        let y = parseInt(planet.css('top'));
        let x = parseInt(planet.css('left'));
        planetsCoords.forEach(function (pl, i) {
            if (pl.x == x && pl.y == y) {
                planetsCoords.splice(i, 1);
                // console.log($('#boardGame div:nth-child(' + parseInt(i + 1) + ')'), i);
                $('#boardGame div:nth-child(' + parseInt(i + 1) + ')').remove();
                $('#planetBox').css({ 'display': 'none' });
                return;
            }
        });
    });

    function incrementCurrentPlanet() {
        setCurrentPlanet(currentPlanet + 1);
    }

    function setCurrentPlanet(cp) {
        currentPlanet = cp;
        if (currentPlanet >= planetsCoords.length) {
            currentPlanet = 0;
        }
        // console.log('cp: ', currentPlanet)
    }






    const BGIMG = ['bg.jpeg', 'bg.jpg', 'bg2.jpeg', 'bg3.jpeg'];
    const PLANETSIMG = ['p1.gif', 'p2.jpg', 'p4.gif', 'p5.gif', 'p6.gif', 'p8.gif', 'p9.gif', 'p2.png'];
    var NewPlanetCoords = {};
    $('#boardGame').on('contextmenu', function (e) {
        NewPlanetCoords = { x: e.clientX, y: e.clientY };
        $('#addPlanetBox').css({ 'display': 'block', 'top': e.clientY, 'left': e.clientX });
        return false;

    });

    $('#addPlanetBox #add').on('click', function () {
        $('#addPlanetBox').css({ 'display': 'none' });
        $('#planetManager').css({ 'display': 'flex' });
    });

    $('#boardGame').on('click', function () {
        $('#addPlanetBox').css({ 'display': 'none' });
        $('#PlanetBox').css({ 'display': 'none' });
    });
    createPlanetManager();
    function createPlanetManager() {

        PLANETSIMG.forEach(function (pic) {
            let div = $('<div>');
            $('#planetManager').append(div);
            let img = $('<img src="img/planets/' + pic + '"/>');
            div.append(img);
        });
        $('#planetManager').append('<div class="x">x')
    }


    $('#planetManager div').not('.x').on('click', function (e) {
        which = $('#planetManager div ').index(this);
        $('#planetManager').css({ 'display': 'none' });
        addPlanet(which);

    });

    function addPlanet(which) {
        let size = 1;
        let angle = 0;
        if (which == undefined) {
            which = Math.floor(Math.random() * PLANETSIMG.length);
            angle = Math.floor(Math.random() * 360);
            size = (Math.floor(Math.random() * 100) / 100) + 1;
            console.log(size, angle);
        }
        var planet = $(`<div class="planet">`);
        $('#boardGame').append(planet);
        planet.css({ 'top': NewPlanetCoords.y - PLANETDEFAULTSIZE / 2, 'left': NewPlanetCoords.x - PLANETDEFAULTSIZE / 2 });
        planet.css({ 'background-image': 'url(img/planets/' + PLANETSIMG[which] + ')', 'transform': 'scale(' + size + ') rotate(' + angle + 'deg)' });
        let newPlanet = { x: NewPlanetCoords.x - PLANETDEFAULTSIZE / 2, y: NewPlanetCoords.y - PLANETDEFAULTSIZE / 2 };
        planetsCoords.push(newPlanet);

        if (planetsCoords.length < 2)
            $('#spaceShip').css({ 'top': NewPlanetCoords.y - PLANETDEFAULTSIZE / 2, 'left': NewPlanetCoords.x - PLANETDEFAULTSIZE / 2 });

    }

    $("#bg").on('click', function () {
        let odp = parseInt(prompt('Zmien tlo [1-5]') - 1);
        $('#boardGame').css('background-image', 'url(img/bg/' + BGIMG[odp] + ')');

    });

    $('.x').on('click', function () {
        $(this).parent().css('display', 'none');
    });

    function moveOnCircle() {
        let rocketx = parseInt($('#spaceShip').css('left'));
        let rockety = parseInt($('#spaceShip').css('top'));
        let ox = parseInt(planetsCoords[currentPlanet].x);
        let oy = parseInt(planetsCoords[currentPlanet].y);

        //radius = Math.sqrt(Math.pow(parseInt($('#spaceShip').css('top')) - parseInt(planetsCoords[currentPlanet].y), 2) + Math.pow(parseInt($('#spaceShip').css('left')) - parseInt(planetsCoords[currentPlanet].x, 2)));
        let radius = Math.pow(rockety - oy, 2) + Math.pow(rocketx - ox, 2);
        radius = Math.sqrt(radius);
        console.log(radius);

        // let angleStart = Math.atan2(rocketx - ox, - (rockety - oy)) * (180 / Math.PI);
        function theta(cx, cy, x, y) {
            let angle = Math.degrees(Math.atan2(-(cy - y), -(cx - x)));
            return angle;
        }
        let angleStart = theta(ox, oy, rocketx, rockety)

        //ngleStart = angleStart * (Math.PI / 180);
        let angle = angleStart;
        console.log('aaa:', angle)
        function move() {
            let actualrocketx = parseInt($('#spaceShip').css('left'));
            let actualrockety = parseInt($('#spaceShip').css('top'));
            var anb = Math.atan2(actualrocketx - ox, - (actualrockety - oy)) * (180 / Math.PI) + 90;

            $('#spaceShip').css({ 'transform': 'rotate(' + anb + 'deg)' });


            rocketx = ox + Math.cos(angle * (Math.PI / 180)) * radius;
            rockety = oy + Math.sin(angle * (Math.PI / 180)) * radius;
            $('#spaceShip').css({ 'top': rockety, 'left': rocketx });
            angle++;
            if (angle >= angleStart + 360) {
                clearInterval(circleTimer);
                isFlying = true;
            }
        }

        var circleTimer = setInterval(move, 1);
    }
    Math.radians = function (degrees) {
        return degrees * Math.PI / 180;
    };

    // Converts from radians to degrees.
    Math.degrees = function (radians) {
        return radians * 180 / Math.PI;
    };
});

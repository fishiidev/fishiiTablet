console.log('JS Loaded')

var tablet_start = document.getElementById("tablet_start");
var clickingSound = document.getElementById("clickogg");


tablet_start.volume = 0.2;
clickingSound.volume = 0.2;


$('.info-page').fadeOut()
$('.garage').fadeOut()
$('.multas').fadeOut()
$('.calculadora').fadeOut()
$('.hud').fadeOut()


 
 

$(document).on('click', '.start-button', function(e){
    tablet_start.play();
    $(".loading-page").fadeOut()
    setTimeout(function(){  $(".info-page").fadeIn(500); }, 500);

});

$(document).on('click', '#volver', function(e){
    clickingSound.play();
    $(".info-page").fadeOut(500);
    setTimeout(function(){ $(".loading-page").fadeIn() }, 500);
});

$(document).on('click', '#volver2', function(e){
    clickingSound.play();
    $(".garage").fadeOut()
    setTimeout(function(){ $('.info-page').fadeIn() }, 500);
});

$(document).on('click', '#volver3', function(e){
    clickingSound.play();
    $(".multas").fadeOut()
    setTimeout(function(){ $('.info-page').fadeIn() }, 500);
});

$(document).on('click', '#volver4', function(e){
    clickingSound.play();
    $(".calculadora").fadeOut()
    setTimeout(function(){ $('.info-page').fadeIn() }, 500);
});



$(document).on('click', '#volver5', function(e){
    clickingSound.play();
    $(".hud").fadeOut()
    setTimeout(function(){ $('.info-page').fadeIn() }, 500);
});



$(document).on('click', '#garage', function(e){
    clickingSound.play();
    $(".info-page").fadeOut(500);
    $(".multas").fadeOut(500);
    $(".calculadora").fadeOut(500);
    $('.hud').fadeOut(500);

    setTimeout(function(){ $('.garage').fadeIn() }, 500);
});

$(document).on('click', '#fines  ', function(e){
    clickingSound.play();
    $(".info-page").fadeOut(500);
    $(".garage").fadeOut(500);
    $(".calculadora").fadeOut(500);
    $('.hud').fadeOut(500);

    setTimeout(function(){ $('.multas').fadeIn() }, 500);
});



$(document).on('click', '#calculator', function(e){
    clickingSound.play();
    $(".info-page").fadeOut(500);
    $(".garage").fadeOut(500);
    $(".multas").fadeOut(500);
    $('.hud').fadeOut(500);
    setTimeout(function(){ $('.calculadora').fadeIn() }, 500);
});


$(document).on('click', '#hud', function(e){
    clickingSound.play();
    $(".info-page").fadeOut(500);
    $(".garage").fadeOut(500);
    $(".multas").fadeOut(500);
    $(".calculadora").fadeOut(500);

    setTimeout(function(){ $('.hud').fadeIn() }, 500);
});

$(document).on('click', '.valet', function(e) {
    clickingSound.play();
    let element = $(this)
    let num = element.attr('num')
    $.post('https://fishiiTablet/valetParking', JSON.stringify({
        placa: $('#placa' + num).html(),
        model: $('#modelo' + num).html()
    }))
    
});


$(document).on('click', '.pagar  ', function(e){
    clickingSound.play();
    let element = $(this)
    let num = element.attr('num')
    $.post('https://fishiiTablet/payBill', JSON.stringify({
        label: $('#label-multa' + num).html(),
        amount: $('#amount-multa' + num).html(),
        id: element.attr('ids')
    }), function(result){
        if (result){
            $('.multa').remove()
            $.post('https://fishiiTablet/getBills', '', function(bills){
            for (var i= 0; i < bills.length; i++){
                let bill = bills[i]
                $('#multas').append(`
                    <div class = 'multa' id="multa${i}">
                        <i class="fal fa-tachometer-alt-fastest"></i><span class = "labelMulta" id="label-multa${i}">${bill.label}</span>
                        <i class="fas fa-dollar-sign"></i><span class = "amountMulta" id="amount-multa${i}">${bill.amount}</span>
                        <span class = 'pagar' ids = '${bill.id}' id="multa-pagar${i}" num = '${i}'>PAGAR</span>
                    </div>
                `)
            };
        });
        };
    })
});


$(function() {

    $(".text").keydown(function (e) {
    //  backspace, delete, tab, escape, enter and vb tuşlara izin vermek için.
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 109, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) || // ctrl-a
            (e.keyCode == 67 && e.ctrlKey === true) || //ctrl + c
            (e.keyCode == 88 && e.ctrlKey === true) || //crtl + x 
            (e.keyCode == 55 && e.shiftKey === true) || // :/
            (e.keyCode == 109 ) || // -
            (e.keyCode == 107 ) || // +
            (e.keyCode == 106 ) || // *
            (e.keyCode >= 35 && e.keyCode <= 39)) { // sol , sag
            
            return;
        }
        // sayisal deger sorgulama
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $( ".calculator-app " ).click(function() {
        $( ".text" ).focus();
    });
});


function sayiekle(sayi) {
    document.form.text.value = document.form.text.value + sayi;
}

function sonuc() {
    var deger = document.form.text.value;
    if (deger){
        document.form.text.value=eval(deger);
    }
}

function hepsiniSil() {
    document.form.text.value="";
}
        
function sil() {
    var deger = document.form.text.value;
    document.form.text.value = deger.substring(0,deger.length-1);
}

function formEngelle(event) {
    event = event || window.event;
    if (event.which === 13) {
        event.preventDefault();
        return (false);
    }
}

//enter ile sonuc bulma
document.onkeyup = function (data) {
    if ( data.which == 13 ) {
        sonuc();
    }
};

// Creditos a medina por ayudarme con lo de las multas y facturas

window.addEventListener('message', function(event) {
    if (event.data.show == true) {
        $('body').css('display', 'block');
    } else if (event.data.show == false) {
        $('body').css('display', 'none');
    }
    
    $("#efectivo").html(event.data.efectivo);
    $("#bank-money").html(event.data.banco);
    $("#numerodetelefono").html(event.data.telefono);

    $('.name').html(event.data.nombre);
    $('#job').html(event.data.trabajo);

    for (var i= 0; i < event.data.vehicles.length; i++){
        let vehicle = event.data.vehicles[i]
        let properties = JSON.parse(vehicle.vehicle)
        properties.fuelLevel = Math.round(properties.fuelLevel)
        properties.bodyHealth = Math.round(properties.bodyHealth/10)
        $('.append').append(`
            <div class="vehiculo" id = 'vehicle${i}'> 
                <i class="fas fa-car-alt"></i><span class = "modelo" id="modelo${i}">${vehicle.modelname}</span>
                <i class="fas fa-map-marker-alt"></i><span class = "garage-si" id="garage-si${i}">Garaje ${vehicle.garage}</span>
                <i class="fas fa-gas-pump"></i><span class = "gasolina" id="gasolina${i}">${properties.fuelLevel}%</span>
                <i class="fas fa-wrench"></i><span class = "motor" id="motor${i}">${properties.bodyHealth}%</span>
                <i class="fas fa-id-card"></i><span class = "placa" id="placa${i}">${properties.plate}</span>
            </div>
        `)
        
    };

    for (var i= 0; i < event.data.bills.length; i++){
        let bill = event.data.bills[i]
        $('#multas').append(`
            <div class = 'multa' id="multa${i}">
                <i class="fal fa-tachometer-alt-fastest"></i><span class = "labelMulta" id="label-multa${i}">${bill.label}</span>
                <i class="fas fa-dollar-sign"></i><span class = "amountMulta" id="amount-multa${i}">${bill.amount}</span>
                <span class = 'pagar' ids = '${bill.id}' id="multa-pagar${i}" num = '${i}'>PAGAR</span>
            </div>
        `)
    };

    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            $('body').css('display', 'none');
            $('.multa').remove()
            $(".vehiculo").remove()
            $.post('https://fishiiTablet/escape', JSON.stringify());
        }
    });
});


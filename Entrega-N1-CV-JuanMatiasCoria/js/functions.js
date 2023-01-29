let contador = 0;
let colores = new Array("#FFE5B4", "#8a8464", "#798f75", "#ebcbbc");

function change_color(){
    document.getElementById('header').style.background=colores[contador];
    contador ++;
    if (contador > 3)
        contador = 0;
}

function ramdom_user(){
    $.ajax({
    url: 'https://randomuser.me/api/?inc=name,picture',
    dataType: 'json',
    success: function(data) {
        let name = data.results[0].name.first + " " + data.results[0].name.last;
        document.getElementById('h1').innerHTML = name.toUpperCase();
        document.getElementById('img-main').setAttribute('src', data.results[0].picture.large);
        document.getElementById('img-main').setAttribute('height', '200px');        
    }});
    }
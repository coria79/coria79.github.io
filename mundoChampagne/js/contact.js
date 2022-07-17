function validate_data(){
        var full_name = document.getElementById("full-name");
        var country = document.getElementById("country");
        var e_mail = document.getElementById("email");
        var check_box =document.getElementById("checkbox");

        /*alert(full_name.value);*/
        /*alert(country.selectedIndex);*/
        /*alert(email.value);*/
        /*alert(checkbox.value);*/
        /*alert(checkbox.checked);*/
        if(full_name.value == "" || not_a_number(full_name.value) == true){
                alert("Debe ingresar Apellido y Nombre completo");
                return false;
        }
        if(country.selectedIndex == 0){
                alert("Debe ingresar Pais");
                return false;                
        }
        if(e_mail.value == "" || not_a_number(e_mail.value) == true){
                alert("Debe ingresar Correo Electrónico");
                return false;                
        }
        if(check_box.checked == false){
                alert("Debe tildar la Casilla de Verificación");
                return false;                
        }
        alert("Gracias. Será contactado en breve.")
        document.contact-form.submit()
       return false;
    }
    
    function not_a_number(a){
            if(isNaN(a)==false){
                return true;
            }
    }

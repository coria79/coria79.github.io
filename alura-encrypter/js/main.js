function encrypt(txt){
    /*
     * Encrypts the character according to the pattern.
     * @param {txt} string.
     * @returns {encryptedTxt} string.
    */

    let encryptedTxt = "";
    let encryptedChar = "";
    let currentChar = "";
    
    for(let i = 0; i < txt.length; i++){
        currentChar = txt[i];
        if(currentChar == "a" || currentChar == "e" || currentChar == "i" || currentChar == "o" || currentChar == "u"){
            switch(currentChar) { // Encrypt the current character according to the pattern defined here.
                case "a":
                    encryptedChar = "ai";
                    break;
                case "e":
                    encryptedChar = "enter";
                    break;
                case "i":
                    encryptedChar = "imes";
                    break;
                case "o":
                    encryptedChar = "ober";
                    break;
                case "u":
                    encryptedChar = "ufat";
                    break;
            }
            encryptedTxt += encryptedChar; // Add the encrypted vowel to the encrypted text.
        } else {
            encryptedTxt += currentChar; // It is not a vowel. Add the character to the encrypted text.
        }
    }
    return encryptedTxt;

    /*
    Teacher's solution.

    const matiz_code = [
        ["u","ufat"], // indice 4
    ];

    for (let i = 0; i < matiz_code.length; i++){
        if (fraseEncriptada.includes(matiz_code[i][0])){
            fraseEncriptada = fraseEncriptada.replaceAll(
            matriz_code[i][0],
            matriz_code[i][1]
            );
        }
    }

    Why choose my solution? Only 5 elements, very easy to handle with only a "for" an "or" and a "switch".
    Teacher's solution. For more elements it's the best option.

    */
}

function decrypt(txt){
    /*
     * Decrypts the encrypted text based on the defined pattern.
     * @param {txt} string - The encrypted string to be decrypted.
     * @returns {decryptTxt} string - The decrypted string.
    */

    let decryptTxt = "";
    
    /* Use of operations on strings.
     * Decrypts by replacing the encrypted vowel patterns with their original characters.
    */

    decryptTxt = txt.replace(/ai/mg, 'a');
    decryptTxt = decryptTxt.replace(/enter/mg, 'e');
    decryptTxt = decryptTxt.replace(/imes/mg, 'i');
    decryptTxt = decryptTxt.replace(/ober/mg, 'o');
    decryptTxt = decryptTxt.replace(/ufat/mg, 'u');

    return decryptTxt;
}

function nothingToEncrypt(colourFlag){
    /*
     * Replaces "dynamically" a text area for a div with an img and two p tags.
     * @param {} Receives nothing.
     * @returns {} After creating the new elements returns nothing.
     * 
     * (Would it be better to hide or show the elements instead of creating them dynamically?)
    */

    let textareaEncrypted = document.getElementById("txt-area-encrypted"); // The html textarea to a let textareaEncrypted.
    let newDiv = document.createElement("div"); // Create a new div.

    newDiv.classList.add('div-encrypted-nothing'); // Adding the class name.

    // Create an element img and add it to the new div.
    let imgElement = document.createElement("img");
    switch(colourFlag){
        case "green":
            imgElement.src = "img/nothing-green.jpg";
            break;
        case "pink":
            imgElement.src = "img/nothing-pink.jpg";
            break;
        case "blue":
            imgElement.src = "img/nothing-blue.jpg";
            break;
        default:
            imgElement.src = "img/nothing-blue.jpg";
            break;
    }
    
    imgElement.alt = "Nothing to show";
    imgElement.classList.add('img-nothing');
    imgElement.id = "img-nothing";
    newDiv.appendChild(imgElement);

    // Create two elements p and add them to the new div.
    let p1 = document.createElement("p");
    p1.textContent = "Ningún mensaje fue encontrado.";
    p1.classList.add('p1-nothing');
    p1.id = "p1-nothing";
    newDiv.appendChild(p1);

    let p2 = document.createElement("p");
    p2.textContent = "Ingresa el texto que deseas encriptar o desencriptar.";
    p2.classList.add('p2-nothing');
    p2.id = "p2-nothing";
    newDiv.appendChild(p2);

    // Replace the textarea with the new div.
    textareaEncrypted.replaceWith(newDiv);
}

/*
* Event listener for Wait for DOM full load.
* Contains:
* Event listener for the click event on the button to encrypt the text.
* Event listener for the click event on the button to decrypt the text.
* Event listener for the click event on the button to copy the encrypted or decrypted text.
*/

document.addEventListener('DOMContentLoaded', function(){

    let btnEncrypt = document.querySelector('.btn-encrypt'); // Html btn-encrypt to let btnEncrypt.
    let btnDecrypt = document.querySelector('.btn-decrypt'); // Html btn-decrypt to let btnDecrypt.
    let btnCopy = document.querySelector('.btn-copy'); // Html btn-copy to let btnCopy.
    let flagEmpty = false; // This flag will help when there's nothing to encrypt or decrypt.
    let btnColours = document.querySelector('.img-colours-icon'); // Html img-colours-icon to let btnColours.
    let counter = 0; // This counter will help with the colours change icon.
    let btnEnglish =  document.querySelector('.img-england-icon'); // Html img-england-icon to let btnEnglish.
    let btnPortuguese = document.querySelector('.img-bazil-icon'); // Html img-brazil-icon to let btnPortuguese.
    
    /*
     * Event listener for the click event on the button to encrypt the text.
     */

    btnEncrypt.addEventListener('click', function(){

        let txtAreaOriginal = document.querySelector('.txt-area-original').value.trim(); // Get the value of the html element.
        let txtAreaEncrypted = document.querySelector('.txt-area-encrypted'); // Get the value of the html element.
        colourFlag = "blue";

        if (txtAreaOriginal === ''){
            nothingToEncrypt(colourFlag);
            flagEmpty = true;

        } else {
            txtAreaEncrypted.value = encrypt(txtAreaOriginal);
            flagEmpty = false;
        }
    });

    /*
     * Event listener for the click event on the button to decrypt the text.
     */

    btnDecrypt.addEventListener('click', function(){

        let txtAreaOriginal = document.querySelector('.txt-area-original').value.trim(); // Get the value of the html element. "Trim" removes spaces before and after text.
        let txtAreaEncrypted = document.querySelector('.txt-area-encrypted'); // Get the value of the html element.
        colourFlag = "blue";

        if (txtAreaOriginal === ''){
            nothingToEncrypt(colourFlag);
            flagEmpty = true;
        } else {
            txtAreaEncrypted.value = decrypt(txtAreaOriginal);
            flagEmpty = false;
        }
    });

    /*
     * Event listener for the click event on the button to copy the encrypted or decrypted text.
     */

    btnCopy.addEventListener('click', function(){

        if(flagEmpty === true){ // If true means there's nothing to encrypt or decrypt.
            let txtEmpty = ''; // Auxiliary empty variable.
            navigator.clipboard.writeText(txtEmpty);
        } else {
            let txtAreaEncrypted = document.querySelector('.txt-area-encrypted').value.trim(); // Get the value of the html element.
            navigator.clipboard.writeText(txtAreaEncrypted);
        }
    });

    btnColours.addEventListener('click', function(){
        let bodyColour = "";
        let mainColour = "";
        let secondColour = "";
        let thirdColour = "";
        let fourthColour = "";
        let fifthColour = "";
        let logo = "";
        let nothing = "";

        switch(counter){
            case 0:
                bodyColour = "#e3ffc6";
                mainColour = "#288C6E";
                secondColour = "#c8ff99";
                thirdColour = "#c8ff99";
                fourthColour = "white";
                fifthColour = "white";
                logo = "img/alura-green.png";
                nothing = "img/nothing-green.jpg";
                colourFlag = "green";
                break;
            case 1:
                bodyColour = "#F7D9E3";
                mainColour = "#C94C8F";
                secondColour = "#D3D3D3";
                thirdColour = "#D3D3D3";
                fourthColour = "white";
                fifthColour = "white";
                logo = "img/alura-pink.png";
                nothing = "img/nothing-pink.jpg";
                colourFlag = "pink";
                break;
            case 2:
                bodyColour = "#F2F5FC";
                mainColour = "#0A3971";
                secondColour = "#F2F5FC";
                thirdColour = "white";
                fourthColour = "white";
                fifthColour = "#F2F5FC";
                logo = "img/alura-blue.png";
                nothing = "img/nothing-blue.jpg";
                colourFlag = "blue";
                break;
            }

        document.body.style.backgroundColor = bodyColour;
        document.getElementById('txt-area-original').style.color = mainColour;
        document.getElementById('txt-area-original').style.backgroundColor = fifthColour;
        document.getElementById('div-original').style.backgroundColor = secondColour;
        document.getElementById('div-encrypted').style.backgroundColor = thirdColour;
        document.getElementById('btn-encrypt').style.backgroundColor = mainColour;
        document.getElementById('img-logo-alura').src = logo;
        document.getElementById('btn-decrypt').style.borderColor = mainColour;
        document.getElementById('btn-decrypt').style.color = mainColour;
        document.getElementById('btn-copy').style.color = mainColour;
        document.getElementById('btn-copy').style.borderColor = mainColour;
        document.getElementById('p-footer').style.backgroundColor = bodyColour;
        
        if(flagEmpty === true){
            document.getElementById('img-nothing').src = nothing;
        }
        
        if(counter >= 2){
            counter = -1;
        }
        counter ++;
    });

    btnEnglish.addEventListener('click', function(){

        document.title = "Alura Challenge Encrypt - Decrypt";
        document.querySelector('h1').textContent = "Alura Challenge Encrypt - Decrypt";
        document.getElementById('btn-encrypt').textContent = "Encrypt";
        document.getElementById('btn-decrypt').textContent = "Decrypt";
        document.getElementById('btn-copy').textContent = "Copy";
        document.getElementById('p-aviso').innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Only lowercase letters and no accents.';
        document.getElementById('p-footer').innerHTML = "All rights reserved <a href='https://coria79.github.io/' target='_blank'>Mati Coria</a> &copy; 2024.";
        document.getElementById('txt-area-original').setAttribute('placeholder', 'Enter text here...');

        if(flagEmpty === true){
            document.getElementById('p1-nothing').textContent = "No message was found.";
            document.getElementById('p2-nothing').textContent = "Enter the text you want to encrypt or decrypt.";
        }
    });

    btnPortuguese.addEventListener('click', function(){
        document.title = "Alura Desafio Criptografar - Descriptografar";
        document.querySelector('h1').textContent = "Alura Desafio Criptografar - Descriptografar";
        document.getElementById('btn-encrypt').textContent = "Criptografar";
        document.getElementById('btn-decrypt').textContent = "Descriptografar";
        document.getElementById('btn-copy').textContent = "Cópia";
        document.getElementById('p-aviso').innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Somente letras minúsculas e sem acentos.';
        document.getElementById('p-footer').innerHTML = "Todos os direitos reservados <a href='https://coria79.github.io/' target='_blank'>Mati Coria</a> &copy; 2024.";
        document.getElementById('txt-area-original').setAttribute('placeholder', 'Insira o texto aqui...');

        if(flagEmpty === true){
            document.getElementById('p1-nothing').textContent = "Nenhuma mensagem foi encontrada.";
            document.getElementById('p2-nothing').textContent = "Digite o texto que deseja criptografar ou descriptografar.";
        }
    });

});
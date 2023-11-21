const formu = document.firstContact;
// const error = document.getElementById("error");

// color cuando esta en focus
formu.addEventListener("focusin", (event) => {
    event.target.style.background = "yellow";
  });
  
  formu.addEventListener("focusout", (event) => {
    event.target.style.background = "";
  });


// mensajes de feedback
const feedbackMsgs = [
    ["Correo electrónico valido", "Correo electrónico no valido"],
    ["Asunto valido", "Asunto no valido"],
    ["Edad valida", "Edad no valida"],
    ["DNI valido", "DNI no valido"],
    ["Contenido valido", "Contenido no valido"],
    ["Aceptó las condiciones", "No aceptó las condiciones"]
];

// patrones regex
const ptremail  = "^[a-z0-9_-]+([.][a-z0-9_-]+)*@[a-z0-9_]+([.][a-z0-9_]+)*[.][a-z]{2,9}$";
const ptrasunto = "^[A-Za-zÀ-ÿ-\s]{5,40}$";
const ptrdni = "^[XYZ]?\d{5,8}[A-Z]{1}$";
const ptrcontent = "[A-Za-zÀ-ÿ]{10,250}$";

// funcion para validar el regex
function validaInput(texto, ptregex) {
    console.log(`texto: ${texto}, ptregex ${ptregex}`);
    if (texto.match(ptregex)) {
        console.log("valido");
        return true;
    } else {
        console.log("no valido");
        //alert("El input no es valido");
        return false;
    }
}

// funcion para insertar el mensaje de feedback
function feedback(index, valido, error) {
    console.log(`index: ${index}, valido ${valido}}`)
    //console.log(feedbackMsgs[index]);
    if (valido) {
        error.innerHTML = feedbackMsgs[index][0];
        error.style.color = "green";
    } else {
        error.innerHTML = feedbackMsgs[index][1];
        error.style.color = "red";
    }
}

// funcion para validar el email
formu.email.addEventListener("focusout", (event) => {
    const mymail = validaInput(formu.email.value, ptremail);
    const error = document.getElementById("mostra1");
    feedback(0, mymail, error);
  });

// funcion para validar el asunto
formu.asunto.addEventListener("focusout", (event) => {
    const mysubject = validaInput(formu.asunto.value, ptrasunto);
    const error = document.getElementById("mostra2");
    feedback(1, mysubject, error);
});

// funciones para validar edad
function diferenciafechas(fa,fb){  //fa y fb dos fechas
	
	var totdias = fa-fb;
	totdias /=3600000;  
	totdias /=24;	
	totdias= Math.floor(totdias);
	totdias= Math.abs(totdias);

	var ans, meses, dias, m2, m1, d3, d2, d1;
	var f2=new Date();	var f1=new Date();

	if (fa > fb){f2=fa;f1=fb;}else{var f2=fb; f1=fa;}  //Siempre f2 > f1
	ans=f2.getFullYear()-f1.getFullYear(); // dif de años inicial
	m2=f2.getMonth();
	m1=f1.getMonth();
	meses=m2-m1;	if (meses<0){meses +=12; --ans; }

	d2=f2.getDate();
	d1=f1.getDate();
	dias=d2-d1;

	var f3=new Date(f2.getFullYear(),m2,1);
	f3.setDate(f3.getDate()-1);
	d3=f3.getDate();

	if (d1>d2) {
		dias +=d3; --meses; if (meses<0){meses +=12; --ans; }
		if (fa>fb){  //corrección por febrero y meses de 30 días
			f3=new Date(f1.getFullYear(),m1+1,1);
			f3.setDate(f3.getDate()-1);
			d3=f3.getDate();
			if (d3==30) dias -=1;
			if (d3==29) dias -=2;
			if (d3==28) dias -=3;
		}
	}

	return {ans:ans,meses:meses,dias:dias,Tdias:totdias};
}

const validaEdad = () => {
    let fecha = formu.miedad.value;
    let hoy = new Date();
    let fechaNac = new Date(fecha);
    let edad = diferenciafechas(hoy, fechaNac);
    console.log(edad);
    if (edad.ans < 18) {
        let msg = "Eres menor de edad";
        console.log(msg);
        alert(msg);
        return false;
    } else if (edad.ans > 100) {
        let msg = "Eres demasiado mayor";
        console.log(msg);
        alert(msg);
        return false;
    } else {
        let msg = "Eres mayor de edad";
        console.log(msg);
        return true;
    }
}

formu.miedad.addEventListener("focusout", (event) => {
    const mysubject = validaEdad();
    const error = document.getElementById("mostra3");
    feedback(2, mysubject, error);
});

// funciones para validar el DNI
const cDni = () => {
    let rdni = formu.dni.value;
    rdni = rdni.toUpperCase();
    console.log(`inserido: ${rdni}`);
    let letra = rdni.charAt(rdni.length - 1);
    let numero = rdni.substring(0, rdni.length - 1);
    numero = numero.replace("X", 0);
    numero = numero.replace("Y", 1);
    numero = numero.replace("Z", 2);
    numero = numero % 23;
    let letraDni = "TRWAGMYFPDXBNJZSQVHLCKET";
    letraDni = letraDni.substring(numero, numero + 1);
    if (letraDni != letra) {
        deseado = rdni.substring(0, rdni.length - 1);
        deseado += letraDni;
        console.log(`deseado:  ${deseado}`);
        // alert("Dni erroneo, la letra del NIF no se corresponde");
        return false;
    } else {
        return true;
    }
}

formu.dni.addEventListener("focusout", (event) => {
    const mysubject = cDni();
    const error = document.getElementById("mostra4");
    feedback(3, mysubject, error);
});


// funcion para validar el contenido
formu.contenido.addEventListener("focusout", (event) => {
    const mysubject = validaInput(formu.contenido.value, ptrcontent);
    const error = document.getElementById("mostra5");
    feedback(4, mysubject, error);
});


// funcion para el acepto de condiciones
formu.acepto.addEventListener("focusout", (event) => {
    const acepto = formu.acepto.checked;
    const error = document.getElementById("mostra6");
    feedback(5, acepto, error);
});

const feedbackElements = [

];

const showFeedback = (i, isValid) => {
    feedbackElements[i].textContent = feedbackMsgs[i][isValid ? 0 : 1];
    feedbackElements[i].classList.remove('acierto', 'error');
    feedbackElements[i].classList.add(isValid ? 'acierto' : 'error');
};

// funccion para validar el formulario
const validaForm = () => {
    const mymail = validaInput(formu.email.value, ptremail);
    const mysubject = validaInput(formu.asunto.value, ptrasunto);
    const mycontent = validaInput(formu.contenido.value, ptrcontent);
    const acepto = formu.acepto.checked;
    const mydni = cDni();
    const myedad = validaEdad();

    // showFeedback(0, mymail);
    // showFeedback(1, mysubject);
    // showFeedback(2, mycontent);
    // showFeedback(3, mydni);
    // showFeedback(4, myedad);
    // showFeedback(5, acepto);

    return mymail && mysubject && mycontent && mydni && myedad && acepto;
}

// funcion para enviar el formulario
const boton = document.getElementById("enviar");

boton.addEventListener("click", (event) => {
    console.log("click");
    event.preventDefault();
    if (validaForm()) {
        console.log("formulario valido");
        submit();
        limpiar();
    } else {
        console.log("formulario NO valido");
    }
}
);

// get maior valor de key en localStorage
const getMaiorKey = () => {
    let maior = 0;
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        // cast to int
        key = parseInt(key);
        if (key > maior) {
            maior = key;
        }
    }
    return maior;
}

// salva contenido del formulario en localStorage
const submit = () => {
    const mymail = formu.email.value;
    const mysubject = formu.asunto.value;
    const mycontent = formu.contenido.value;
    const mydni = formu.dni.value;
    const myedad = formu.miedad.value;
    const acepto = formu.acepto.checked;
    const next_key = getMaiorKey() + 1;
    let valor = {"mail": mymail, "subject": mysubject, "content": mycontent, "dni": mydni, "edad": myedad, "acepto": acepto};
    valor = JSON.stringify(valor);
    console.log(valor);

    localStorage.setItem(next_key, valor);
    btn_borrar();
}

// borrar formulario
const btn_borrar = () => {
    console.log("Borrador");
    formu.email.value = "";
    formu.asunto.value = "";
    formu.contenido.value = "";
    formu.dni.value = "";
    formu.miedad.value = "";
    formu.acepto.checked = false;

    const m1 = document.getElementById("mostra1");
    const m2 = document.getElementById("mostra2");
    const m3 = document.getElementById("mostra3");
    const m4 = document.getElementById("mostra4");
    const m5 = document.getElementById("mostra5");
    const m6 = document.getElementById("mostra6");
    m1.innerHTML = "";
    m2.innerHTML = "";
    m3.innerHTML = "";
    m4.innerHTML = "";
    m5.innerHTML = "";
    m6.innerHTML = "";
}


// ver usuarios enviados
const boton_ver = document.getElementById("todos");

boton_ver.addEventListener("click", (event) => {
    console.log("Ver");
    event.preventDefault();
    mostrar();
}
);

const mostrar = () => {
    let pre_html = '<div class="container"><div><input type="button" onclick="eliminarTodo();" value="Eliminar Todo"><input type="button" onclick="limpiar();" value="Limpiar Pantalla"></div>';
    pre_html += '<h1>Usuarios enviados</h1>';
    pre_html += '<table class="w3-table-all w3-hoverable"><tr><th>ID</th><th>EMAIL</th><th>ASUNTO</th><th>CONTENIDO</th><th>DNI</th><th>EDAD</th><th>ACEPTO</th><th>ACCIÓN</th></tr>';
    let pos_html = '</table></div>';
    console.log("Ver");
    let meio_html = "";
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let valor = localStorage.getItem(key);
        let valor_json = JSON.parse(valor);
        // console.log(valor_json);
        let mail = valor_json.mail;
        let subject = valor_json.subject;
        let content = valor_json.content;
        let dni = valor_json.dni;
        let edad = valor_json.edad;
        let acepto = valor_json.acepto;
        v = '<tr><td>' + key + '</td><td>' + mail + '</td><td>' + subject + '</td><td>' + content + '</td><td>' + dni + '</td><td>' + edad + '</td><td>' + acepto + '</td><td><input type="button" onclick="eliminar(' + key + ');" value="Borrar"><br><input type="button" onclick="alterar(' + key + ');" value="Alterar"></td></tr>';
        console.log(v);
        meio_html += v;
    }
    console.log('valor: ' + meio_html);
    html = pre_html + meio_html + pos_html;
    ver = document.getElementById("cajadatos");
    ver.innerHTML = html;
}

// limpiar pantalla
const limpiar = () => {
    ver = document.getElementById("cajadatos");
    ver.innerHTML = "";
}

const eliminarTodo = () => {
    localStorage.clear();
    mostrar();
};

const eliminar = (clave) => {
    localStorage.removeItem(clave);
    mostrar();
};

// alterar usuario
const alterar = (clave) => {
    console.log("Alterar");
    let valor = localStorage.getItem(clave);
    let valor_json = JSON.parse(valor);
    console.log(valor_json);
    formu.email.value = valor_json.mail;
    formu.asunto.value = valor_json.subject;
    formu.contenido.value = valor_json.content;
    formu.dni.value = valor_json.dni;
    formu.miedad.value = valor_json.edad;
    formu.acepto.checked = valor_json.acepto;
    localStorage.removeItem(clave);
    mostrar();
};
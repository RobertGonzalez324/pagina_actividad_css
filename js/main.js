var loginF = document.getElementById('loginForm')
var regF = document.getElementById('registerForm')

var btnReg = document.getElementById('showRegister')
var btnInicio = document.getElementById('startRegister')
var btnOcultar = document.getElementById('hideRegister')

var P_registro = document.getElementById('registerPanel')
var cuadroM = document.createElement('div');


var claveU = 'hermandadUsers';

function cargarU() {
  var guardado = localStorage.getItem(claveU);

  if (guardado) {
    return JSON.parse(guardado);
  }

  return [];
}

function guardarU(us) {
  localStorage.setItem(claveU, JSON.stringify(us));
}


function mostrarM(texto, tipo) {
  if (!tipo) {
    tipo = 'info';
  }

  cuadroM.textContent = texto;
  cuadroM.className = 'auth-message ' + tipo;

  if (loginF && loginF.parentNode && !cuadroM.parentNode) {
    loginF.parentNode.insertBefore(cuadroM, loginF.nextSibling);
  }
}


function limpiarM() {
  cuadroM.textContent = '';
  cuadroM.className = '';
}

function altRegistro(visible) {
  limpiarM();

  if (P_registro) {
    if (visible) {
      P_registro.classList.remove('hidden');
    } else {
      P_registro.classList.add('hidden');
    }
  }
}


if (loginF) {
  loginF.addEventListener('submit', function(evento) {
    evento.preventDefault();
    var mail = loginF.loginEmail.value.trim();
    var pass = loginF.loginPassword.value.trim();
    var us = cargarU();
    var uEncontrado = null;

    for (var i = 0; i < us.length; i++) {
      if (us[i].email === mail && us[i].password === pass) {
        uEncontrado = us[i];
        break;
      }
    }

    if (uEncontrado) {
      mostrarM('Bienvenido de nuevo, ' + uEncontrado.name + '.', 'success');
      loginF.reset();
    } else {
      mostrarM('Correo o contraseña incorrectos. Usa tu cuenta registrada o crea una nueva.', 'error');
    }
  });
}

if (regF) {
  regF.addEventListener('submit', function(evento) {
    evento.preventDefault();
    var nombre = regF.registerName.value.trim();

    var mail = regF.registerEmail.value.trim();
    var pass = regF.registerPassword.value.trim();

    var conf = regF.registerConfirm.value.trim();

    if (!nombre || !mail || !pass || !conf) {
      mostrarM('Completa todos los campos para registrarte.', 'error');
      return;
    }

    if (pass !== conf) {
      mostrarM('Las contraseñas no coinciden. Revisa los campos.', 'error');
      return;
    }


    var us = cargarU();
    var existeU = false;

    for (var j = 0; j < us.length; j++) {
      if (us[j].email === mail) {
        existeU = true;
        break;
      }
    }

    if (existeU) {
      mostrarM('Ya existe una cuenta con ese correo. Usa otro o inicia sesión.', 'error');
      return;
    }


    us.push({ name: nombre, email: mail, password: pass });
    guardarU(us)

    mostrarM('Cuenta creada. Ahora puedes iniciar sesión.', 'success');
    regF.reset();
    altRegistro(false);
  });
}




if (btnReg) {
  btnReg.addEventListener('click', function() {
    altRegistro(true);
  });
}


if (btnInicio) {
  btnInicio.addEventListener('click', function() {
    altRegistro(true);
  });
}


if (btnOcultar) {
  btnOcultar.addEventListener('click', function() {
    altRegistro(false);
  });
}
if (P_registro) {
  altRegistro(false);
}

var btnMenu=document.querySelector('.menu-toggle')
var nav=document.querySelector('.main-nav')
var btnDrop=document.querySelector('.drop-btn')
var slides=document.querySelectorAll('.slide')
var btnPrev=document.querySelector('.carousel-btn.prev')
var btnNext=document.querySelector('.carousel-btn.next')
var acordeones=document.querySelectorAll('.acordeon-btn')
var hero=document.querySelector('.section-hero')
var carrIdx=0
var carrAuto
var loginF=document.getElementById('loginForm')
var regF=document.getElementById('registerForm')
var msgBox=document.createElement('div')
function leerU(){var g=localStorage.getItem('hermandadUsers');return g?JSON.parse(g):[]}
function guardarU(u){localStorage.setItem('hermandadUsers',JSON.stringify(u))}
function mostrarM(texto,tipo){msgBox.textContent=texto;msgBox.className='auth-message '+(tipo||'info');if(loginF&&loginF.parentNode&&!msgBox.parentNode){loginF.parentNode.insertBefore(msgBox,loginF.nextSibling)}}
function limpiarM(){msgBox.textContent='';msgBox.className=''}
function altRegistro(v){limpiarM();var panel=document.getElementById('registerPanel');if(panel){panel.classList.toggle('hidden',!v)}}
function moverCarr(n){if(!slides.length)return;carrIdx=(carrIdx+n+slides.length)%slides.length;slides.forEach(function(s,i){s.classList.toggle('active',i===carrIdx)})}
function iniciarCarr(){if(!slides.length)return;moverCarr(0);clearInterval(carrAuto);carrAuto=setInterval(function(){moverCarr(1)},4500)}
function altNav(){if(nav)nav.classList.toggle('nav-abierta')}
function altDrop(){if(btnDrop)btnDrop.classList.toggle('activo')}
if(btnMenu)btnMenu.addEventListener('click',altNav)
if(btnDrop)btnDrop.addEventListener('click',altDrop)
if(btnPrev)btnPrev.addEventListener('click',function(){moverCarr(-1)})
if(btnNext)btnNext.addEventListener('click',function(){moverCarr(1)})
if(acordeones.length){acordeones.forEach(function(btn){btn.addEventListener('click',function(){this.classList.toggle('activo');var pan=this.nextElementSibling;if(pan){pan.classList.toggle('open')}})})}
if(loginF){loginF.addEventListener('submit',function(e){e.preventDefault();var mail=loginF.loginEmail.value.trim();var pass=loginF.loginPassword.value.trim();var us=leerU();var ok=false;for(var i=0;i<us.length;i++){if(us[i].email===mail&&us[i].password===pass){ok=true;break}}if(ok){mostrarM('Bienvenido de nuevo.','success');loginF.reset()}else{mostrarM('Correo o contraseña incorrectos. Usa tu cuenta registrada o crea una nueva.','error')}})}
if(regF){regF.addEventListener('submit',function(e){e.preventDefault();var nombre=regF.registerName.value.trim();var mail=regF.registerEmail.value.trim();var pass=regF.registerPassword.value.trim();var conf=regF.registerConfirm.value.trim();if(!nombre||!mail||!pass||!conf){mostrarM('Completa todos los campos para registrarte.','error');return}if(pass!==conf){mostrarM('Las contraseñas no coinciden.','error');return}var us=leerU();for(var j=0;j<us.length;j++){if(us[j].email===mail){mostrarM('Ya existe una cuenta con ese correo. Usa otro o inicia sesión.','error');return}}us.push({name:nombre,email:mail,password:pass});guardarU(us);mostrarM('Cuenta creada. Ahora puedes iniciar sesión.','success');regF.reset();altRegistro(false)})}
if(document.getElementById('showRegister'))document.getElementById('showRegister').addEventListener('click',function(){altRegistro(true)})
if(document.getElementById('hideRegister'))document.getElementById('hideRegister').addEventListener('click',function(){altRegistro(false)})
iniciarCarr()
if(document.getElementById('registerPanel'))altRegistro(false)

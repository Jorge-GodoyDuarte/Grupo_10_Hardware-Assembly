console.log("userLogin.js connected!");
const apiUrlBase = "https://apis.datos.gob.ar/georef/api"

const $ = (element) => document.getElementById(element);

const exRegs = {
    exRegAlfa: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
    exRegEmail: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
    exRegPass:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,8}/,
    exRegMayu: /[A-Z]/,
    exRegMinu: /[a-z]/,
    exRegNum: /[0-9]/,
    exRegEsp: /[$@$!%*?&]/,
    exRegMin: /.{6,}/,
    exRegMax: /.{8}/,
  };

  const msgError = (element, msg, target) => {
    $(element).innerText = msg;
    target.classList.add("is-invalid");
  };
  
  const validField = (element, target) => {
    $(element).innerText = null;
    target.classList.remove("is-invalid");
    target.classList.add("is-valid");
  };
console.log($("password"))
$("email").addEventListener("blur", async function ({ target }) {
  switch (true) {
    case !this.value.trim():
      msgError("errorEmail", "El email es obligatorio", target);
      break;
    case !exRegs.exRegEmail.test(this.value):
      msgError("errorEmail", "El email tiene un formato incorrecto", target);
      break;
    default:
      validField("errorEmail", target);
      break;
  }
});

  $("password").addEventListener("blur", function ({ target }) {
    switch (true) {
        case !this.value.trim():
          msgError("errorPass", "La contraseña es obligatoria", target);
          break;
        default:
          validField("errorPass", target);
          break;
      }
    });
  $("form-login").addEventListener("submit", function (e) {
    e.preventDefault(); //chequea todos los eventos
  
  let error = false;
  
    const elements = this.elements;
      for (let i = 0; i < elements.length - 2; i++) {
          console.log(elements[i]);
          if(!elements[i].value.trim() || elements[i].classList.contains('is-invalid') && !$('province-input').classList.contains('is-invalid')){
              elements[i].classList.add('is-invalid')
             $('msgError').innerText = 'Hay campos con errores o estan vacios!'
             error = true;
          }
      }
  
      !error && this.submit()
    });
/*     $("btn-show-pass").addEventListener("click", ({ target }) => {
        if (target.localName === "i") {
          target.classList.toggle("fa-eye");
          $("password").type = $("password").type === "text" ? "password" : "text";
        } else {
          target.childNodes[0].classList.toggle("fa-eye");
          $("password").type = $("password").type === "text" ? "password" : "text";
        }
      }); */
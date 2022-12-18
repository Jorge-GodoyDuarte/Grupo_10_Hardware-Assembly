console.log("userRegister.js connected!");
const allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;



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



const verifyEmail = async (email) => {
  try {
    let response = await fetch("/api/users/verify-email", {  //puede haber error
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let result = await response.json();

    console.log(result);

    return result.verified;
  } catch (error) {
    console.error;
  }
};

$("firstname").addEventListener("blur", function ({ target }) {
  switch (true) {
    case !this.value.trim():
      msgError("errorNombre", "El nombre es obligatorio", target);
      break;
    case this.value.trim().length < 2:
      msgError(
        "errorNombre",
        "El nombre como mínimino debe tener dos caracteres",
        target
      );
      break;
    case !exRegs.exRegAlfa.test(this.value):
      msgError("errorNombre", "El nombre debe tener solo letras", target);
      break;
    default:
      validField("errorNombre", target);
      break;
  }
});

$("lastname").addEventListener("blur", function ({ target }) {
  switch (true) {
    case !this.value.trim():
      msgError("errorApellido", "El apellido es obligatorio", target);
      break;
    case this.value.trim().length < 2:
      msgError(
        "errorApellido",
        "El apellido como mínimino debe tener dos caracteres",
        target
      );
      break;
    case !exRegs.exRegAlfa.test(this.value):
      msgError("errorApellido", "El apellido debe tener solo letras", target);
      break;
    default:
      validField("errorApellido", target);
      break;
  }
});

$("email").addEventListener("blur", async function ({ target }) {
  switch (true) {
    case !this.value.trim():
      msgError("errorEmail", "El email es obligatorio", target);
      break;
    case !exRegs.exRegEmail.test(this.value):
      msgError("errorEmail", "El email tiene un formato incorrecto", target);
      break;
    case await verifyEmail(this.value):
      msgError("errorEmail", "El email ya está registrado", target);
      break;
    default:
      validField("errorEmail", target);
      break;
  }
});

$("password").addEventListener("focus", () => {
  $("msgPass").hidden = false;
});

$("password").addEventListener("blur", function ({ target }) {
  $("msgPass").hidden = true;
  switch (true) {
    case !this.value.trim():
      msgError("errorPass", "La contraseña es obligatoria", target);
      break;
    case !exRegs.exRegPass.test(this.value):
      msgError(
        "errorPass",
        "La contraseña debe tener un símbolo, un número, una mayúscula, una minúscula y entre 6 y 8 caracteres",
        target
      );
      break;
    default:
      validField("errorPass", target);
      break;
  }
});

$("password2").addEventListener("blur", function ({ target }) {
    switch (true) {
      case !this.value.trim():
        msgError("errorPass2", "Debes verificar la contraseña", target);
        break;
      case this.value.trim() !== $('password').value.trim():
        msgError(
          "errorPass2",
          "Las contraseñas no coinciden",
          target
        );
        break;
      default:
        validField("errorPass2", target);
        break;
    }
  });

$("form-register").addEventListener("submit", function (e) {
  e.preventDefault(); //chequea todos los eventos

let error = false;

  const elements = this.elements;
    for (let i = 0; i < elements.length - 2; i++) {
        console.log(elements[i]);
        if(!elements[i].value.trim() || elements[i].classList.contains('is-invalid') && !$('province-input').classList.contains('is-invalid')){
            elements[i].classList.add('is-invalid')
           $('msgError').innerText = 'Hay campos con errores o estan vacios!'
           error = true;
           console.log(document.querySelector('provincia') + 'zzzzzzzzzzzzzzzzzzzzzzzzzasd aca ')
        }
    }

    !error && this.submit()

/*     Swal.fire({
        position: "center",
        icon: "info",
        title: "Recibirás un email para confirmar tu registración",
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
    }).then((result) => {
        if (result.isConfirmed) {
            this.submit();
        }
    }); 
    */
}); 

$("btn-show-pass").addEventListener("click", ({ target }) => {
  if (target.localName === "i") {
    target.classList.toggle("fa-eye");
    $("password").type = $("password").type === "text" ? "password" : "text";
  } else {
    target.childNodes[0].classList.toggle("fa-eye");
    $("password").type = $("password").type === "text" ? "password" : "text";
  }
});
              const apiUrlBase = "https://apis.datos.gob.ar/georef/api"

               const getProvinces = async () => {
              try {
  
                const response = await fetch(`${apiUrlBase}/provincias`);
                const result = await response.json();
  
                result.provincias.sort((a, b) => a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0)
  
                return result.provincias
  
              } catch (error) {
                console.error
              }
  
            };
  
            const getCities = async (provincia) => {
              try {
  
                const response = await fetch(`${apiUrlBase}/localidades?provincia=${provincia}&max=4000`);
                const result = await response.json();
  
                result.localidades.sort((a, b) => a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0)
  
                return  result.localidades
  
              } catch (error) {
                console.log(error)
              }
            } 
  

              
  
                 window.addEventListener('load', async () => {
                const provincias = await getProvinces();
                $('city').innerHTML = `<option selected hidden>Seleccione...</option>`;
               provincias.forEach( provincia => {
                $('city').innerHTML += `<option value="${provincia.nombre}" >${provincia.nombre}</option>`
               
               });
                    })

  
            






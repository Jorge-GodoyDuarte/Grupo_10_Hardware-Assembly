console.log("userLogin.js connected!");
const apiUrlBase = "https://apis.datos.gob.ar/georef/api"



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


$("password").addEventListener("focus", () => {
    $("msgPass").hidden = false;
  });
  
  $("password").addEventListener("blur", function ({ target }) {
    $("msgPass").hidden = true;
    switch (true) {
      case !this.value.trim():
        msgError("errorPass", "La contraseña es obligatoria", target);
        break;
    
      default:
        validField("errorPass", target);
        break;
    }
  });
console.log("userProfile.js connected!");
const allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;



$('avatar').addEventListener('change', function ({ target }) {
    
    if(!allowedExtensions.exec(target.value)){
        $("msgErrorAvatar").innerText = "Solo archivos de imagen!"
        target.value = null;

    }else{

    let reader = new FileReader();

    reader.readAsDataURL(target.files[0]);

    reader.onload = () => {
        $('imagePreview').src = reader.result
    }
}
})
console.log("userProfile.js connected!");




$('avatar').addEventListener('change', function ({ target }) {
    
    let reader = new FileReader();

    reader.readAsDataURL(target.files[0]);

    reader.onload = () => {
        $('imagePreview').src = reader.result
    }
})
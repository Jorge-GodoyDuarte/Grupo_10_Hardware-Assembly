const $ = (element) => document.getElementById(element);

$('btnLogout') && $('btnLogout').addEventListener('click', (e) => {
    e.preventDefault();
    

    Swal.fire({
        title: '¿Te vas tan pronto?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, me voy'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = e.target.pathname
            
        }else {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Gracias por quedarte un ratito más ',
                showConfirmButton: false,
                timer: 1500
              }) 
        }
    });

})
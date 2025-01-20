const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')

function toggleSidebar(){
  sidebar.classList.toggle('close')
  toggleButton.classList.toggle('rotate')

  closeAllSubMenus()
}




const formulario = document.getElementById("login");
formulario.addEventListener("submit", function(event) {
    event.preventDefault(); 
    
   
    const correo = document.getElementById("correo").value;
    const pass = document.getElementById("pass").value;

    const user = {
      correo: correo,
      pass: pass
    }
    if (user) {
      console.log(user)
      localStorage.setItem("user", JSON.stringify(user));
      
    }
    window.location.href='/src/contacts.html'
});


const usuario = JSON.parse(localStorage.getItem('user'))
if (usuario){
  document.getElementById('correo').innerHTML = `${usuario.correo}`
}


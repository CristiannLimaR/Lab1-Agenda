const user = JSON.parse(localStorage.getItem('user'));

if (user) {
  document.getElementById('correo').innerHTML = `${user.correo}`
   document.getElementById('pass').innerHTML = `${user.pass}`
}
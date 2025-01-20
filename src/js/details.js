const contact = JSON.parse(localStorage.getItem('contact'));

if (contact) {
  document.getElementById('name').innerHTML = `${contact.name}`
  document.getElementById('img').innerHTML = `<img class="avatar-circle" src="${contact.img}"></img>`
  document.getElementById('email').innerHTML = `${contact.email}`
  document.getElementById('number').innerHTML = `${contact.phone}`
}
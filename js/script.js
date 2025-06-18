document.addEventListener('DOMContentLoaded', () => {
  // Inicializar AOS
  AOS.init({ duration: 800 });

  // ==========================
  // FORMULARIO DE REGISTRO
  // ==========================
  const registroForm = document.getElementById('registroForm');
  if (registroForm) {
    registroForm.addEventListener('submit', e => {
      e.preventDefault();

      const username = document.getElementById('username').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      if (!username || !email || !password || !confirmPassword) {
        return alert('Por favor, completa todos los campos.');
      }
      if (password !== confirmPassword) {
        return alert('Las contraseñas no coinciden.');
      }

      localStorage.setItem('user', JSON.stringify({ username, email }));
      alert('¡Registro exitoso!');
      window.location.href = 'index.html';
    });
  }

  // ==========================
  // MOSTRAR USUARIO EN index.html
  // ==========================
  const registroInfo = document.getElementById('registro-info');
  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (registroInfo) {
    if (storedUser?.username && storedUser?.email) {
      registroInfo.innerHTML = `
        <div class="card text-white bg-dark border-primary shadow-sm mb-3">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span><i class="bi bi-person-circle"></i> Usuario Registrado</span>
            <button class="btn btn-sm btn-danger" id="btn-eliminar-usuario">
              <i class="bi bi-trash"></i> Eliminar
            </button>
          </div>
          <div class="card-body">
            <h5 class="card-title">${storedUser.username}</h5>
            <p class="card-text mb-0"><i class="bi bi-envelope-fill"></i> ${storedUser.email}</p>
          </div>
        </div>
      `;

      // Evento para eliminar al usuario
      document.getElementById('btn-eliminar-usuario').addEventListener('click', () => {
        if (confirm('¿Eliminar usuario registrado?')) {
          localStorage.removeItem('user');
          location.reload();
        }
      });
      // Eliminar todos los usuarios (botón superior)
      const eliminarUsuarioBtn = document.getElementById('eliminarUsuario');
      if (eliminarUsuarioBtn) {
          eliminarUsuarioBtn.addEventListener('click', () => {
      if (confirm('¿Eliminar todos los usuarios registrados?')) {
      localStorage.removeItem('user');
      location.reload();
    }
  });
}

    } else {
      registroInfo.textContent = 'Aún no hay usuarios registrados.';
    }
  }

  // ==========================
  // FORMULARIO DE CONTACTO
  // ==========================
  const contactoForm = document.getElementById('contactoForm');
  if (contactoForm) {
    contactoForm.addEventListener('submit', e => {
      e.preventDefault();

      const nombre = document.getElementById('name').value.trim();
      const correo = document.getElementById('email').value.trim();
      const mensaje = document.getElementById('message').value.trim();

      if (!nombre || !correo || !mensaje) {
        return alert('Por favor, completa todos los campos.');
      }

      const contactos = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
      contactos.push({ nombre, correo, mensaje, fecha: new Date().toLocaleString() });
      localStorage.setItem('mensajesContacto', JSON.stringify(contactos));

      alert('¡Mensaje enviado exitosamente!');
      contactoForm.reset();
      window.location.href = 'index.html';
    });
  }

  // ==========================
  // MOSTRAR MENSAJES EN index.html
  // ==========================
  const mensajesDiv = document.getElementById('mensajes-contacto');
  const eliminarMensajesBtn = document.getElementById('eliminarMensajes');
  const mensajesGuardados = JSON.parse(localStorage.getItem('mensajesContacto')) || [];

  if (mensajesDiv) {
    if (mensajesGuardados.length > 0) {
      mensajesDiv.innerHTML = mensajesGuardados.map((msg, i) => `
        <div class="card text-white bg-dark border-primary mb-3 shadow-sm">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span><i class="bi bi-person-circle"></i> <strong>${msg.nombre}</strong></span>
            <small class="text-light">${msg.fecha}</small>
          </div>
          <div class="card-body">
            <p class="card-text">${msg.mensaje}</p>
            <p class="mb-0"><i class="bi bi-envelope-fill"></i> ${msg.correo}</p>
            <button class="btn btn-outline-danger btn-sm mt-3 eliminar-mensaje" data-index="${i}">
              <i class="bi bi-trash"></i> Eliminar
            </button>
          </div>
        </div>
      `).join('');
    } else {
      mensajesDiv.textContent = 'No hay mensajes de contacto registrados aún.';
    }

    // Eliminar todos los mensajes
    if (eliminarMensajesBtn) {
      eliminarMensajesBtn.addEventListener('click', () => {
        if (confirm('¿Eliminar todos los mensajes?')) {
          localStorage.removeItem('mensajesContacto');
          location.reload();
        }
      });
    }

    // Eliminar mensaje individual
    mensajesDiv.addEventListener('click', e => {
      const btn = e.target.closest('.eliminar-mensaje');
      if (btn) {
        const index = parseInt(btn.dataset.index);
        mensajesGuardados.splice(index, 1);
        localStorage.setItem('mensajesContacto', JSON.stringify(mensajesGuardados));
        location.reload();
      }
    });
  }
});

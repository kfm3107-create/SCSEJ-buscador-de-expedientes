// --- INICIALIZAR RELOJ Y TEMPORIZADOR ---
let tiempoRestante = 600; // 10 minutos en segundos

function actualizarReloj() {
    const ahora = new Date();
    const fecha = ahora.toLocaleDateString('es-PE');
    const hora = ahora.toLocaleTimeString('es-PE');

    const fechaElement = document.getElementById('current-date');
    const horaElement = document.getElementById('current-time');

    if (fechaElement) fechaElement.textContent = fecha;
    if (horaElement) horaElement.textContent = hora;
}

function iniciarTemporizador() {
    const timerElement = document.getElementById('countdown-timer');
    if (!timerElement) return;

    const intervalo = setInterval(() => {
        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            timerElement.textContent = "00:00";
            alert("Sesión expirada. Redirigiendo al inicio.");
            location.reload();
            return;
        }

        tiempoRestante--;
        const minutos = Math.floor(tiempoRestante / 60);
        const segundos = tiempoRestante % 60;
        timerElement.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    }, 1000);
}

// Iniciar reloj y temporizador al cargar la página
actualizarReloj();
setInterval(actualizarReloj, 1000);
iniciarTemporizador();

// --- NAVEGACIÓN ---
function ingresarSistema() {
    document.getElementById('view-disclaimer').classList.add('hidden');
    document.getElementById('main-app').classList.remove('hidden');
    document.getElementById('view-search').classList.remove('hidden');
}

function volverAlBuscador() {
    document.getElementById('view-search').classList.remove('hidden');
    document.getElementById('view-results').classList.add('hidden');
    document.getElementById('view-report').classList.add('hidden');
    document.getElementById('view-faq').classList.add('hidden'); // Ocultar FAQ
}

function volverAResultados() {
    document.getElementById('view-results').classList.remove('hidden');
    document.getElementById('view-report').classList.add('hidden');
    document.getElementById('view-faq').classList.add('hidden');
}


// --- BÚSQUEDA ---
function realizarBusqueda() {
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Buscando...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;

        document.getElementById('view-search').classList.add('hidden');
        document.getElementById('view-results').classList.remove('hidden');
    }, 800);
}
// --- NUEVO: MOSTRAR PREGUNTAS FRECUENTES ---
function mostrarFAQ() {
    document.getElementById('view-search').classList.add('hidden');
    document.getElementById('view-results').classList.add('hidden');
    document.getElementById('view-report').classList.add('hidden');
    document.getElementById('view-faq').classList.remove('hidden');

    // Actualizar el estado activo del menú de navegación
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    // El tercer enlace es "PREGUNTAS FRECUENTES"
    document.querySelectorAll('.nav-link')[2].classList.add('active');
}

// --- REPORTE ---
function verReporte() {
    document.getElementById('view-results').classList.add('hidden');
    document.getElementById('view-report').classList.remove('hidden');
}

// --- VISOR DE PDF (MODAL) ---
function abrirPDF(nombreArchivo) {
    const rutaCodificada = 'docs/' + encodeURIComponent(nombreArchivo);

    document.getElementById('pdf-modal-title').textContent = nombreArchivo;
    document.getElementById('pdf-iframe').src = rutaCodificada;
    document.getElementById('pdf-modal').classList.remove('hidden');
}

function cerrarPDF() {
    document.getElementById('pdf-iframe').src = '';
    document.getElementById('pdf-modal').classList.add('hidden');
}

// --- MODAL RENIEC ---
function abrirReniec(tipo) {
    const modal = document.getElementById('reniec-modal');

    if (tipo === 'demandado') {
        document.getElementById('reniec-img').src = 'img/kat.jpg';
        document.getElementById('reniec-dni').innerHTML = '<strong>DNI:</strong> ******';
        document.getElementById('reniec-nombres').innerHTML = '<strong>Nombres:</strong> Khatherine ******';
        document.getElementById('reniec-apellidos').innerHTML = '<strong>Apellidos:</strong> ****** ******';
        document.getElementById('reniec-rol').innerHTML = '<strong>Rol Procesal:</strong> DEMANDADO';
    } else {
        document.getElementById('reniec-img').src = 'img/cajarp.jpg';
        document.getElementById('reniec-dni').innerHTML = '<strong>RUC:</strong> 20382036655';
        document.getElementById('reniec-nombres').innerHTML = '<strong>Razón Social:</strong> CAJA MUNICIPAL DE AHORRO Y CREDITO DE AREQUIPA S.A. - CAJA AREQUIPA';
        document.getElementById('reniec-apellidos').innerHTML = '<strong>Apellidos:</strong> ******';
        document.getElementById('reniec-rol').innerHTML = '<strong>Rol Procesal:</strong> DEMANDANTE';
    }

    modal.classList.remove('hidden');
}

function cerrarReniec() {
    document.getElementById('reniec-modal').classList.add('hidden');
}

// --- MODAL DETALLES (Ahora es dinámico) ---
function abrirDetalles(titulo, destinatario, anexos, fechaRes, fechaEnv, diasJuzgado, diasCentral, fechaNotif) {
    // Actualizar el título
    document.getElementById('detalles-title').textContent = titulo;

    // Actualizar los datos generales
    document.getElementById('detalles-destinatario').innerHTML = `<strong>${destinatario}</strong>`;
    document.getElementById('detalles-anexos').innerHTML = `<strong>${anexos}</strong>`;

    // Actualizar la sección "Días en Juzgado"
    document.getElementById('detalles-fecha-res').textContent = fechaRes;
    document.getElementById('detalles-fecha-env').innerHTML = `${fechaEnv} <span class="text-red">días*(${diasJuzgado})</span>`;

    // Actualizar la sección "Días en central de notificación"
    document.getElementById('detalles-fecha-notif').innerHTML = `${fechaNotif} <span class="text-red">días*(${diasCentral})</span>`;

    // Mostrar el modal
    document.getElementById('detalles-modal').classList.remove('hidden');
}

// --- NUEVO: ACORDEÓN DE PREGUNTAS ---
function toggleFAQ(element) {
    // Cerrar todas las demás respuestas abiertas (opcional, para efecto acordeón estricto)
    const allQuestions = document.querySelectorAll('.faq-question');
    allQuestions.forEach(q => {
        if (q !== element && q.classList.contains('active')) {
            q.classList.remove('active');
            q.nextElementSibling.classList.remove('show');
        }
    });

    // Alternar la pregunta actual
    element.classList.toggle('active');
    const answer = element.nextElementSibling;
    answer.classList.toggle('show');
}

function cerrarDetalles() {
    document.getElementById('detalles-modal').classList.add('hidden');
}
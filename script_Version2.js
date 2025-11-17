let currentModuleIndex = 0;
let currentLessonIndex = 0;
let currentSlideIndex = 0;

// Enlaces a anexos en Google Drive
const ANEXOS = {
    'anexo1': 'https://drive.google.com/file/d/1dSwZtAgw8FzMHCiU0TjfTRw-2WI0RBb7/view',
    'anexo2': 'https://drive.google.com/file/d/1HohOmHTm8FhG2RcqftnYJqTC4-zW3Ec6/view',
    'anexo3': 'https://drive.google.com/file/d/1CbF8sveT4_oBhQRualZOqUi7d37U6NcF/view',
    'anexo4': 'https://drive.google.com/file/d/1ea5QKUoxCXiKVTqreVKIH-yH-SzxD8ce/view',
    'anexo5': 'https://drive.google.com/file/d/1CDaypaESTaSsPeyrN_J29_dI38FiToxh/view',
    'anexo6': 'https://drive.google.com/file/d/1RGk_yDZZChquIanYBoiSSRktiXM6Fn3B/view',
    'anexo7': 'https://drive.google.com/file/d/12jcVnp9t1R38B-6ZFUtm9579PjDO9CGV/view',
    'anexo8': 'https://drive.google.com/file/d/1XscKrQddkvPasbN5L3hzHRWiafab5rt2/view',
    'anexo9': 'https://drive.google.com/file/d/1sPnaoDC-8vXeXNfEoIviCW-mCg1eAmK6/view',
    'anexo10': 'https://drive.google.com/file/d/1ZvooKphk0L0GE1K9GuF6b3MOvrTXCW37/view',
    'anexo11': 'https://drive.google.com/file/d/1SxP1Fb3WdU9QBdkYl5hxCfXVk0GwbdBT/view',
    'anexo12': 'https://drive.google.com/file/d/19QGGrqRr4c_WvO9z_DXNwc2UXLiToRsc/view',
    'anexo13': 'https://drive.google.com/file/d/1kLScACgDEBT02wll-k2kF3VIY18Ju9ZQ/view',
    'anexo14': 'https://drive.google.com/file/d/1oOk2l8tOtmiTK4P-1uiiZIjrD-eVLGVW/view',
    'anexo15': 'https://drive.google.com/file/d/1h5Ry6VlTUHCJeiQfOEaoFTOy-sTenSN5/view',
    'anexo16': 'https://drive.google.com/file/d/19dC39f4XKDcyALBhm-Vu4HmYdxyRnqEG/view',
    'anexo17': 'https://drive.google.com/file/d/1Ai7sTyTUZMYB13XG-ZjZjLAYraDZn48k/view',
    'anexo18': 'https://drive.google.com/file/d/1J_qQ1xGeTlleGqXypPDXml8HDtSie-yC/view',
    'anexo19': 'https://drive.google.com/file/d/1mnF3vxPzARZ1gdBMgst-otRmJth2HJKH/view'
};

const ANEXOS_LECCION = {
    // Módulo 1
    '1-1': ['anexo3'],
    '1-2': ['anexo4'],
    '1-3': ['anexo1', 'anexo2'],
    // Módulo 2
    '2-1': ['anexo5'],
    '2-2': ['anexo6'],
    '2-3': ['anexo7'],
    '2-4': ['anexo8'],
    '2-5': ['anexo9'],
    // Módulo 3
    '3-1': ['anexo10'],
    '3-2': ['anexo11'],
    '3-3': ['anexo12'],
    // Módulo 4
    '4-1': ['anexo13'],
    '4-2': ['anexo14'],
    '4-3': ['anexo15'],
    '4-4': ['anexo16'],
    // Módulo 5
    '5-1': ['anexo17'],
    '5-2': ['anexo18'],
    '5-3': ['anexo19']
};

const PRACTICAL_FORM_URL = 'https://forms.gle/zNytvy8UwBb8RmyX6';
const FINAL_ACCREDITATION_URL = 'https://forms.gle/XQ7V4MdWpHayYohQ8';
const CERTIFICATE_URL = 'URL_DEL_CERTIFICADO_DIGITAL_AQUI.pdf';

const STORAGE_KEY = 'notion_course_state_v1';
const USER_KEY = 'notion_participant_v1';

let appState = {
    completedLessons: {},
    evidence: {},
    finalScore: null,
    lastSaved: null
};

let participant = { name: null, email: null };

/** courseData se mantiene igual, ya que tus textos y videos ya son correctos y bien segmentados **/

// ... (El bloque de definición de courseData es igual, no requiere cambio.)

// -------------- Lógica scripts UI principal ----------------------

function openParticipantModal() {
    const participantModal = document.getElementById('participantModal');
    const savedUser = localStorage.getItem(USER_KEY);

    // Si ya hay datos guardados, los rellenamos en los inputs
    if (savedUser) {
        participant = JSON.parse(savedUser);
        document.getElementById('participantName').value = participant.name || '';
        document.getElementById('participantEmail').value = participant.email || '';
    } else {
        // Si no hay nada, dejamos los campos vacíos
        document.getElementById('participantName').value = '';
        document.getElementById('participantEmail').value = '';
    }

    // Mostramos el modal
    participantModal.style.display = 'flex';
}

function skipIdentify() {
    participant = { name: 'Anónimo', email: 'anonymous@example.com' };
    localStorage.setItem(USER_KEY, JSON.stringify(participant));
    document.getElementById('participantModal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    const participantModal = document.getElementById('participantModal');
    const savedUser = localStorage.getItem(USER_KEY);

    if (savedUser) {
        participant = JSON.parse(savedUser);
        participantModal.style.display = 'none';
    } else {
        participantModal.style.display = 'flex';
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            appState = JSON.parse(saved);
        } catch (e) {
            console.warn('Estado corrupto', e);
        }
    }

    renderModules();
    updateButtonsState();
});

function saveState() {
    appState.lastSaved = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    updateButtonsState();
}

function markLessonCompleted(moduleId, lessonId) {
    const key = `${moduleId}-${lessonId}`;
    appState.completedLessons[key] = true;
    saveState();
    renderModules();
    closeModal();
}

function unmarkLessonCompleted(moduleId, lessonId) {
    const key = `${moduleId}-${lessonId}`;
    delete appState.completedLessons[key];
    saveState();
    renderModules();
}

function isLessonCompleted(moduleId, lessonId) {
    return !!appState.completedLessons[`${moduleId}-${lessonId}`];
}

function renderModules() {
    const container = document.getElementById('modulesContainer');
    container.innerHTML = '';

    courseData.modules.forEach(mod => {
        const moduleEl = document.createElement('div');
        moduleEl.className = 'module';
        moduleEl.innerHTML = `
                    <div class="module-header" onclick="toggleModule(${mod.id})">
                        <h2>${mod.name}</h2>
                        <div class="module-duration">${mod.duration}</div>
                    </div>
                    <div class="module-content ${mod.open ? 'active' : ''}" id="module-${mod.id}">
                        <div class="lesson-list" id="lesson-list-${mod.id}"></div>
                    </div>
                `;
        container.appendChild(moduleEl);

        const lessonList = moduleEl.querySelector(`#lesson-list-${mod.id}`);
        mod.lessons.forEach(lesson => {
            const completed = isLessonCompleted(mod.id, lesson.id);
            const card = document.createElement('div');
            card.className = 'lesson-card';
            card.innerHTML = `
                        <div class="lesson-header">
                            <div class="lesson-number">Lección ${lesson.id}</div>
                            <div class="lesson-time">${lesson.duration}</div>
                        </div>
                        <div class="lesson-title">${lesson.title}</div>
                        <div class="lesson-description">${lesson.description || ''}</div>
                        <div class="lesson-actions">
                            <button class="btn btn-primary" onclick="openLessonModal(${mod.id}, ${lesson.id})">Abrir lección</button>
                            <button class="btn ${completed ? 'btn-secondary' : 'btn-success'}" onclick="event.stopPropagation(); toggleCompleted(${mod.id}, ${lesson.id}, event)">
                                ${completed ? '✓ Completada' : 'Marcar completa'}
                            </button>
                        </div>
                    `;
            lessonList.appendChild(card);
        });
    });

    updateProgressUI();
}

function toggleModule(moduleId) {
    const el = document.getElementById(`module-${moduleId}`);
    if (el) {
        el.classList.toggle('active');
    }

    // Actualizar el estado en courseData
    const mod = courseData.modules.find(m => m.id === moduleId);
    if (mod) {
        mod.open = !mod.open;
    }
}

function toggleCompleted(moduleId, lessonId, event) {
    event.preventDefault();
    event.stopPropagation();
    if (isLessonCompleted(moduleId, lessonId)) {
        if (!confirm('¿Desmarcar como completada?')) return;
        unmarkLessonCompleted(moduleId, lessonId);
    } else {
        markLessonCompleted(moduleId, lessonId);
    }
}

// NUEVO: Función para renderizar automáticamente los anexos por lección al final de slides
function renderLeccionAnexosSlide(moduleId, lessonId) {
    const key = `${moduleId}-${lessonId}`;
    const anexos = ANEXOS_LECCION[key] || [];
    if (!anexos.length) return null;

    let html = `
      <div class="anexo-reference">
        <strong>📋 Anexos de esta lección:</strong>
        <ul>
    `;
    anexos.forEach(aid => {
        let n = aid.replace('anexo','');
        html += `
          <li>
            <a href="${ANEXOS[aid]}" target="_blank">
                📄 Ver Anexo ${n}
            </a>
          </li>
        `;
    });
    html += `</ul></div>`;
    return {
        title: "Anexos",
        content: html
    };
}

function getLessonSlides(moduleId, lessonId) {
    const mod = courseData.modules.find(m => m.id === moduleId);
    const lesson = mod ? mod.lessons.find(l => l.id === lessonId) : null;
    if (!lesson) return [];

    let slides = [];

    if (lesson.videoUrl) {
        // Añadimos parámetros amigables para móvil (playsinline) y extra
        const baseUrl = lesson.videoUrl;
        const urlWithParams = baseUrl.includes('?')
            ? `${baseUrl}&rel=0&modestbranding=1&playsinline=1`
            : `${baseUrl}?rel=0&modestbranding=1&playsinline=1`;

        slides.push({
            isVideo: true,
            title: `Video: ${lesson.title}`,
            content: `
                <div class="video-container">
                    <iframe
                        src="${urlWithParams}"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </div>
            `
        });
    }

    if (lesson.content && lesson.content.length) {
        lesson.content.forEach(c => slides.push(c));
    }

    // Slide de anexos (después de los contenidos)
    const anexosSlide = renderLeccionAnexosSlide(moduleId, lessonId);
    if (anexosSlide) slides.push(anexosSlide);

    // Si no hay absolutamente nada, slide de "Contenido No Disponible"
    if (slides.length === 0) {
        slides.push({
            title: "Contenido No Disponible",
            content: `<p>Esta lección aún no tiene contenido disponible.</p>`
        });
    }

    return slides;
}

function openLessonModal(moduleId, lessonId) {
    event.stopPropagation();

    const mod = courseData.modules.find(m => m.id === moduleId);
    const lesson = mod ? mod.lessons.find(l => l.id === lessonId) : null;

    if (!mod || !lesson) return;

    const modal = document.getElementById('lessonModal');
    const modalBody = document.getElementById('modalBody');
    const modalTitle = document.getElementById('modalTitle');
    const slides = getLessonSlides(moduleId, lessonId);

    modalTitle.textContent = `${mod.name} › ${lesson.title}`;

    let html = '';
    slides.forEach((slide, idx) => {
        const contentHtml = slide.isVideo
            ? slide.content
            : `<div class="slide-content">${slide.content || ''}</div>`;

        html += `<div class="presentation-slide" data-slide-index="${idx}">
                            <h3 class="slide-title">${slide.title || ''}</h3>
                            ${contentHtml}
                         </div>`;
    });

    modalBody.innerHTML = html;
    modal.classList.add('active');

    currentModuleIndex = moduleId;
    currentLessonIndex = lessonId;
    currentSlideIndex = 0;
    updateModalContent();
}

function updateModalContent() {
    const allSlides = getLessonSlides(currentModuleIndex, currentLessonIndex);
    const totalSlides = allSlides.length;

    document.querySelectorAll('#modalBody .presentation-slide').forEach((el, idx) => {
        el.classList.remove('active');
        if (idx === currentSlideIndex) {
            el.classList.add('active');
        }
    });

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');

    prevBtn.disabled = currentSlideIndex === 0;

    if (currentSlideIndex >= totalSlides - 1) {
        nextBtn.textContent = '✓ Marcar como completada';
        nextBtn.style.background = '#28a745';
        nextBtn.onclick = () => markLessonCompleted(currentModuleIndex, currentLessonIndex);
    } else {
        nextBtn.textContent = 'Siguiente';
        nextBtn.style.background = '#007bff';
        nextBtn.onclick = nextSlide;
    }

    const progress = totalSlides > 0 ? Math.round(((currentSlideIndex + 1) / totalSlides) * 100) : 100;
    if (progressBar) progressBar.style.width = progress + '%';
}

function nextSlide() {
    const totalSlides = getLessonSlides(currentModuleIndex, currentLessonIndex).length;
    if (currentSlideIndex < totalSlides - 1) {
        currentSlideIndex++;
        updateModalContent();
    }
}

function previousSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateModalContent();
    }
}

function closeModal() {
    document.getElementById('lessonModal').classList.remove('active');
}

function computeProgress() {
    let total = 0;
    courseData.modules.forEach(m => total += (m.lessons ? m.lessons.length : 0));
    const completed = Object.keys(appState.completedLessons || {}).length;
    const percent = total ? Math.round((completed / total) * 100) : 0;
    return { totalLessons: total, completed, percent };
}

function updateProgressUI() {
    const p = computeProgress();
    const bar = document.getElementById('progressBar');
    if (bar) bar.style.width = p.percent + '%';

    const downloadBtn = document.getElementById('downloadCertBtn');
    const meetsCriteria = p.percent >= 80;

    if (meetsCriteria) {
        downloadBtn.disabled = false;
        downloadBtn.textContent = '🎓 Descargar Certificado';
    } else {
        downloadBtn.disabled = true;
        downloadBtn.textContent = `Certificado No Disponible (${p.percent}%)`;
    }
}

function updateButtonsState() {
    updateProgressUI();
}

// =========================
//  CERTIFICADOS PERSONALIZADOS
// =========================

// Mapa: nombre normalizado → URL de certificado
// (Rellena cada URL_* con el link real de ese PDF)
const CERTIFICATE_LINKS = {
  'medina zaragoza erik alejandro': 'https://drive.google.com/file/d/1v6sTPfXvyjCNk1DXGDavs3ZhySgCSPCs/view?usp=drive_link',
  'miramontes montes miriam sarai': 'https://drive.google.com/file/d/1WC4YX-8aYAynmCOARxwVdwZkHRfpYhx4/view?usp=drive_link',
  'morales cruz leslie gectzalin': 'https://drive.google.com/file/d/18urlYK7K_ITxP3Un-dJ9nnb9Jj6EDogt/view?usp=drive_link',
  'munoz vazquez valery': 'https://drive.google.com/file/d/1-oJtsXLMvo1kRZ1fopsTkqQ_4B7t17yZ/view?usp=drive_link',
  'ortiz sotelo angel guillermo': 'https://drive.google.com/file/d/1jQy4Q8N9tcTf4To_NuKWteccSSBILnBf/view?usp=drive_link',
  'perez soto vivian natalie': 'https://drive.google.com/file/d/1lr5UMCGl-ty1nRPBSzJhqc-m23_7LafZ/view?usp=drive_link',
  'plancarte romero lenny': 'https://drive.google.com/file/d/1gxjdXoL4WefGIhJ7dGQIEiUbRvToAtdr/view?usp=drive_link',
  'plascencia montalvo andrea fernanda': 'https://drive.google.com/file/d/1dBrpTV31HmTtoe52kk_oyjtE_DR2jKft/view?usp=drive_link',
  'rios rodriguez vanessa': 'https://drive.google.com/file/d/1aeeAhwfydaiXOBSCER3TQPwpdIkPcwuI/view?usp=drive_link',
  'rubio fabela fernanda': 'https://drive.google.com/file/d/1Sog_fGYM54GaPCvDGdJqvfflbKf6iMTI/view?usp=drive_link',
  'salcedo garces kimly fernanda': 'https://drive.google.com/file/d/14LV_ShKop5bXarq59fqtvLCbk2VBEuuQ/view?usp=drive_link',
  'sanchez hernandez ricardo': 'https://drive.google.com/file/d/13oKxsIAPrUsLKa_BuSYJ1KwGOms4w2I1/view?usp=drive_link',
  'sanchez sosa yesica marisol': 'https://drive.google.com/file/d/1NhUjPoE-DxwCeOg18VRCNJFEFpNzITq6/view?usp=drive_link',
  'villasenor gavidia zamara itzel': 'https://drive.google.com/file/d/1Nc3U_Slr3T8KNoHql8RS8WUvoZstIXu-/view?usp=drive_link',

  'ambario lomeli bryan misael': 'https://drive.google.com/file/d/1tCADT6yOBwvKJz_5bM1d4SO8tfpaXHa2/view?usp=drive_link',
  'avila cortes aleida lizbeth': 'https://drive.google.com/file/d/1UUuEUeUplxCt0uvLXgUreWSlfX-qm26_/view?usp=drive_link',
  'avila cortes irene abigail': 'https://drive.google.com/file/d/1uDZzSMFkXcZLkK2eD5aLeWe6R1ttv8ig/view?usp=drive_link',
  'castro ramirez camila vianney': 'https://drive.google.com/file/d/1_jGCVjmJTxE5OhYuAQkcT5aFGQXghlgy/view?usp=drive_link',
  'cervantes lomeli angelica maria': 'https://drive.google.com/file/d/1Pm30YSSiTi0HkefrEqyaCJu51z4PE_tV/view?usp=drive_link',
  'enriquez orozco karla mariana': 'https://drive.google.com/file/d/1ZNeSqNdE_Bpo7YutvZXqGMU23vw-FJR9/view?usp=drive_link',
  'flores gaona andrea montserrat': 'https://drive.google.com/file/d/1bY1OIY4zP59jTzNeZ_jQ6mono8TXc88V/view?usp=drive_link',
  'franco aguayo cristian joel': 'https://drive.google.com/file/d/1HsXBYEty8cqm3xnhytMgC72-NeD8lIUq/view?usp=drive_link',
  'garcia alvarez cesar': 'https://drive.google.com/file/d/1xf_ggzqAVvweL_PsOMOF26G3kr4W7OE4/view?usp=drive_link',
  'gonzalez aguila carlos eduardo': 'https://drive.google.com/file/d/1CSnFUQbKs2bzfhyXAEW5E8HQbeH69AlB/view?usp=drive_link',
  'gonzalez flores andrea guadalupe': 'https://drive.google.com/file/d/1KWebOeIZajPI18KZKR-Fy_oUFhl-v5ld/view?usp=drive_link',
  'gutierrez rojas efrain': 'https://drive.google.com/file/d/1319xoAVrgyeE3y16TE3ItJL2plUXbQ57/view?usp=drive_link',
  'hernandez garcia iozihua sujey': 'https://drive.google.com/file/d/1XdnwKCkcyAQWJoToQDzhTHyvx0w4tmoL/view?usp=drive_link',
  'hernandez lopez jorge luis': 'https://drive.google.com/file/d/1ZnutEClvP6gG3LMtXR50_FuJByc4uxvb/view?usp=drive_link',
  'jimenez corona diana fernanda': 'https://drive.google.com/file/d/1VUpYpBGSrwh-FuQA7HpY4x4y9BNI8BLS/view?usp=drive_link',
  'leanos maldonado christian michel': 'https://drive.google.com/file/d/1704WmLqA_VCVk2ccMagMKisNxuODPTcB/view?usp=drive_link'
};

// Normaliza nombre: minúsculas, sin acentos, espacios simples
function normalizeName(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita acentos
    .replace(/\s+/g, ' ')
    .trim();
}

// Devuelve la URL personalizada si existe para ese nombre
function getCertificateUrlForName(name) {
  const key = normalizeName(name);
  return CERTIFICATE_LINKS[key] || null;
}

// =========================
//  IDENTIFICACIÓN
// =========================

function saveParticipant() {
    const n = document.getElementById('participantName').value.trim();
    const e = document.getElementById('participantEmail').value.trim();

    if (!n || !e) {
        alert('Nombre y correo requeridos.');
        return;
    }

    if (!e.includes('@') || !e.includes('.')) {
        alert('Por favor, ingresa un formato de correo válido.');
        return;
    }

    // Buscar si el nombre tiene certificado personalizado
    const personalCertUrl = getCertificateUrlForName(n);

    // Guardamos también la URL personalizada (si existe)
    participant = { 
        name: n, 
        email: e,
        certificateUrl: personalCertUrl || null
    };

    localStorage.setItem(USER_KEY, JSON.stringify(participant));
    document.getElementById('participantModal').style.display = 'none';
}

// Si quieres que al recargar recuerde la URL personalizada,
// asegúrate de que en tu DOMContentLoaded vuelvas a leerla:
document.addEventListener('DOMContentLoaded', function () {
    const savedUser = localStorage.getItem(USER_KEY);
    if (savedUser) {
        try {
            participant = JSON.parse(savedUser);
        } catch (e) {
            participant = { name: null, email: null, certificateUrl: null };
        }
    }
    // ...resto de tu código DOMContentLoaded
});

// =========================
//  DESCARGA DE CERTIFICADO
// =========================

function downloadCertificate() {
    // Usa la URL personalizada si existe, si no, el CERTIFICATE_URL general
    const url = (participant && participant.certificateUrl) || CERTIFICATE_URL;

    if (!url || url.includes('URL_DEL_CERTIFICADO')) {
        alert('⚠️ Aún no se ha configurado el enlace del certificado. Contacta al instructor.');
        return;
    }
    window.open(url, '_blank');
}

setInterval(() => saveState(), 30000);
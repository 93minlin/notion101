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

const courseData = {
    modules: [
        {
            id: 1,
            name: "Módulo 1: Introducción a Notion",
            duration: "16 minutos",
            open: true,
            lessons: [
                {
                    id: 1,
                    title: "Tipos de Cuenta y Características",
                    duration: "4 min",
                    description: "Comparativa de planes (Gratuito, Plus, Business, Enterprise) y sus diferencias.",
                    videoUrl: null,
                    content: [
                        {
                            title: "Tipos de Cuentas en Notion",
                            content: `<p>Notion ofrece diferentes planes para adaptarse a las necesidades de cada usuario:</p>
                                    <ul>
                                        <li><strong>Plan Gratuito (Personal):</strong> Ideal para estudiantes y uso personal individual. Incluye páginas ilimitadas y bloques ilimitados.</li>
                                        <li><strong>Plan Plus:</strong> Para usuarios que necesitan más funcionalidades avanzadas ($10/mes).</li>
                                        <li><strong>Plan Business:</strong> Diseñado para equipos de trabajo con herramientas de colaboración ($18/mes por usuario).</li>
                                        <li><strong>Plan Enterprise:</strong> Para grandes organizaciones con necesidades de seguridad y administración avanzadas.</li>
                                    </ul>
                                    <div class="anexo-reference">
                                        <strong>📋 Consulta el Anexo 3</strong> para ver una tabla comparativa detallada de todos los planes.
                                        <br><a href="${ANEXOS.anexo3}" target="_blank">📄 Ver Anexo 3 - Comparativa de Planes</a>
                                    </div>
                                    <p style="margin-top: 15px;"><strong>💡 Para estudiantes:</strong> Notion ofrece el plan Plus GRATIS con correo académico (.edu). ¡Aprovéchalo!</p>
                                    <p style="margin-top: 10px;"><strong>🔗 Más información:</strong> <a href="https://www.notion.com/es-es/pricing" target="_blank">www.notion.com/pricing</a></p>`
                        }
                    ]
                },
                {
                    id: 2,
                    title: "Creación de Cuenta en Notion",
                    duration: "3 min",
                    description: "Proceso de registro con Google/Correo, elección de uso (Individual/Equipo).",
                    videoUrl: "https://www.youtube.com/embed/yCGIPS3NL3Q",
                    content: [
                        {
                            title: "Cómo Crear tu Cuenta",
                            content: `<p>Crear una cuenta en Notion es muy sencillo. Sigue estos pasos:</p>
                                    <ol>
                                        <li><strong>Accede a:</strong> <a href="https://www.notion.so" target="_blank">www.notion.so</a></li>
                                        <li><strong>Haz clic en "Sign Up"</strong> (Registrarse)</li>
                                        <li><strong>Elige tu método de registro:</strong>
                                            <ul>
                                                <li>Con correo electrónico</li>
                                                <li>Con cuenta de Google</li>
                                                <li>Con cuenta de Apple</li>
                                            </ul>
                                        </li>
                                        <li><strong>Selecciona el uso:</strong> Personal o para equipo</li>
                                        <li><strong>Confirma tu correo</strong> (si usaste email)</li>
                                        <li><strong>¡Listo!</strong> Ya puedes empezar a usar Notion</li>
                                    </ol>
                                    <div class="anexo-reference">
                                        <strong>📋 Consulta el Anexo 4</strong> para ver una guía visual paso a paso del proceso de registro.
                                        <br><a href="${ANEXOS.anexo4}" target="_blank">📄 Ver Anexo 4 - Guía de Registro</a>
                                    </div>
                                    <p style="margin-top: 15px;"><strong>💡 Tip:</strong> Si eres estudiante, usa tu correo institucional (.edu) para obtener el plan Plus gratuito.</p>`
                        }
                    ]
                },
                {
                    id: 3,
                    title: "¿Qué es Notion? y Usos Clave",
                    duration: "5 min",
                    description: "Concepto 'todo-en-uno', usos como Wiki, Tareas y Bases de Datos.",
                    videoUrl: "https://www.youtube.com/embed/SbNeqwOiZeE",
                    content: [
                        {
                            title: "¿Qué es Notion?",
                            content: `<p><strong>Notion</strong> es una plataforma de productividad "todo-en-uno" que combina múltiples herramientas en un solo espacio:</p>
                                    <ul>
                                        <li>📝 <strong>Tomar notas:</strong> Como un bloc de notas digital avanzado</li>
                                        <li>📊 <strong>Bases de datos:</strong> Para organizar información estructurada</li>
                                        <li>📋 <strong>Gestión de tareas:</strong> Listas de pendientes y seguimiento de proyectos</li>
                                        <li>📚 <strong>Wiki de conocimiento:</strong> Documentación centralizada para equipos</li>
                                        <li>📅 <strong>Calendarios:</strong> Planificación y seguimiento de eventos</li>
                                        <li>🤝 <strong>Colaboración:</strong> Trabajo en equipo en tiempo real</li>
                                    </ul>
                                    <div class="anexo-reference">
                                        <strong>📋 Consulta el Anexo 1</strong> para ver una infografía completa sobre las características de Notion.
                                        <br><a href="${ANEXOS.anexo1}" target="_blank">📄 Ver Anexo 1 - Características de Notion</a>
                                    </div>`
                        },
                        {
                            title: "Usos Principales de Notion",
                            content: `<p>Notion se puede utilizar en diferentes contextos:</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">🎓 Uso Académico</h4>
                                    <ul>
                                        <li>Organizar apuntes de clases por materia</li>
                                        <li>Gestionar tareas y entregas</li>
                                        <li>Crear horarios y calendarios de estudio</li>
                                        <li>Base de datos de recursos y bibliografía</li>
                                    </ul>
                                    <h4 style="color: #007bff; margin-top: 15px;">💼 Uso Profesional</h4>
                                    <ul>
                                        <li>Gestión de proyectos y sprints</li>
                                        <li>Documentación técnica y wikis de equipo</li>
                                        <li>CRM y seguimiento de clientes</li>
                                        <li>Base de conocimiento empresarial</li>
                                    </ul>
                                    <h4 style="color: #007bff; margin-top: 15px;">✨ Uso Personal</h4>
                                    <ul>
                                        <li>Diario personal y journaling</li>
                                        <li>Planner y organización de vida</li>
                                        <li>Seguimiento de hábitos y metas</li>
                                        <li>Recetas, listas de libros, viajes, etc.</li>
                                    </ul>
                                    <div class="anexo-reference">
                                        <strong>📋 Consulta el Anexo 2</strong> para ver ejemplos visuales de cada tipo de uso.
                                        <br><a href="${ANEXOS.anexo2}" target="_blank">📄 Ver Anexo 2 - Ejemplos de Uso</a>
                                    </div>`
                        }
                    ]
                },
                
            ]
        },
        {
            id: 2,
            name: "Módulo 2: Fundamentos de Construcción en Notion",
            duration: "31 minutos",
            open: false,
            lessons: [
                {
                    id: 1,
                    title: "Espacio de trabajo y barra lateral",
                    duration: "4 min",
                    description: "Navegación, Páginas Privadas, Espacios de Equipo, función 'Buscar'.",
                    videoUrl: null,
                    content: [
                        {
                            title: "Navegando en Notion",
                            content: `<p>La interfaz de Notion se organiza en varias secciones clave:</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">🎯 Componentes Principales</h4>
                                    <ol>
                                        <li><strong>Panel de control:</strong> Buscar, Inicio y Bandeja de entrada</li>
                                        <li><strong>Páginas privadas:</strong> Solo visibles para ti</li>
                                        <li><strong>Espacios de equipo:</strong> Para colaboración grupal</li>
                                        <li><strong>Páginas compartidas:</strong> Con permisos específicos</li>
                                        <li><strong>Marketplace:</strong> Plantillas de la comunidad</li>
                                        <li><strong>Espacio de trabajo:</strong> Contenedor principal de todo tu contenido</li>
                                    </ol>
                                    <h4 style="color: #007bff; margin-top: 20px;">🔍 Función de Búsqueda</h4>
                                    <p>Presiona <strong>Ctrl/Cmd + K</strong> para buscar rápidamente cualquier página, bloque o base de datos en tu espacio de trabajo.</p>
                                    <div class="anexo-reference">
                                        <strong>📋 Consulta el Anexo 5</strong> para ver una guía visual completa de la navegación en Notion.
                                        <br><a href="${ANEXOS.anexo5}" target="_blank">📄 Ver Anexo 5 - Guía de Navegación</a>
                                    </div>
                                    <p style="margin-top: 15px;"><strong>🔗 Más información:</strong> <a href="https://www.notion.com/es-es/help/navigate-with-the-sidebar" target="_blank">Navegar con la barra lateral</a></p>`
                        }
                    ]
                },
                {
                    id: 2,
                    title: "Construcción con bloques",
                    duration: "8 min",
                    description: "Uso del comando `/`, creación de encabezados, listas y 'Toggles' (Desplegables).",
                    videoUrl: "https://www.youtube.com/embed/KJHLXOV6vHY",
                    content: [
                        {
                            title: "¿Qué es un bloque?",
                            content: `<p>En Notion, <strong>todo es un bloque</strong>. Un bloque es la unidad básica de contenido que puedes agregar, mover y editar independientemente.</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">Tipos de Bloques</h4>
                                    <p><strong>Bloques Básicos:</strong></p>
                                    <ul>
                                        <li>Texto</li>
                                        <li>Encabezados (H1, H2, H3)</li>
                                        <li>Listas con viñetas y numeradas</li>
                                        <li>Tablas</li>
                                        <li>Desplegables (Toggles)</li>
                                        <li>Llamadas de atención (Callouts)</li>
                                    </ul>
                                    <p><strong>Bloques de Medios:</strong></p>
                                    <ul>
                                        <li>Imágenes</li>
                                        <li>Videos</li>
                                        <li>Audio</li>
                                        <li>Archivos</li>
                                        <li>Contenido Incrustado</li>
                                    </ul>
                                    <p><strong>Bloques Avanzados:</strong></p>
                                    <ul>
                                        <li>Botones</li>
                                        <li>Tabla de contenido</li>
                                        <li>Bloques de IA</li>
                                        <li>Ecuaciones</li>
                                        <li>Fragmentos de código</li>
                                        <li>Bloques sincronizados</li>
                                    </ul>
                                    <div class="anexo-reference">
                                        <strong>📋 Consulta el Anexo 6</strong> para ver una plantilla con ejemplos de todos los tipos de bloques.
                                        <br><a href="${ANEXOS.anexo6}" target="_blank">📄 Ver Anexo 6 - Tipos de Bloques</a>
                                    </div>`
                        }
                    ]
                },
                {
                    id: 3,
                    title: "Bases de datos",
                    duration: "9 min",
                    description: "Creación de bases de datos, uso de Propiedades y Vistas.",
                    videoUrl: "https://www.youtube.com/embed/PbtJh_Pexs8",
                    content: [
                        {
                            title: "¿Qué es una Base de Datos?",
                            content: `<p>Las bases de datos en Notion son <strong>colecciones organizadas de páginas</strong> con propiedades personalizables.</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">Características Principales</h4>
                                    <ul>
                                        <li><strong>Páginas:</strong> Cada elemento que ingresas en tu base de datos es una página de Notion</li>
                                        <li><strong>Propiedades:</strong> Campos que almacenan tipos específicos de información (texto, números, fechas, personas)</li>
                                        <li><strong>Plantillas de base de datos:</strong> Crea nuevas páginas con formato consistente</li>
                                        <li><strong>Vistas:</strong> Diferentes formas de visualizar la misma información (tablas, tableros, calendarios, líneas de tiempo, galerías y listas)</li>
                                        <li><strong>Filtros:</strong> Controla qué elementos aparecen según condiciones específicas</li>
                                    </ul>
                                    <h4 style="color: #007bff; margin-top: 15px;">Tipos de Base de Datos</h4>
                                    <p><strong>Base de datos de página completa:</strong> Existe como su propia página. Ideal para colecciones más grandes de información.</p>
                                    <p><strong>Base de datos en línea:</strong> Se encuentra dentro de otra página junto con otro contenido. Ideal para colecciones más pequeñas.</p>
                                    <div class="anexo-reference">
                                        <strong>📋 Consulta el Anexo 7</strong> para ver una plantilla simple de base de datos lista para usar.
                                        <br><a href="${ANEXOS.anexo7}" target="_blank">📄 Ver Anexo 7 - Plantilla de Base de Datos</a>
                                    </div>`
                        }
                    ]
                },
                {
                    id: 4,
                    title: "Gestión del conocimiento",
                    duration: "7 min",
                    description: "Uso de la función Wiki de Notion.",
                    videoUrl: null,
                    content: [
                        {
                            title: "Wiki en Notion",
                            content: `<p>Un <strong>Wiki</strong> es un repositorio centralizado donde los equipos pueden encontrar información confiable.</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">Beneficios de un Wiki</h4>
                                    <p>Los wikis son ideales para almacenar conocimientos con un ciclo de vida largo, como políticas o guías.</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">Propiedades Clave del Wiki</h4>
                                    <ul>
                                        <li><strong>Propietario de la página:</strong> Indica a la persona responsable de actualizar el contenido</li>
                                        <li><strong>Verificación:</strong> Marca el contenido como oficial y actualizado (marca azul)</li>
                                        <li><strong>Etiquetas:</strong> Ayudan a organizar y filtrar tipos similares de páginas</li>
                                        <li><strong>Vistas:</strong> Diferentes formas de visualizar y acceder a la información</li>
                                    </ul>
                                    <div class="anexo-reference">
                                        <strong>📋 Consulta el Anexo 8</strong> para ver un esqueleto de wiki listo para personalizar.
                                        <br><a href="${ANEXOS.anexo8}" target="_blank">📄 Ver Anexo 8 - Plantilla de Wiki</a>
                                    </div>
                                    <p style="margin-top: 15px;"><strong>🔗 Más información:</strong> <a href="https://www.notion.com/es-es/help/guides/set-up-and-use-a-team-wiki" target="_blank">Creación y uso de un wiki de equipo</a></p>`
                        }
                    ]
                },
                {
                    id: 5,
                    title: "Introducción al Notion Agent",
                    duration: "7 min",
                    description: "Activación y funcionalidades básicas de Notion AI.",
                    videoUrl: null,
                    content: [
                        {
                            title: "Notion AI: Tu Asistente Inteligente",
                            content: `<p><strong>Notion AI</strong> es un asistente integrado que te ayuda a trabajar más rápido.</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">Funcionalidades Principales</h4>
                                    <ul>
                                        <li><strong>Generar contenido:</strong> Crea borradores, listas, ideas y más</li>
                                        <li><strong>Resumir:</strong> Extrae los puntos clave de textos largos</li>
                                        <li><strong>Mejorar escritura:</strong> Corrige gramática, mejora el tono y hace más claro el texto</li>
                                        <li><strong>Traducir:</strong> Convierte contenido a diferentes idiomas</li>
                                        <li><strong>Extraer tareas:</strong> Identifica acción items de notas o reuniones</li>
                                        <li><strong>Responder preguntas:</strong> Busca información en tu espacio de trabajo</li>
                                    </ul>
                                    <h4 style="color: #007bff; margin-top: 15px;">Cómo Activar Notion AI</h4>
                                    <ul>
                                        <li>Escribe <code>/ai</code> en cualquier página</li>
                                        <li>Presiona la barra espaciadora para sugerencias contextuales</li>
                                        <li>Selecciona texto y haz clic en "Ask AI"</li>
                                    </ul>
                                    <div class="anexo-reference">
                                        <strong>📋 Consulta el Anexo 9</strong> para ver una infografía completa sobre Notion AI.
                                        <br><a href="${ANEXOS.anexo9}" target="_blank">📄 Ver Anexo 9 - Guía de Notion AI</a>
                                    </div>
                                    <p style="margin-top: 15px;"><strong>🔗 Más información:</strong> <a href="https://www.notion.com/es-es/help/guides/using-notion-ai" target="_blank">Todo lo que puedes hacer con la IA de Notion</a></p>`
                        }
                    ]
                }
            ]
        },
        {
            id: 3,
            name: "Módulo 3: Trabajo colaborativo en Notion",
            duration: "17 minutos",
            open: false,
            lessons: [
                {
                    id: 1,
                    title: "Compartir y publicar",
                    duration: "5 min",
                    description: "Configuración de permisos y publicación.",
                    videoUrl: "https://www.youtube.com/embed/vuBmd3pGegk",
                    content: [
                        {
                            title: "Compartir en Notion",
                            content: `<p>Notion ofrece múltiples formas de compartir tu trabajo.</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">Niveles de Permisos</h4>
                                    <ul>
                                        <li><strong>Acceso Completo:</strong> Puede editar, comentar y compartir</li>
                                        <li><strong>Puede Editar:</strong> Puede hacer cambios pero no compartir con otros</li>
                                        <li><strong>Puede Comentar:</strong> Solo puede dejar comentarios</li>
                                        <li><strong>Puede Ver:</strong> Solo lectura, sin edición ni comentarios</li>
                                    </ul>
                                    <h4 style="color: #007bff; margin-top: 15px;">Compartir con la Web</h4>
                                    <p>Puedes publicar páginas públicamente en internet para que cualquier persona con el enlace pueda verlas.</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">Cómo Compartir</h4>
                                    <ol>
                                        <li>Haz clic en "Compartir" en la esquina superior derecha</li>
                                        <li>Invita personas por correo o copia el enlace</li>
                                        <li>Ajusta los permisos según necesites</li>
                                    </ol>
                                    <div class="anexo-reference">
                                        <strong>📋 Consulta el Anexo 10</strong> para ver una tabla comparativa de todos los niveles de permisos.
                                        <br><a href="${ANEXOS.anexo10}" target="_blank">📄 Ver Anexo 10 - Niveles de Permisos</a>
                                    </div>
                                    <p style="margin-top: 15px;"><strong>🔗 Más información:</strong> <a href="https://www.notion.com/es-es/help/share-your-work" target="_blank">Compartir tu trabajo</a></p>`
                        }
                    ]
                },
                {
                    id: 2,
                    title: "Colaboración remota",
                    duration: "6 min",
                    description: "Uso de comentarios, menciones y recordatorios.",
                    videoUrl: null,
                    content: [
                        {
                            title: "Herramientas de Colaboración",
                            content: `<p>Notion ofrece múltiples herramientas para trabajar con tu equipo.</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">Comentarios</h4>
                                    <ul>
                                        <li>Selecciona texto y haz clic en el ícono de comentario</li>
                                        <li>O presiona <strong>Cmd/Ctrl + Shift + M</strong></li>
                                        <li>Los comentarios aparecen en el margen derecho</li>
                                        <li>Puedes resolver comentarios cuando se completen</li>
                                    </ul>
                                    <h4 style="color: #007bff; margin-top: 15px;">Menciones (@)</h4>
                                    <ul>
                                        <li><strong>@persona:</strong> Menciona a alguien para notificarle</li>
                                        <li><strong>@página:</strong> Crea un enlace a otra página</li>
                                        <li><strong>@recordar:</strong> Configura recordatorios</li>
                                    </ul>
                                    <h4 style="color: #007bff; margin-top: 15px;">Recordatorios</h4>
                                    <p>Escribe <code>@recordar</code> seguido de la fecha y hora para que Notion te envíe una notificación.</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">Modo Sin Conexión</h4>
                                    <p>Notion sincroniza automáticamente tus cambios cuando recuperas la conexión.</p>
                                    <div class="anexo-reference">
                                        <strong>📋 Consulta el Anexo 11</strong> para ver una guía visual completa de colaboración remota.
                                        <br><a href="${ANEXOS.anexo11}" target="_blank">📄 Ver Anexo 11 - Guía de Colaboración</a>
                                    </div>
                                    <p style="margin-top: 15px;"><strong>🔗 Más información:</strong> <a href="https://www.notion.com/es-es/help/comments-and-mentions" target="_blank">Comentarios y menciones</a></p>`
                        }
                    ]
                },
                {
                    id: 3,
                    title: "Reuniones con IA",
                    duration: "6 min",
                    description: "Resúmenes con Notion AI.",
                    videoUrl: null,
                    content: [
                        {
                            title: "Reuniones Potenciadas con IA",
                            content: `<p>Notion AI puede optimizar tus reuniones.</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">Funciones de IA para Reuniones</h4>
                                    <ul>
                                        <li><strong>Generar resúmenes:</strong> Extrae los puntos clave de las notas de reunión</li>
                                        <li><strong>Extraer tareas:</strong> Identifica automáticamente los action items</li>
                                        <li><strong>Identificar responsables:</strong> Detecta quién es responsable de cada tarea</li>
                                        <li><strong>Crear agenda:</strong> Genera estructuras para reuniones futuras</li>
                                    </ul>
                                    <h4 style="color: #007bff; margin-top: 15px;">Bases de Datos de Reuniones</h4>
                                    <p>Crea una base de datos para gestionar todas tus reuniones:</p>
                                    <ul>
                                        <li>Plantillas para cada tipo de reunión</li>
                                        <li>Propiedades para fecha, participantes y estado</li>
                                        <li>Enlaces a documentos relacionados</li>
                                        <li>Seguimiento de decisiones y acuerdos</li>
                                    </ul>
                                    <h4 style="color: #007bff; margin-top: 15px;">Anotador con IA</h4>
                                    <p>Notion AI puede transcribir y resumir reuniones en tiempo real, capturando decisiones importantes y asignando tareas automáticamente.</p>
                                    <div class="anexo-reference">
                                        <strong>📋 Consulta el Anexo 12</strong> para ver una guía de usos prácticos de IA en reuniones.
                                        <br><a href="${ANEXOS.anexo12}" target="_blank">📄 Ver Anexo 12 - IA en Reuniones</a>
                                    </div>
                                    <p style="margin-top: 15px;"><strong>🔗 Más información:</strong> <a href="https://www.notion.com/es-es/help/guides/preserve-perfect-meeting-memory-with-ai-meeting-notes" target="_blank">Anotador con IA</a></p>`
                        }
                    ]
                }
            ]
        },
        {
            id: 4,
            name: "Módulo 4: Personalización y organización",
            duration: "20 minutos",
            open: false,
            lessons: [
                {
                    id: 1,
                    title: "Personalización de páginas",
                    duration: "5 min",
                    description: "Íconos, portadas y colores.",
                    videoUrl: "https://www.youtube.com/embed/le6RHK7a0jc",
                    content: [
                        {
                            title: "Personaliza tus Páginas",
                            content: `<p>Cada página tiene tres elementos: portada, ícono y título.</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">Agregar Portada</h4>
                                    <ol>
                                        <li>Posiciona el cursor en la parte superior y haz clic en "Agregar portada"</li>
                                        <li>Elige entre:
                                            <ul>
                                                <li><strong>Galería:</strong> Portadas predeterminadas de Notion</li>
                                                <li><strong>Subir:</strong> Imagen de tu dispositivo</li>
                                                <li><strong>Enlace:</strong> URL de una imagen</li>
                                                <li><strong>Unsplash:</strong> Biblioteca de imágenes gratis</li>
                                            </ul>
                                        </li>
                                    </ol>
                                    <h4 style="color: #007bff; margin-top: 15px;">Agregar Ícono</h4>
                                    <ol>
                                        <li>Haz clic en "Agregar un ícono"</li>
                                        <li>Selecciona entre:
                                            <ul>
                                                <li><strong>Emoji:</strong> Listado completo de emojis</li>
                                                <li><strong>Íconos:</strong> Ilustraciones de Notion en 10 colores</li>
                                                <li><strong>Subir:</strong> Tu propia imagen</li>
                                            </ul>
                                        </li>
                                    </ol>
                                    <h4 style="color: #007bff; margin-top: 15px;">Otras Personalizaciones</h4>
                                    <ul>
                                        <li><strong>Estilo de texto:</strong> Negrita, cursiva, subrayado, tachado</li>
                                        <li><strong>Fuente y tamaño:</strong> 3 tipos de fuentes y 2 tamaños</li>
                                        <li><strong>Colores:</strong> Para texto y fondos</li>
                                        <li><strong>Imágenes:</strong> Comando <code>/imagen</code></li>
                                        <li><strong>Inserciones:</strong> Widgets, publicaciones de redes, videos, etc.</li>
                                    </ul>
                                    <div class="anexo-reference">
                                        <strong>📋 Consulta el Anexo 13</strong> para ver una guía paso a paso con capturas.
                                        <br><a href="${ANEXOS.anexo13}" target="_blank">📄 Ver Anexo 13 - Personalización de Páginas</a>
                                    </div>
                                    <p style="margin-top: 15px;"><strong>🔗 Más información:</strong> <a href="https://www.notion.com/es-es/help/guides/getting-started-with-notion" target="_blank">Primeros pasos en Notion</a></p>`
                        }
                    ]
                },
                {
                    id: 2,
                    title: "Vistas simples en bases de datos",
                    duration: "5 min",
                    description: "Las 6 vistas principales.",
                    videoUrl: "https://www.youtube.com/embed/XlsvT383QwE",
                    content: [
                        {
                            title: "Las 6 Vistas Principales",
                            content: `<p>Las vistas te permiten visualizar la misma información de diferentes formas.</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">1. Vista de Tabla</h4>
                                    <p>Muestra las bases de datos como filas, donde cada propiedad está representada por una columna. Ideal para datos estructurados.</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">2. Vista de Tablero</h4>
                                    <p>Agrupa los elementos por propiedad. Semejante a un tablero Kanban, permite mover tareas de un estado a otro.</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">3. Vista de Cronograma</h4>
                                    <p>Utiliza la base de datos para trazar hitos del proyecto en una línea del tiempo. Muestra cuándo se llevan a cabo las tareas y cuánto tiempo tardarán.</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">4. Vista de Calendario</h4>
                                    <p>Muestra los elementos en función de la propiedad "Fecha". Perfecto para planificación temporal.</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">5. Vista de Lista</h4>
                                    <p>Forma limpia y minimalista de representar elementos. Solo muestra íconos y título de cada página.</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">6. Vista de Galería</h4>
                                    <p>Útil para destacar imágenes. Cada imagen es una página dentro de la base de datos.</p>
                                    <div class="anexo-reference">
                                        <strong>📋 Consulta el Anexo 14</strong> para ver una infografía comparativa de todas las vistas.
                                        <br><a href="${ANEXOS.anexo14}" target="_blank">📄 Ver Anexo 14 - Vistas de Base de Datos</a>
                                    </div>
                                    <p style="margin-top: 15px;"><strong>🔗 Más información:</strong> <a href="https://www.notion.com/es-es/help/view-database-pages" target="_blank">Ver páginas de base de datos</a></p>`
                        }
                    ]
                },
                {
                    id: 3,
                    title: "Plantillas básicas",
                    duration: "5 min",
                    description: "Marketplace de plantillas.",
                    videoUrl: "https://www.youtube.com/embed/OeaHV_Jyjkg",
                    content: [
                        {
                            title: "Marketplace de Plantillas",
                            content: `<p>El Marketplace es una galería con miles de plantillas.</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">¿Dónde encontrar el Marketplace?</h4>
                                    <p>En la barra lateral, encontrarás "Notion Marketplace" en la parte inferior.</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">¿Cómo buscar plantillas?</h4>
                                    <p>Aparecerán muchas recomendaciones. En la barra superior, puedes filtrar por categorías:</p>
                                    <ul>
                                        <li><strong>Uso profesional:</strong> Gestión de proyectos, CRM, wikis</li>
                                        <li><strong>Uso personal:</strong> Planners, journals, trackers</li>
                                        <li><strong>Uso educativo:</strong> Apuntes, calendarios académicos</li>
                                    </ul>
                                    <h4 style="color: #007bff; margin-top: 15px;">Información de cada plantilla</h4>
                                    <ul>
                                        <li>Qué contiene y para qué sirve</li>
                                        <li>Reseñas de usuarios y puntuación</li>
                                        <li>Cuántas veces se agregó</li>
                                        <li>Costo (hay muchas opciones gratuitas)</li>
                                        <li>Última actualización</li>
                                        <li>Categorías y funciones incluidas</li>
                                    </ul>
                                    <p style="margin-top: 15px;">Gestiona tus plantillas agregadas en el botón "Adquirido" de la esquina superior derecha.</p>
                                    <div class="anexo-reference">
                                        <strong>📋 Consulta el Anexo 15</strong> para ver una guía básica sobre el uso del Marketplace.
                                        <br><a href="${ANEXOS.anexo15}" target="_blank">📄 Ver Anexo 15 - Guía del Marketplace</a>
                                    </div>
                                    <p style="margin-top: 15px;"><strong>🔗 Más información:</strong> <a href="https://www.notion.com/es-es/templates" target="_blank">Plantillas de Notion</a></p>`
                        }
                    ]
                },
                {
                    id: 4,
                    title: "Recordatorios y enlaces internos",
                    duration: "5 min",
                    description: "Configuración y vinculación.",
                    videoUrl: "https://www.youtube.com/embed/I0Ld2ijlj4k",
                    content: [
                        {
                            title: "Recordatorios y Enlaces",
                            content: `<p>Los recordatorios te permiten recibir notificaciones importantes.</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">Cómo Establecer Recordatorios</h4>
                                    <p>Escribe el comando <code>@recordar</code>. Después puedes:</p>
                                    <ol>
                                        <li>Escribir la fecha y hora directamente: <code>@recordar 14 de octubre 19:00</code></li>
                                        <li>Seleccionar "Recordarme" en el menú y calendarizar</li>
                                    </ol>
                                    <h4 style="color: #007bff; margin-top: 15px;">Otros Tipos de Recordatorios</h4>
                                    <ul>
                                        <li><strong>Recordar a otras personas:</strong> <code>@Nombre @recordar</code></li>
                                        <li><strong>En bases de datos:</strong> En la propiedad fecha, selecciona "Recordatorio"</li>
                                    </ul>
                                    <h4 style="color: #007bff; margin-top: 15px;">Enlaces Internos</h4>
                                    <p>En Notion es fácil enlazar contenido dentro del espacio de trabajo.</p>
                                    <p><strong>Enlaces a páginas integrados en texto:</strong></p>
                                    <ul>
                                        <li>Mención con <code>@</code>: @nombre de página</li>
                                        <li>Comando <code>[[</code>: [[nombre de página</li>
                                        <li>Comando <code>+</code>: +nombre de página</li>
                                    </ul>
                                    <p><strong>Enlaces a un bloque específico:</strong></p>
                                    <ol>
                                        <li>Coloca el cursor sobre el bloque</li>
                                        <li>Haz clic en el símbolo <code>::</code> a la izquierda</li>
                                        <li>Selecciona "Copiar enlace"</li>
                                        <li>Pega el URL donde quieras</li>
                                    </ol>
                                    <p><strong>Índices (Tabla de Contenido):</strong></p>
                                    <p>Añade tablas de contenido con <code>/indice</code>. Nota: Es necesario contar con encabezados de página.</p>
                                    <div class="anexo-reference">
                                        <strong>📋 Consulta el Anexo 16</strong> para ver una guía básica de recordatorios y enlaces.
                                        <br><a href="${ANEXOS.anexo16}" target="_blank">📄 Ver Anexo 16 - Recordatorios y Enlaces</a>
                                    </div>
                                    <p style="margin-top: 15px;"><strong>🔗 Más información:</strong> <a href="https://www.notion.com/es-es/help/reminders-and-mentions" target="_blank">Recordatorios y menciones</a></p>`
                        }
                    ]
                }
            ]
        },
        {
            id: 5,
            name: "Módulo 5: Integraciones y gestión básica",
            duration: "11 minutos",
            open: false,
            lessons: [
                {
                    id: 1,
                    title: "Integración de apps a Notion",
                    duration: "4 min",
                    description: "Conexión con Google Calendar y otras apps.",
                    videoUrl: "https://www.youtube.com/embed/cKUj8s4Z838",
                    content: [
                        {
                            title: "Integraciones con Apps",
                            content: `<p>Notion cuenta con una amplia galería de integraciones de apps, donde puedes mezclar diferentes softwares de organización y herramientas.</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">Notion Calendar</h4>
                                    <p>Notion tiene una app de calendario propia donde puedes visualizar todos los elementos calendarizados de tu espacio de trabajo.</p>
                                    <p><strong>Para añadir un calendario externo:</strong></p>
                                    <ol>
                                        <li>Ve a "Configuración"</li>
                                        <li>En la barra lateral, selecciona "Añadir una cuenta de calendario"</li>
                                        <li>Vincula una cuenta de "Google Calendar" o "Calendario de iCloud"</li>
                                    </ol>
                                    <h4 style="color: #007bff; margin-top: 15px;">Otras Integraciones Populares</h4>
                                    <ul>
                                        <li><strong>Google Drive:</strong> Inserta y sincroniza documentos</li>
                                        <li><strong>Slack:</strong> Notificaciones y actualizaciones</li>
                                        <li><strong>GitHub:</strong> Seguimiento de issues y PRs</li>
                                        <li><strong>Figma:</strong> Prototipos y diseños incrustados</li>
                                        <li><strong>Zapier:</strong> Automatizaciones personalizadas</li>
                                    </ul>
                                    <p style="margin-top: 15px;"><strong>Nota:</strong> Notion cuenta con más de 500 aplicaciones con las que se puede integrar.</p>
                                    <div class="anexo-reference">
                                        <strong>📋 Consulta el Anexo 17</strong> para ver una guía básica de integraciones.
                                        <br><a href="${ANEXOS.anexo17}" target="_blank">📄 Ver Anexo 17 - Guía de Integraciones</a>
                                    </div>
                                    <p style="margin-top: 15px;"><strong>🔗 Más información:</strong> <a href="https://www.notion.com/es-es/help/integrations" target="_blank">Conoce las integraciones</a></p>`
                        }
                    ]
                },
                {
                    id: 2,
                    title: "Exportación de páginas",
                    duration: "3 min",
                    description: "Exportar en PDF, HTML o CSV.",
                    videoUrl: "https://www.youtube.com/embed/o8D4d5IsOxY",
                    content: [
                        {
                            title: "Exportar tu Contenido",
                            content: `<p>Notion permite exportar en diferentes formatos.</p>
                                    <h4 style="color: #007bff; margin-top: 15px;">Formatos Disponibles</h4>
                                    <p>Para compartir tu contenido, existen 3 formatos principales:</p>
                                    <ul>
                                        <li><strong>PDF:</strong> Ideal para documentos finales y presentaciones</li>
                                        <li><strong>HTML:</strong> Para publicar en sitios web</li>
                                        <li><strong>CSV:</strong> Para bases de datos y hojas de cálculo</li>
                                        <li><strong>Markdown:</strong> Para editores de texto y documentación técnica</li>
                                    </ul>
                                    <h4 style="color: #007bff; margin-top: 15px;">¿Cómo Exportar?</h4>
                                    <ol>
                                        <li>Haz clic en el botón <code>⋯</code> en la esquina superior derecha</li>
                                        <li>En el menú desplegable, haz clic en "Exportar"</li>
                                        <li>Aparecerá una ventana para configurar la exportación</li>
                                        <li>Selecciona las especificaciones pertinentes</li>
                                        <li>Haz clic en "Exportar"</li>
                                    </ol>
                                    <h4 style="color: #007bff; margin-top: 15px;">Cómo Aprovechar la Exportación</h4>
                                    <ul>
                                        <li>Realizar copias de seguridad como respaldo</li>
                                        <li>Acceder al contenido sin conexión a Internet</li>
                                        <li>Compartir con usuarios que no utilicen Notion</li>
                                        <li>Migrar información a otras herramientas</li>
                                        <li>Integrar en hojas de cálculo para análisis</li>
                                    </ul>
                                    <div class="anexo-reference">
                                        <strong>📋 Consulta el Anexo 18</strong> para ver una guía básica de exportación.
                                        <br><a href="${ANEXOS.anexo18}" target="_blank">📄 Ver Anexo 18 - Guía de Exportación</a>
                                    </div>
                                    <p style="margin-top: 15px;"><strong>🔗 Más información:</strong> <a href="https://www.notion.com/es-es/help/export-content" target="_blank">Cómo exportar tu contenido</a></p>`
                        }
                    ]
                },
                {
                    id: 3,
                    title: "Atajos y comandos rápidos",
                    duration: "4 min",
                    description: "Atajos de teclado y Markdown.",
                    videoUrl: "https://www.youtube.com/embed/9hfeqqs5E_w",
                    content: [
                        {
                            title: "Atajos de Teclado",
                            content: `<p>Los atajos te permiten trabajar mucho más rápido.</p>
                                    <p style="margin-bottom: 15px;"><em>Nota: "cmd/ctrl" indica "Comando" en Mac y "Control" en Windows/Linux.</em></p>
                                    <h4 style="color: #007bff; margin-top: 15px;">Más Populares</h4>
                                    <ul>
                                        <li><code>cmd/ctrl + F</code> - Buscar dentro de una página</li>
                                        <li><code>cmd/ctrl + P</code> - Acceder a páginas vistas recientemente</li>
                                        <li><code>cmd/ctrl + L</code> - Copiar URL de página actual</li>
                                        <li><code>cmd/ctrl + N</code> - Crear página nueva</li>
                                        <li><code>cmd/ctrl + T</code> - Crear pestaña nueva</li>
                                        <li><code>cmd/ctrl + click</code> - Abrir enlace en pestaña nueva</li>
                                    </ul>
                                    <h4 style="color: #007bff; margin-top: 15px;">Estilo Markdown</h4>
                                    <ul>
                                        <li><code>**texto**</code> - Texto en negrita</li>
                                        <li><code>*texto*</code> - Texto en cursiva</li>
                                        <li><code>*, -, o +</code> (+ espacio) - Lista con viñetas</li>
                                        <li><code>[ ]</code> (+ espacio) - Casilla de tareas pendientes</li>
                                        <li><code>1., a., o i.</code> (+ espacio) - Lista numerada</li>
                                        <li><code>#</code> (+ espacio) - Encabezado tipo 1</li>
                                        <li><code>##</code> (+ espacio) - Encabezado tipo 2</li>
                                        <li><code>###</code> (+ espacio) - Encabezado tipo 3</li>
                                        <li><code>></code> (+ espacio) - Lista desplegable</li>
                                        <li><code>"</code> (+ espacio) - Bloque de citas</li>
                                        <li><code>---</code> - Crear un divisor</li>
                                    </ul>
                                    <h4 style="color: #007bff; margin-top: 15px;">Crear y Dar Formato al Contenido</h4>
                                    <ul>
                                        <li><code>cmd/ctrl + Shift + M</code> - Crear un comentario</li>
                                        <li><code>cmd/ctrl + B</code> - Texto en negrita (con selección)</li>
                                        <li><code>cmd/ctrl + I</code> - Texto en cursiva (con selección)</li>
                                        <li><code>cmd/ctrl + U</code> - Texto subrayado (con selección)</li>
                                        <li><code>cmd/ctrl + Shift + S</code> - Tachar texto (con selección)</li>
                                        <li><code>cmd/ctrl + K</code> - Agregar enlace (con selección)</li>
                                        <li><code>cmd/ctrl + E</code> - Convertir a código integrado (con selección)</li>
                                        <li><code>/convertir</code> - Convertir un bloque en otro tipo</li>
                                        <li><code>/color</code> - Cambiar color del texto o resaltado</li>
                                    </ul>
                                    <p style="margin-top: 15px;"><strong>💡 Tip:</strong> Al escribir <code>/</code> obtendrás una lista completa de opciones de comandos en Notion para integrar elementos y dar formatos.</p>
                                    <div class="anexo-reference">
                                        <strong>📋 Consulta el Anexo 19</strong> para ver una lista completa de atajos y comandos.
                                        <br><a href="${ANEXOS.anexo19}" target="_blank">📄 Ver Anexo 19 - Lista de Atajos</a>
                                    </div>
                                    <p style="margin-top: 15px;"><strong>🔗 Más información:</strong> <a href="https://www.notion.com/es-es/help/keyboard-shortcuts" target="_blank">Atajos de teclado</a></p>`
                        }
                    ]
                }
            ]
        }
    ]
};



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

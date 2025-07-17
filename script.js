const materiasData = [
    // Primer Año
    { nombre: "Introducción al Trabajo Social", año: 1, correlativas: [], identificacion: "TS1_1" },
    { nombre: "Metodología del Trabajo Social", año: 1, correlativas: [], identificacion: "TS1_2" },
    { nombre: "Trabajo Social y Problemática Filosófica", año: 1, correlativas: [], identificacion: "TS1_3" },
    { nombre: "Trabajo Social y Antropología Social y Cultural", año: 1, correlativas: [], identificacion: "TS1_4" },
    { nombre: "Trabajo Social e Historia Social Argentina y Latinoamericana", año: 1, correlativas: [], identificacion: "TS1_5" },
    { nombre: "Trabajo Social, Teorías del Desarrollo, Teorías del Estado y Políticas Públicas", año: 1, correlativas: [], identificacion: "TS1_6" },

    // Segundo Año
    { nombre: "Trabajo Social con Grupos: Investigación Diagnóstica", año: 2, correlativas: ["TS1_2"], identificacion: "TS2_1" },
    { nombre: "Trabajo Social con Grupos: Intervención Transformadora", año: 2, correlativas: ["TS2_1"], identificacion: "TS2_2" },
    { nombre: "Planeamiento y Evaluación en Trabajo Social", año: 2, correlativas: ["TS1_2"], identificacion: "TS2_3" },
    { nombre: "Trabajo Social e Investigación Social I", año: 2, correlativas: ["TS1_2", "TS1_3"], identificacion: "TS2_4" },
    { nombre: "Trabajo Social y Teoría Social Clásica", año: 2, correlativas: ["TS1_3"], identificacion: "TS2_5" },
    { nombre: "Trabajo Social y Psicología Social", año: 2, correlativas: ["TS1_4"], identificacion: "TS2_6" },
    { nombre: "Práctica de Recursos de la Comunidad", año: 2, correlativas: ["TS2_2", "TS1_6"], identificacion: "TS2_7" }, // Confirmado por el usuario

    // Tercer Año
    { nombre: "Trabajo Social Comunitario", año: 3, correlativas: ["TS2_2"], identificacion: "TS3_1" },
    { nombre: "Trabajo Social e Investigación Social II", año: 3, correlativas: ["TS2_4"], identificacion: "TS3_2" },
    { nombre: "Trabajo Social y Teoría Social Contemporánea", año: 3, correlativas: ["TS2_5"], identificacion: "TS3_3" },
    { nombre: "Trabajo Social y Sociedades Complejas y Campesinas", año: 3, correlativas: ["TS2_6"], identificacion: "TS3_4" },
    { nombre: "Trabajo Social y Salud Pública", año: 3, correlativas: [], identificacion: "TS3_5" },
    { nombre: "Lengua y Comunicación", año: 3, correlativas: [], identificacion: "TS3_6" },
    { nombre: "Práctica de Trabajo Social con Grupos", año: 3, correlativas: ["TS2_2"], identificacion: "TS3_7" }, // Asume Intervención Transformadora

    // Cuarto Año
    { nombre: "Trabajo Social Familiar: Investigación Diagnóstica", año: 4, correlativas: ["TS3_1"], identificacion: "TS4_1" },
    { nombre: "Trabajo Social y Problemática Social Argentina", año: 4, correlativas: ["TS3_3"], identificacion: "TS4_2" },
    { nombre: "Trabajo Social, Economía Social y Políticas Económicas", año: 4, correlativas: [], identificacion: "TS4_3" },
    { nombre: "Trabajo Social y Sistemas de Protección Social", año: 4, correlativas: [], identificacion: "TS4_4" },
    { nombre: "Trabajo Social, Psicología Evolutiva y Profunda", año: 4, correlativas: [], identificacion: "TS4_5" },
    { nombre: "Práctica de Trabajo Social Comunitario", año: 4, correlativas: ["TS3_1", "TS3_7"], identificacion: "TS4_6" },
    { nombre: "Lengua Extranjera Nivel I", año: 4, correlativas: ["TS3_6"], identificacion: "TS4_7" },

    // Quinto Año
    { nombre: "Trabajo Social Familiar: Intervención Transformadora", año: 5, correlativas: ["TS4_1"], identificacion: "TS5_1" },
    { nombre: "Seminario de Integración Metodológica en Trabajo Social", año: 5, correlativas: ["TS3_2"], identificacion: "TS5_2" },
    { nombre: "Asignatura Electiva - Seminario de Tesis en Trabajo Social", año: 5, correlativas: ["TS3_2"], identificacion: "TS5_3" }, // Asume la correlativa de Investigación Social II
    { nombre: "Administración y Gerenciamiento de Organizaciones y Servicios Sociales", año: 5, correlativas: [], identificacion: "TS5_4" },
    { nombre: "Lengua Extranjera Nivel II", año: 5, correlativas: ["TS4_7"], identificacion: "TS5_5" }, // Asume Lengua Extranjera Nivel I
    { nombre: "Tesis de Licenciatura", año: 5, correlativas: ["TS5_2", "TS5_3"], identificacion: "TS5_6" },
    { nombre: "Práctica de Trabajo Social Familiar", año: 5, correlativas: ["TS5_1"], identificacion: "TS5_7" }
];


// Recuperar materias aprobadas del almacenamiento local
let materiasAprobadas = JSON.parse(localStorage.getItem('materiasAprobadas')) || {};

const mallaContainer = document.getElementById('malla-container');
const filterButtons = document.querySelectorAll('.filter-btn');

// Función para renderizar la malla curricular
function renderMalla(filtroAño = 'todos') {
    mallaContainer.innerHTML = ''; // Limpiar el contenedor
    const años = Array.from(new Set(materiasData.map(m => m.año))).sort((a, b) => a - b);

    años.forEach(año => {
        const yearColumn = document.createElement('div');
        yearColumn.classList.add('year-column');
        yearColumn.setAttribute('data-año', año);
        yearColumn.innerHTML = `<h3>${año}° Año</h3><div class="materias-list"></div>`;

        const materiasList = yearColumn.querySelector('.materias-list');
        const materiasDelAño = materiasData.filter(materia => materia.año === año);

        materiasDelAño.forEach(materia => {
            const materiaDiv = document.createElement('div');
            materiaDiv.classList.add('materia');
            materiaDiv.setAttribute('data-id', materia.identificacion);

            let correlativasInfo = materia.correlativas.length > 0 ? `Correlativas: ${materia.correlativas.join(', ')}` : 'Sin correlativas';

            materiaDiv.innerHTML = `
                <h4>${materia.nombre}</h4>
                <p>Año ${materia.año}</p>
                <p class="correlativas">${correlativasInfo}</p>
                <button class="marcar-aprobada-btn">${materiasAprobadas[materia.identificacion] ? 'Aprobada ✅' : 'Marcar como aprobada'}</button>
            `;

            if (materiasAprobadas[materia.identificacion]) {
                materiaDiv.classList.add('aprobada');
                materiaDiv.querySelector('.marcar-aprobada-btn').classList.add('aprobada');
            }

            materiasList.appendChild(materiaDiv);
        });
        mallaContainer.appendChild(yearColumn);
    });

    // Ocultar/mostrar columnas según el filtro
    document.querySelectorAll('.year-column').forEach(column => {
        if (filtroAño === 'todos') {
            column.style.display = 'flex';
        } else {
            if (column.dataset.año === filtroAño) {
                column.style.display = 'flex';
            } else {
                column.style.display = 'none';
            }
        }
    });
}

// Manejar clics en los botones de filtro
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderMalla(button.dataset.filter);
    });
});

// Manejar clics en los botones de "Marcar como aprobada"
mallaContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('marcar-aprobada-btn')) {
        const button = event.target;
        const materiaDiv = button.closest('.materia');
        const materiaId = materiaDiv.dataset.id;

        if (materiasAprobadas[materiaId]) {
            // Ya está aprobada, no hacer nada (o desmarcar si se quiere)
            // Para desmarcar:
            // delete materiasAprobadas[materiaId];
            // materiaDiv.classList.remove('aprobada');
            // button.textContent = 'Marcar como aprobada';
            // button.classList.remove('aprobada');
        } else {
            let todasCorrelativasAprobadas = true;
            const materiaActual = materiasData.find(m => m.identificacion === materiaId);

            if (materiaActual && materiaActual.correlativas) {
                for (const corId of materiaActual.correlativas) {
                    if (!materiasAprobadas[corId]) {
                        todasCorrelativasAprobadas = false;
                        break;
                    }
                }
            }

            if (todasCorrelativasAprobadas) {
                materiasAprobadas[materiaId] = true;
                materiaDiv.classList.add('aprobada');
                button.textContent = 'Aprobada ✅';
                button.classList.add('aprobada');
            } else {
                alert('Debes aprobar las correlativas antes de marcar esta materia.');
            }
        }
        localStorage.setItem('materiasAprobadas', JSON.stringify(materiasAprobadas));
    }
});

// Inicializar la malla al cargar la página
renderMalla();

                                                                   

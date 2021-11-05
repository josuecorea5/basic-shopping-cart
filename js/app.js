//variables necesarias
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
const submenu = document.querySelector('.submenu');
const span = document.querySelector('.count-cart');
let articulosCarrito = [];


cargarEventListeners()

//registro de eventos
function cargarEventListeners() {
  listaCursos.addEventListener('click', agregarCurso);
  carrito.addEventListener('click', eliminarCurso);
  vaciarCarrito.addEventListener('click',limpiandoCarrito);
}

//funciones
function agregarCurso(e) {
  e.preventDefault();
  if(e.target.classList.contains('agregar-carrito')) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

function limpiandoCarrito() {
  articulosCarrito = [];
  span.textContent = `${articulosCarrito.length}`;
  limpiarHTML();
}

//elimina curso
function eliminarCurso(e) {
  if(e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.getAttribute('data-id');
    articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
    carritoHTML();
    span.textContent = `${articulosCarrito.length}`;
  }
}

//al dar click, leer la info
function leerDatosCurso(curso) {
  //objeto con la info del curso
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }
  const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
  if(existe) {
    //actualizar cantidad
    const cursos = articulosCarrito.map( curso => {
      if(curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      }else {
        return curso;
      }
    })
    articulosCarrito = [...cursos];
  }else {
    articulosCarrito = [...articulosCarrito,infoCurso];
  }
  carritoHTML();
  span.classList.add('count-cart')
span.textContent = `${articulosCarrito.length}`;
submenu.insertBefore(span,carrito);
}

//mostrar el carrito en el HTML
function carritoHTML() {
  limpiarHTML();

  //recorre el carrito y genera el HTML
  articulosCarrito.forEach( curso => {
    const {imagen,titulo,precio,cantidad,id} = curso;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${imagen}" width="100" />
      </td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>
        <a href="#" class="borrar-curso" data-id="${id}" > X </a>
      </td>
    `;
  
  contenedorCarrito.appendChild(row);
  })
}

//limpia el contenido del tbody
function limpiarHTML() {
  while(contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

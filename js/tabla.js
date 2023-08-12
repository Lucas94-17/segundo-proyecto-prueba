let products = JSON.parse(localStorage.getItem("products"));
function agregarDatos() {
  const table = document.getElementById("myTable").getElementsByTagName("tbody")[0];
  if (table.hasChildNodes()) {
    table.innerHTML = "";
  }
  let products = JSON.parse(localStorage.getItem("products"));
  for (let i = 0; i < products.length; i++) {
    let row = table.insertRow(i);
    let idCell = row.insertCell(0);
    let name = row.insertCell(1);
    let stock = row.insertCell(2);
    let price = row.insertCell(3);
    let category = row.insertCell(4);
    let accionesCell = row.insertCell(5);
    idCell.innerHTML = products[i].id;
    name.innerHTML = products[i].name;
    stock.innerHTML = products[i].stock;
    price.innerHTML = products[i].price;
    category.innerHTML = products[i].category.name;
    accionesCell.innerHTML =
      '<button type="button" class="btn btn-danger" onclick="eliminarDato(' +
      products[i].artc +
      ')">Eliminar</button>' +
      '<button type="button" class="btn btn-warning" onclick="editarDato(' +
      products[i].artc +
      ')">Editar</button>';
  }
}
function guardarEnLocalStorage() {
  localStorage.setItem('products', JSON.stringify(products));
}



window.onload = function () {
  agregarDatos();
};

const editBtn = document.getElementById("editBtn");
const editModal = document.getElementById("editModal");

const closeBtn = editModal.querySelector(".close");

const editForm = document.getElementById("editForm");
editForm.addEventListener("submit", submitForm);

function openModal() {
  editModal.style.display = "block";
}

function closeModal() {
  editModal.style.display = "none";
}

function submitForm(event) {
  event.preventDefault();
  let form = document.querySelector("form");
  let nuevoArct = products.length + 1;;
  let nuevoId = form.elements.id.value;
  let nuevoNombre = form.elements.nombre.value;
  let nuevaImagen = form.elements.imagen.value;
  let nuevaCategoria = form.elements.categoria.value;
  let nuevoStock = form.elements.stock.value;
  let nuevoPrecio = form.elements.precio.value;

  if (!nuevoArct || !nuevoId ||!nuevoNombre ||!nuevaImagen ||!nuevaCategoria ||!nuevoStock ||!nuevoPrecio) {
    Swal.fire({
      title: "Atencion!",
      text: "Le falta llenar un campo",
      icon: "error",
      confirmButtonText: "Aceptar!",
    });
    return;
  }
  const product = {
    artc: nuevoArct,
    id: nuevoId,
    name: nuevoNombre,
    image: nuevaImagen,
    category: {
      name: nuevaCategoria,
      id: nuevaCategoria,
    },
    stock: nuevoStock,
    price: nuevoPrecio,
  };
  if (confirm("¿Estás seguro de que deseas agregar este producto?")) {
    products.push(product);
    Swal.fire({
      title: "Producto Agregado!",
      text: "Se agrego el producto exitosamente!",
      icon: "success",
      confirmButtonText: "Aceptar!",
    });
    form.elements.id.value = "";
    form.elements.nombre.value = "";
    form.elements.imagen.value = "";
    form.elements.stock.value = "";
    form.elements.precio.value = "";
    form.elements.categoria.value = "";
    closeModal();
    guardarEnLocalStorage();
    return actualizarTabla();
  }
}

editBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);

function eliminarDato(artc) {
  if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
    localStorage.setItem("products", JSON.stringify(products));
    for (let i = 0; i < products.length; i++) {
      if (products[i].artc === artc) {
        products.splice(i, 1);
        guardarEnLocalStorage();
        break;
      }
    }
    Swal.fire({
      title: "Producto Eliminado!",
      text: "Se elimino el producto exitosamente!",
      icon: "success",
      confirmButtonText: "Aceptar!",
    });
  }
  actualizarTabla();
}

function editarDato(artc) {
  if (confirm("¿Estás seguro de que deseas editar este producto?")) {
    localStorage.setItem("products", JSON.stringify(products));
    for (let i = 0; i < products.length; i++) {
      if (products[i].artc === artc) {
        let nuevoId = prompt("Ingrese el nuevo id:");
        let nuevoNombre = prompt("Ingrese el nuevo nombre:");
        let nuevoStock = prompt("Ingrese el nuevo stock:");
        let nuevoPrecio = prompt("Ingrese el nuevo precio:");
        let nuevaCategoria = prompt("Ingrese la categoria nueva:");
        if (!nuevoId ||!nuevoNombre ||!nuevoStock ||!nuevoPrecio ||!nuevaCategoria) {
          Swal.fire({
            title: "Atencion!",
            text: "Le falta llenar un campo",
            icon: "error",
            confirmButtonText: "Aceptar!",
          });
        } else {
          products[i].id = nuevoId;
          products[i].name = nuevoNombre;
          products[i].stock = nuevoStock;
          products[i].price = nuevoPrecio;
          products[i].category.name = nuevaCategoria;
          products[i].category.id = nuevaCategoria;
          guardarEnLocalStorage();
          Swal.fire({
            title: "Producto Editado!",
            text: "Se edito el producto exitosamente!",
            icon: "success",
            confirmButtonText: "Aceptar!",
          });
          break;
        }
      }
    }
  }
  actualizarTabla();
}

function actualizarTabla() {
  let table = document.getElementById("myTable").getElementsByTagName("tbody")[0];
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }
  agregarDatos();
}

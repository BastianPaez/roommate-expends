

const btnAgregarRoommate = document.querySelector('#agregar-roommate');
const btnAgregarGasto = document.querySelector('#agregar-gasto')

eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', cargarRoommates);
    document.addEventListener('DOMContentLoaded', cargarGastos);
    btnAgregarRoommate.addEventListener('click', agregarRoommate);
    btnAgregarGasto.addEventListener('click', agregarGasto)
}

function cargarRoommates() {
    peticionGetRoomates();
}
const peticionGetRoomates = async () => {
    const roommatesTabla = document.querySelector('#roommates')
    const roommatesSelect = document.querySelector('#roommatesSelect')
    try {
        const { data } = await axios.get('/roommates');
        data.roommates.forEach(roommate => {
            const tr = document.createElement('tr');
            const tdNombre = document.createElement('td');
            const tdDebe = document.createElement('td');
            const tdRecibe = document.createElement('td');

            tdNombre.textContent = roommate.name;
            tdDebe.textContent = roommate.pay;
            tdRecibe.textContent = roommate.cash;

            tr.append(tdNombre);
            tr.append(tdDebe);
            tr.append(tdRecibe);
            roommatesTabla.append(tr);


            const roomateOption = document.createElement('option');
            roomateOption.value = roommate.name;
            roomateOption.textContent = roommate.name;
            roomateOption.setAttribute('name', 'roommate')
            roomateOption.setAttribute('data-id', roommate.id)  
            
            roommatesSelect.append(roomateOption)

        });
    } catch (error) {
        console.log(error)
    }
}

function agregarRoommate() {
    nuevoRoomate();
}

const nuevoRoomate = async () => {
    try {
        let { data } = await axios.get('https://randomuser.me/api')
        data = data.results[0].name;
        const name = `${data.first} ${data.last}`
        await axios.post('/roommate', { name })
        limpiar(document.querySelector('#roommates'))
        limpiar(document.querySelector('#roommatesSelect'))
        cargarRoommates();
    } catch (error) {
        console.log(error)
    }
}

const limpiar = (selector) => {
    while (selector.firstChild) {
        selector.firstChild.remove();
    }
}


function cargarGastos (){
    getGastos();
}

const getGastos = async() => {
    const gastoTabla = document.querySelector('#gastosHistorial');
    try {
        const {data} = await axios.get('/gastos');
        data.gastos.forEach(gasto => {

            const tr = document.createElement('tr');
            tr.setAttribute('data-id', gasto.expenses_id)
            tr.setAttribute('roommate-data-id', gasto.roommate_id)
            const tdNombre = document.createElement('td');
            const tdComentario = document.createElement('td');
            const tdMonto = document.createElement('td');

            const botonEliminar = document.createElement('button');
            const botonEditar = document.createElement('button');
            const divBotones = document.createElement('div');

                
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.classList.add('btn', 'btn-danger', 'btn-sm');
            botonEliminar.addEventListener('click', () => eliminarGasto(gasto.expenses_id, gasto.roommate_id));

            botonEditar.textContent = 'Editar'
            botonEditar.classList.add('btn', 'btn-warning', 'mr-2', 'btn-sm');
            botonEditar.addEventListener('click', () => editarGasto(gasto.expenses_id, gasto.roommate_id));

            divBotones.classList.add('d-flex')

            tdNombre.textContent = gasto.roommate_name;
            tdComentario.textContent = gasto.comment;
            tdMonto.textContent = gasto.amount;

            tr.append(tdNombre);
            tr.append(tdComentario);
            tr.append(tdMonto);

            divBotones.append(botonEditar);
            divBotones.append(botonEliminar);
            tr.append(divBotones);

            gastoTabla.append(tr)
        });
    } catch (error) {
        console.log(error)
    }
}

const editarGasto = (idGasto, idRoommate) => {
    const tr = document.querySelector(`tr[data-id="${idGasto}"]`);

    const botonAceptar = document.createElement('button');
    const divBoton = document.createElement('div')
    
    
    tr.firstElementChild.nextElementSibling.innerHTML = ` 
    <input type="text" class="form-control" placeholder="Comentario" aria-label="Comentario">`

    tr.firstElementChild.nextElementSibling.nextElementSibling.innerHTML = `
    <input type="number" class="form-control" placeholder="Monto" aria-label="Monto">`

    
    tr.lastElementChild.remove();

    divBoton.append(botonAceptar)
    botonAceptar.textContent = 'Aceptar';
    botonAceptar.classList.add('btn', 'btn-success', 'mt-3');
    botonAceptar.addEventListener('click', () => gastoUpdate(idGasto, idRoommate));

    tr.appendChild(divBoton)
}

const gastoUpdate = async (idGasto, idRoommate) => {
    const tr = document.querySelector(`tr[data-id="${idGasto}"]`);
    const comentarioNuevo = tr.firstChild.nextSibling.querySelector('input').value;
    const montoNuevo = tr.firstChild.nextSibling.nextSibling.querySelector('input').value;
    try {
        await axios.put('/gasto', {idGasto, idRoommate, comentarioNuevo, montoNuevo})
        limpiar(document.querySelector('#gastosHistorial'));
        limpiar(document.querySelector('#roommates'));
        cargarGastos();
        cargarRoommates();
    } catch (error) {
        console.log(error)
    }
}

const eliminarGasto = (idGasto, idRoommate) => {
    const tr = document.querySelector(`tr[data-id="${idGasto}"]`);
    if (tr) {
        tr.remove();
        axiosDelete(idGasto, idRoommate)
    }
};



const axiosDelete = async (idGasto, idRoommate) => {
    try {
        await axios.delete('/gasto', { data: { idGasto, idRoommate } });
        limpiar(document.querySelector('#roommates'));
        cargarRoommates();
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
    }
}

function agregarGasto () {
    const select = document.querySelector('#roommatesSelect');
    const selectId = select.options[select.selectedIndex].getAttribute('data-id');
    const comentario = document.querySelector('#descripcion').value
    const monto = document.querySelector('#monto').value
    
    postGasto(selectId, comentario, monto);
    
}

const postGasto = async (id, comentario, monto) => {
    try {
        await axios.post('/gasto', {id, comentario, monto}) 
        limpiar(document.querySelector('#gastosHistorial'));
        cargarGastos();
        limpiar(document.querySelector('#roommates'));
        cargarRoommates();
    } catch (error) {
        console.log(error)
    }
}
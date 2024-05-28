

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

        limpiar(roommatesTabla)
        limpiar(roommatesSelect)
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
        cargarRoommates();
        await axios.post('/roommate', { name })
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
    const gastoTabla = document.querySelector('#gastosHistorial')
    try {
        const {data} = await axios.get('/gastos');
        data.gastos.forEach(gasto => {
            const tr = document.createElement('tr');
            const tdNombre = document.createElement('td');
            const tdComentario = document.createElement('td');
            const tdMonto = document.createElement('td');

            tdNombre.textContent = gasto.roommate_name;
            tdComentario.textContent = gasto.comment;
            tdMonto.textContent = gasto.amount;

            tr.append(tdNombre);
            tr.append(tdComentario);
            tr.append(tdMonto);
            gastoTabla.append(tr)
        });
    } catch (error) {
        console.log(error)
    }
}

function agregarGasto (e) {
    const select = document.querySelector('#roommatesSelect');
    const selectId = select.options[select.selectedIndex].getAttribute('data-id');
    const comentario = document.querySelector('#descripcion').value
    const monto = document.querySelector('#monto').value
    
    postGasto(selectId, comentario, monto);
}

const postGasto = async (id, comentario, monto) => {
    try {
        await axios.post('/gasto', {id, comentario, monto}) 
    } catch (error) {
        console.log(error)
    }
}
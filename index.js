var firebaseConfig = {
    apiKey: "AIzaSyDkTHpsslrrKotKyqZfceUlnutO75t-shA",
  authDomain: "bancoconsultas-2e812.firebaseapp.com",
  databaseURL: "https://bancoconsultas-2e812-default-rtdb.firebaseio.com",
  projectId: "bancoconsultas-2e812",
  storageBucket: "bancoconsultas-2e812.appspot.com",
  messagingSenderId: "518233407123",
  appId: "1:518233407123:web:e871737d345ceb3779d766",
  measurementId: "G-8C5MTTRVCQ"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='';
    document.getElementById("Input5").value='';
    document.getElementById("Input6").value='';
    document.getElementById("Input7").value='selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var apellido = document.getElementById("Input3").value;
    var direccion = document.getElementById("Input4").value;
    var telefono = document.getElementById("Input5").value;
    var correo = document.getElementById("Input6").value;
    var municipio = document.getElementById("Input7").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var Banco = {
            id, //matricula:id
            nombre,
            apellido,
            direccion,
            telefono,
            correo,
            municipio
        }

        //console.log(Banco);

        firebase.database().ref('Clientes/' + id).update(Banco).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Clientes').push().key;
    //data[`Clientes/${key}`]= Banco;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Clientes');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(Banco){
    
    if(Banco!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = Banco.id;
        cell2.innerHTML = Banco.nombre; 
        cell3.innerHTML = Banco.apellido;
        cell4.innerHTML = Banco.direccion;
        cell5.innerHTML = Banco.telefono;
        cell6.innerHTML = Banco.correo;
        cell7.innerHTML = Banco.municipio; 
        cell8.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${Banco.id})">Eliminar</button>`;
        cell9.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+Banco.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Clientes/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Clientes/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(Banco){
    if(Banco!=null)
    {
        document.getElementById("Input1").value=Banco.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=Banco.nombre;
        document.getElementById("Input3").value=Banco.apellido;
        document.getElementById("Input4").value=Banco.direccion;
        document.getElementById("Input5").value=Banco.telefono;
        document.getElementById("Input6").value=Banco.correo;
        document.getElementById("Input7").value=Banco.municipio;
    }
}


//Para consulta de municipio
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input8").value;

    var ref = firebase.database().ref("Clientes");
    ref.orderByChild("municipio").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(Banco){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = Banco.id;
    cell2.innerHTML = Banco.nombre; 
    cell3.innerHTML = Banco.apellido; 
    cell4.innerHTML = Banco.direccion; 
    cell5.innerHTML = Banco.telefono; 
    cell6.innerHTML = Banco.correo;
    cell7.innerHTML = Banco.municipio; 
   
}
var cashBox = [
    { cant: 10, value: 50 },
    { cant: 10, value: 20 },
    { cant: 10, value: 10 },
    { cant: 10, value: 5 },
    { cant: 10, value: 1 },
    { cant: 10, value: 0.50 },
    { cant: 10, value: 0.20 },
    { cant: 10, value: 0.10 },
    { cant: 10, value: 0.05 },
    { cant: 10, value: 0.01 }
];
var variable;
if(variable) {
  console.log("funciona");
} 
else{
  console.log("no funciona");
}
var products = [
    { name: "Latte", value: 35 },
    { name: "Burger", value: 80 },
    { name: "Burrito", value: 75 }
];
loadProducts();
var billing = [];
var selectedProductIndex, cash, camb, round = 1;


function giveChange(change)
{
    var payment = change;
    var retCant;
    
    for (cash in cashBox) {
        var retCant = Math.floor(payment / cashBox[cash].value)
        
        if (cashBox[cash].cant > retCant && payment / cashBox[cash].value >= 1) {
            console.log("cantidad de billetes de", cashBox[cash].value, "->", retCant);

            cashBox[cash].cant -= retCant;
            payment = payment - (retCant * cashBox[cash].value);
            if (cashBox[cash].value >= 5) {
                billing.push({ name: 'Billetes de', numero: cashBox[cash].value, value: retCant });
            }
            else {
                billing.push({ name: 'Monedas de', numero: cashBox[cash].value, value: retCant });
            }
        }


    }
}

function productChange(productIndex, paysWith) {
    var change = paysWith - products[productIndex].value;
    camb = change;
    return change;
}

function call() {
    switch (round)
    {
        case 1:
            var input = document.getElementById("Input");
            if (input.value > 0 && input.value <= products.length)
            {
                selectedProductIndex = input.value - 1;
                conCuantoPaga();
                round++;
            }
            else 
            {
                productoInexistente();
            }
            break;
        case 2:
            var cashInput = document.getElementById("Input");
            var cash = cashInput.value;

            if (cash < products[selectedProductIndex].value)
            {
                dineroInsuficiente();
            }
            else if (hayDinero(cash))
            {
                giveChange(productChange(selectedProductIndex, cash));
                aDevolver();
                round++; 
            }
            else
            {
                noHayDinero(); 
            }
            break;
        case 3:
            volverAlPrincipio();
            loadProducts();
            round = 1;
            break;
    }
}

function conCuantoPaga() {
    var node = document.getElementById('ProductList');
    node.innerHTML = "";
    var title = document.getElementById('Titulo');
    title.innerText = "Con cuánto paga?";
    var input = document.getElementById('Input');
    input.setAttribute('min', 0);
    input.setAttribute('max', '500');
}

function aDevolver() {
    var title = document.getElementById('Titulo');
    title.innerText = "A devolver: $" + camb + "";
    var input = document.getElementById('Input');
    input.style.visibility = "hidden";

    for (bills in billing) {

        var node = document.createElement("ol");
        var textNode = document.createTextNode(billing[bills].name + " " + billing[bills].numero + "$: " + billing[bills].value);
        node.appendChild(textNode);
        document.getElementById("ProductList").appendChild(node);
    }
}

function noHayDinero() {
    var title = document.getElementById('Titulo');
    title.innerText = "La caja no tiene dinero suficiente, somos pobres :(";
}

function hayDinero(payment) {
    var dineroTotal = 0;

    for (cash in cashBox) {
        dineroTotal += cashBox[cash].cant * cashBox[cash].value;
    }

    if (payment < dineroTotal) return true;
    else return false;
}
       
function loadProducts() {
    for (product in products) {
        var node = document.createElement("li");
        var textNode = document.createTextNode(products[product].name + " $-" + products[product].value);
        node.appendChild(textNode);
        document.getElementById("ProductList").appendChild(node);
    }
}

function productoInexistente()
{
    var title = document.getElementById('Titulo');
    title.innerText = "¡El producto no existe!";
}

function dineroInsuficiente()
{
    var title = document.getElementById('Titulo');
    title.innerText = "¡Dinero insuficiente!";
}

function volverAlPrincipio()
{
    var title = document.getElementById("Titulo");
    title.innerText = "Seleccione producto";
    var input = document.getElementById("Input");
    input.style.visibility = "visible";
    input.innerText = "";
    var ol = document.getElementById("ProductList");
    ol.innerHTML = "";
    
    for (bil in billing)
    {
        billing.pop();    
    }
        
}

class mensajes{

}
// var array = [15, "4e6", 23, 67, 79, 99];
// console.log(array);
class maxHeaper {
    constructor() {
        this.heap = [];
        this.tipo;
    }
    pegarPosiEsquerdo(utimaPosi) {
        return 2 * utimaPosi + 1;
    }

    pegarPosiDireito(utimaPosi) {
        return 2 * utimaPosi + 2;
    }
    pegarPosiPai(posiFilho) {
        return Math.floor((posiFilho - 1) / 2);
    }
    trocarPosi(posi, troca) {
        [this.heap[posi], this.heap[troca]] = [this.heap[troca], this.heap[posi]];
    }
    verificaPai(posi) {
        const paiPosi = this.pegarPosiPai(posi);
        if (this.tipo === "number") {
            if (paiPosi >= 0 && this.heap[paiPosi] < this.heap[posi]) {
                this.trocarPosi(paiPosi, posi);
                this.verificaPai(paiPosi);
            }
        } else {
            if (paiPosi >= 0 && this.heap[paiPosi].valor < this.heap[posi].valor) {
                this.trocarPosi(paiPosi, posi);
                this.verificaPai(paiPosi);
            }
        }
    }
    inserir(valor) {
        var x = typeof valor;

        if (!(this.heap.length)) {
            this.tipo = x;
        }
        if (x == this.tipo) {
            this.heap.push(valor);
            this.verificaPai(this.heap.length - 1);
        }
    }
    empilharBaixo(posi) {
        const esquerdo = this.pegarPosiEsquerdo(posi);
        const direito = this.pegarPosiDireito(posi);
        let maiorPosi = posi;
        if (this.tipo === "number") {
            if (esquerdo < this.heap.length && this.heap[esquerdo] > this.heap[maiorPosi]) {
                maiorPosi = esquerdo;
            }

            if (direito < this.heap.length && this.heap[direito] > this.heap[maiorPosi]) {
                maiorPosi = direito;
            }
        } else {
            if (esquerdo < this.heap.length && this.heap[esquerdo].valor > this.heap[maiorPosi].valor) {
                maiorPosi = esquerdo;
            }

            if (direito < this.heap.length && this.heap[direito].valor > this.heap[maiorPosi].valor) {
                maiorPosi = direito;
            }
        }


        if (maiorPosi !== posi) {
            this.trocarPosi(maiorPosi, posi);
            this.empilharBaixo(maiorPosi);
        }
    }
    extrairMax() {
        if (this.heap.length === 0) {
            return null;
        }

        const max = this.heap[0];
        const lastElement = this.heap.pop();

        if (this.heap.length > 0) {
            this.heap[0] = lastElement;
            this.empilharBaixo(0);
        }

        return max;
    }

}
var he = new maxHeaper();

document.querySelector(".caneta button").addEventListener("click", pegarInput);

function atualizarLista() {
    var pai = document.querySelector(".tarefas");
    while (pai?.firstChild) {
        pai.removeChild(pai.firstChild);
    }
    for (let i = 0; i < he.heap.length; i++) {

        let divTarefa = document.createElement("div");
        divTarefa.classList.add("tarefa");

        let paragrafo = document.createElement("p");
        paragrafo.textContent = he.heap[i].texto;
        divTarefa.appendChild(paragrafo);

        let divPrioridade = document.createElement("div");
        divPrioridade.classList.add("prioridade");
        divPrioridade.textContent = he.heap[i].valor;
        divTarefa.appendChild(divPrioridade);
        if (i == 0) {
            let botaoRealizado = document.createElement("button");
            botaoRealizado.classList.add("realizado");

            let iconeCheck = document.createElement("i");
            iconeCheck.classList.add("fa-solid", "fa-check", "fa-beat");
            botaoRealizado.appendChild(iconeCheck);

            divTarefa.appendChild(botaoRealizado);
        }
        document.querySelector(".tarefas").appendChild(divTarefa);
    }

}

function pegarInput() {
    var prio = document.querySelectorAll(".caneta input");
    if (prio[1].value) {
        var obj = {
            valor: parseInt(prio[1].value),
            texto: prio[0].value
        }
        prio[1].value = "";
        prio[0].value = "";
        he.inserir(obj);
        atualizarLista();
        console.log(he.heap);
    }
}


// function maiorTexto() {
//     var maior = new maxHeaper();
//     var textos = document.querySelectorAll("p");
//     textos.forEach(e => {
//         maior.inserir(e.innerHTML);
//     }
//     )

//     for (let i = 0; i < textos.length; i++) {
//         textos[i].innerHTML = maior.heap[i];
//     }
// }
// window.addEventListener('keydown', function (event) {
//     console.log(event.key);
//     if (event.key === "ArrowRight") {
//         console.log('O usuário pressionou Enter');
//     }
// });

// array.forEach(element => {
//     he.inserir(element);
// });
// var x = (typeof valor == "string" && !isNaN(+valor) && !texto) ? "number" :
// (!texto && (typeof valor=="string" || typeof valor=="number")) ?
// typeof valor : (((typeof valor == "string" && !isNaN(+valor)) || typeof valor=="number") && typeof texto=="string") ? "object" : 0;
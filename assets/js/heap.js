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
        let x = typeof valor;

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
let he = new maxHeaper();

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
document.querySelector(".caneta button").addEventListener("click", pegarInput);

function atualizarLista() {
    var pai = document.querySelector(".tarefas");
    var hp = document.querySelector(".heap_demonstracao");
    while (pai?.firstChild) {
        pai.removeChild(pai.firstChild);
        hp.removeChild(hp.lastChild);
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
            botaoRealizado.addEventListener("click", () => {
                he.extrairMax();
                animaPorta();

            })
        }
        bonecoCriar(i);
        document.querySelector(".tarefas").appendChild(divTarefa);
    }

}
function bonecoCriar(i) {
    let div = document.createElement("div");
    div.classList.add("paciente");
    let paragrafo = document.createElement("p");
    paragrafo.textContent = he.heap[i].valor;
    div.appendChild(paragrafo);
    paragrafo = document.createElement("p");
    paragrafo.textContent = i;
    div.appendChild(paragrafo);
    div.style.left = (i) ? document.querySelectorAll(".paciente")[i - 1].offsetLeft + 130 + "px" : 0;
    document.querySelector(".heap_demonstracao").appendChild(div);

}
function animaPorta() {
    const porta = document.querySelector(".porta");
    porta.style.animation = "";
    setTimeout(() => {
        porta.style.animation = "po 1s alternate-reverse"
        atualizarLista();
    }, 2);
}
var array = [15, "4e6", 23, 67, 79, 99];
console.log(array);
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
            if (paiPosi >= 0 && this.heap[paiPosi].length < this.heap[posi].length) {
                this.trocarPosi(paiPosi, posi);
                this.verificaPai(paiPosi);
            }
        }
    }
    inserir(valor) {

        var x = (typeof valor == "string" && !isNaN(+valor)) ? "number" : typeof valor;
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
            console.log(8);
            if (esquerdo < this.heap.length && this.heap[esquerdo] > this.heap[maiorPosi]) {
                maiorPosi = esquerdo;
            }

            if (direito < this.heap.length && this.heap[direito] > this.heap[maiorPosi]) {
                maiorPosi = direito;
            }
        } else {
            if (esquerdo < this.heap.length && this.heap[esquerdo].length > this.heap[maiorPosi].length) {
                maiorPosi = esquerdo;
            }

            if (direito < this.heap.length && this.heap[direito].length > this.heap[maiorPosi].length) {
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

array.forEach(element => {
    he.inserir(element);
});

document.getElementById("maior_texto").addEventListener("click", maiorTexto);

function maiorTexto() {
    var maior = new maxHeaper();
    var textos = document.querySelectorAll("p");
    textos.forEach(e => {
        maior.inserir(e.innerHTML);
    }
    )

    for (let i = 0; i < textos.length; i++) {
        textos[i].innerHTML = maior.heap[i];
    }
}
function maiorImagem() {
    
}
console.log(he.heap)
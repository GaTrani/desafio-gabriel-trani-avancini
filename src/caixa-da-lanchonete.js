class CaixaDaLanchonete {
    cardapio = {
        cafe: { valor: '3', tipo: 'principal', extras: [] },
        chantily: { valor: '1.5', tipo: 'extra', principais: ['cafe'] },
        suco: { valor: '6.2', tipo: 'principal', extras: [] },
        sanduiche: { valor: '6.5', tipo: 'principal', extras: [] },
        queijo: { valor: '2', tipo: 'extra', principais: ['sanduiche'] },
        salgado: { valor: '7.25', tipo: 'principal', extras: [] },
        combo1: { valor: '9.5', tipo: 'combo', extras: [] },
        combo2: { valor: '7,5', tipo: 'combo', extras: [] }
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        var total = 0.0;
        var subTotal = 0.0;
        var validarExtra = false;
        var validarPrincipal = false;
        var itensPrincipais = {};

        if (metodoDePagamento == 'debito' || metodoDePagamento == 'credito' || metodoDePagamento == 'dinheiro') {
            if (itens == "") {
                return "Não há itens no carrinho de compra!";
            }

            for (let index = 0; index < itens.length; index++) {
                const element = itens[index].split(",");
                const item = element[0];
                const qtd = element[1];

                if (qtd == "0") {
                    return "Quantidade inválida!";
                }

                if (isNaN(qtd)) {
                    return "Item inválido!";
                }

                if (this.cardapio.hasOwnProperty(item)) {
                    let tipo = this.cardapio[item].tipo;
                    if (tipo == 'principal') {
                        validarPrincipal = true;
                        itensPrincipais[item] = true;
                    }
                    if (tipo == 'extra') {
                        validarExtra = true;
                        const principaisRelacionados = this.cardapio[item].principais;
                        if (principaisRelacionados) {
                            for (const principal of principaisRelacionados) {
                                if (!itensPrincipais.hasOwnProperty(principal)) {
                                    return "Item extra não pode ser pedido sem o principal";
                                }
                            }
                        }
                    }

                    var preco = parseFloat(this.cardapio[item].valor.replace(',', '.'));
                    subTotal = preco * qtd;
                    console.log("item:", item, "qtd:", qtd, "preco:", preco.toFixed(2), "total:", subTotal.toFixed(2));
                    total += subTotal;
                } else {
                    console.log("O item", item, "não está no cardápio.");
                    return "Item inválido!";
                }
            }

            // Restante do cálculo do total e formatação
            if (metodoDePagamento == 'dinheiro') {
                total = total * 0.95;
            } else if (metodoDePagamento == 'credito') {
                total = total * 1.03;
            }

            var totalFormatado = total.toFixed(2);
            totalFormatado = totalFormatado.replace('.', ',');
            var resultado = "R$ " + totalFormatado;

            return resultado;
        } else {
            return "Forma de pagamento inválida!";
        }
    }
}

export { CaixaDaLanchonete };

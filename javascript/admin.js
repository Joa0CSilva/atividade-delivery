'use strict';

const tbody = document.querySelector('#tbody-produtos');

function listarProdutos() {

    tbody.innerHTML = '';

    produtos.forEach(produto => {

        const estoqueProduto = estoque.find(
            item => item.produtoId === produto.id
        );

        const quantidade = estoqueProduto
            ? estoqueProduto.quantidade
            : 0;

        tbody.innerHTML += `
            <tr>
                <td>${produto.id}</td>

                <td>${produto.nome}</td>

                <td>${produto.categoria}</td>

                <td>R$ ${produto.preco.toFixed(2).replace(".", ",")}</td>


                <td>${quantidade}</td>

                <td>
                    <button>Editar</button>
                    <button>Excluir</button>
                </td>
            </tr>
        `;
    });

}

listarProdutos();
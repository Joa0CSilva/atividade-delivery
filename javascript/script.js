'use strict'

const container = document.querySelector('#produtos')

function mostrarProduto() {
    produtos.forEach((produto) => {
        
        container.innerHTML += `
        <div class="card">
            <img src="${produto.imagem}" alt="${produto.nome}" width="200" height="150" class="imagem-produto">
            
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <p>R$ ${produto.preco.toFixed(2)}</p>
        </div>
        `
    })
}

mostrarProduto()
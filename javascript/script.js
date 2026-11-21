'use strict'

const container = document.querySelector('#produtos')

function mostrarProdutos(listaProdutos) {

    container.innerHTML = ''

    listaProdutos.forEach((produto) => {
        
        container.innerHTML += `
        <div class="card">
            <img src="${produto.imagem}" alt="${produto.nome}"
            width="200" height="150"
            class="imagem-produto">
            
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <p>R$ ${produto.preco.toFixed(2)}</p>
        </div>
        `
    })
}

mostrarProdutos(produtos)

const pesquisa = document.querySelector('#pesquisa')

pesquisa.addEventListener('input', () => {
    const texto = pesquisa.value.toLowerCase()

    const produtosFiltrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(texto)
    )

    mostrarProdutos(produtosFiltrados)
})
'use strict';

const tbody = document.querySelector('#tbody-produtos')
const formulario = document.querySelector('.form-produto')
let produtoEditando = null


//Produtos//
function listarProdutos() {

    tbody.innerHTML = ''

    produtos.forEach(produto => {

        const estoqueProduto = estoque.find(
            item => item.produtoId === produto.id
        );

        const quantidade = estoqueProduto
            ? estoqueProduto.quantidade
            : 0

        tbody.innerHTML += `
            <tr>
                <td>${produto.id}</td>

                <td>${produto.nome}</td>

                <td>${produto.categoria}</td>

                <td>R$ ${produto.preco.toFixed(2).replace(".", ",")}</td>


                <td>${quantidade}</td>

                <td>
                    <button id="btn-editar" class="btn-acao" onclick="editarProduto(${produto.id})">Editar</button>
                    <button id="btn-excluir" class="btn-acao" onclick="excluirProduto(${produto.id})">Excluir</button>
                </td>
            </tr>
        `
    })

}

listarProdutos()


//Editar produtos//
function editarProduto(id){

    document.querySelector('.btn-cadastrar').textContent =
    'Salvar Alterações';

    const produto = produtos.find(
        produto => produto.id === id
    );

    const estoqueProduto = estoque.find(
        item => item.produtoId === id
    );

    document.querySelector('#nome').value =
        produto.nome;

    document.querySelector('#preco').value =
        produto.preco;

    document.querySelector('#categoria').value =
        produto.categoria;

    document.querySelector('#unidade').value =
        produto.unidade;

    document.querySelector('#imagem').value =
        produto.imagem;

    document.querySelector('#descricao').value =
        produto.descricao;

    document.querySelector('#estoque').value =
        estoqueProduto.quantidade;

    produtoEditando = id;
}

//Excluir os produtos//
function excluirProduto(id){

    const produto = produtos.find(
        produto => produto.id === id
    );

    const confirmar = confirm(
        `Deseja realmente excluir o produto "${produto.nome}"?`
    );

    if(!confirmar){
        return;
    }

    const indiceProduto = produtos.findIndex(
        produto => produto.id === id
    );

    if(indiceProduto !== -1){
        produtos.splice(indiceProduto, 1);
    }

    const indiceEstoque = estoque.findIndex(
        item => item.produtoId === id
    );

    if(indiceEstoque !== -1){
        estoque.splice(indiceEstoque, 1);
    }

    listarProdutos();

    alert('Produto excluído com sucesso!');
}


formulario.addEventListener('submit', (event) => {



    event.preventDefault();

    const nome = document.querySelector('#nome').value;
    const preco = Number(document.querySelector('#preco').value);
    const categoria = document.querySelector('#categoria').value;
    const unidade = document.querySelector('#unidade').value;
    const imagem = document.querySelector('#imagem').value;
    const descricao = document.querySelector('#descricao').value;
    const quantidade = Number(document.querySelector('#estoque').value);

    const novoId =
        produtos.length > 0
            ? Math.max(...produtos.map(produto => produto.id)) + 1
            : 1;

    if(produtoEditando !== null){

        const produto = produtos.find(
            produto => produto.id === produtoEditando
        );

        produto.nome = nome;
        produto.preco = preco;
        produto.categoria = categoria;
        produto.unidade = unidade;
        produto.imagem = imagem;
        produto.descricao = descricao;

        const estoqueProduto = estoque.find(
            item => item.produtoId === produtoEditando
        );

        estoqueProduto.quantidade = quantidade;

        produtoEditando = null;

        document.querySelector('.btn-cadastrar').textContent =
            'Cadastrar Produto';

        listarProdutos();

        formulario.reset();

        alert('✅ Produto editado com sucesso!')

        return;

    }
        const novoProduto = {
            id: novoId,
            nome,
            preco,
            categoria,
            unidade,
            imagem,
            descricao
        };

        produtos.push(novoProduto);

        estoque.push({
            id: novoId,
            produtoId: novoId,
            quantidade
        });

        listarProdutos();

        formulario.reset();

        alert('✅ Produto cadastrado com sucesso!');
        
    })
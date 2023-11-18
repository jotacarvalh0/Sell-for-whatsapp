$(document).ready(function () {
    cardapio.eventos.init();
    cardapio.metodos.obterItensCardapio();
})

var cardapio = {};

var MEU_CARRINHO = [];

cardapio.eventos = {

    init: () => {
        cardapio.metodos.obterItensCardapio();
    },

}

cardapio.metodos = {

    // Puxa a lista de itens do cardápio
    obterItensCardapio: (categoria = 'burgers', vermais = false ) => {

        var filtro = MENU[categoria];
        console.log(filtro);

        if (!vermais) {
            $("#itensCardapio").html('')
            $("#btnVerMais").removeClass('hidden')
        }


        $.each(filtro, (i, e) => {

            let temp = cardapio.templates.item.replace(/\${img}/g, e.img)
            .replace(/\${name}/g, e.name)
            .replace(/\${desc}/g, e.dsc)
            .replace(/\${id}/g, e.id)
            .replace(/\${preco}/g, e.price.toFixed(2).replace('.',','))

            //botão ver mais for clicado (12 itens)
            if (vermais && i >= 8 && i < 12) {
                $("#itensCardapio").append(temp)
            }

            //Páginação inicial (8 itens)
            if (!vermais && i < 8) {
                $("#itensCardapio").append(temp)
            }

        })

        // remover o activo
        $(".container-menu a").removeClass('active');

        // setar o menu para activo
        $("#menu-" + categoria).addClass('active')

    },

    //Clique no botão ver mais
    verMais: () => {

        var ativo = $(".container-menu a.active").attr('id').split('menu-')[1]; 
        cardapio.metodos.obterItensCardapio(ativo, true)

        $("#btnVerMais").addClass('hidden')
    },

    diminuirQuantidade: (id) => {

        let qntdAtual = parseInt($("#qntd-" + id).text());

        if (qntdAtual > 0) {
            $("#qntd-" + id).text(qntdAtual - 1)
        }

    },

    aumentarQuantidade: (id) => {
        
        let qntdAtual = parseInt($("#qntd-" + id).text());
            $("#qntd-" + id).text(qntdAtual + 1)
        

    },

    adicionarAoCarrinho: (id) => {
        let qntdAtual = parseInt($("#qntd-" + id).text());

        if (qntdAtual > 0) {
            // obter a categoria ativa
            var categoria = $(".container-menu a.active").attr('id').split('menu-')[1];

            // obter a lista de itens
            let filtro = MENU[categoria];

            // obter o item
            let item = $.grep(filtro, (e, i) => { return e.id == id });

            if (item.length > 0) {

                // validar se já existe esse item no carrinho
                let existe = $.grep(MEU_CARRINHO, (elem, index) => {
                    return elem.id == id
                });

                // Caso exista vai apenas alterar quantidade.
                if (existe.length > 0) {
                    let objIndex = MEU_CARRINHO.findIndex((obj => obj.id == id))
                    MEU_CARRINHO[objIndex].qntd = MEU_CARRINHO[objIndex].qntd + qntdAtual
                }
                // Se não existir vai ser adicionado
                else {
                    item[0].qntd = qntdAtual;
                    MEU_CARRINHO.push(item[0])
                }

                cardapio.metodos.mensagem('Item adicionado ao carrinho')
                $("#qntd-" + id).text(0)

                cardapio.metodos.atualizarBadgeTotal();
            }

        }
    },

    atualizarBadgeTotal: () => {

        var total = 0;

        // Calcular total de itens no carrinho
        $.each(MEU_CARRINHO, (i, e) => {
            total += e.qntd
        })

        // Validar se tem item no carrinho ou não.
        if (total > 0) {
            $(".botao-carrinho").removeClass('hidden')
            $(".container-total-carrinho").removeClass('hidden')
        }
        else {
            $(".botao-carrinho").addClass('hidden')
            $(".container-total-carrinho").addClass('hidden')
        }

        $(".badge-total-carrinho").html(total);

    },

    mensagem: (texto, cor = 'red', tempo = 3500) => {

        $("#containerMensagens").append(texto)
        
    },
}

cardapio.templates = {

    item: `
            <div class="col-3 mb-5">
                <div class="card card-item" id="\${id}">
                    <div class="img-produto">
                        <img src="\${img}">
                    </div>
                    <p class="title-produto text-center mt-4">
                        <b>\${name}</b>
                    </p>
                    <p class="descricao-produto text-center mt-4">
                    \${desc}
                    </p>
                    <p class="price-produto text-center">
                        <b>R$ \${preco}</b>
                    </p>
                    <div class="add-carrinho">
                        <span class="btn-menos" onclick="cardapio.metodos.diminuirQuantidade('\${id}')"><i class="fas fa-minus"></i></span>
                        <span class="add-numero-itens" id="qntd-\${id}">0</span>
                        <span class="btn-mais" onclick="cardapio.metodos.aumentarQuantidade('\${id}')"><i class="fas fa-plus"></i></span>
                        <span class="btn btn-add" onclick="cardapio.metodos.adicionarAoCarrinho('\${id}')"><i class="fas fa-shopping-bag"></i></span>
                    </div>
                </div>
            </div>
    `

}

$(document).ready(function () {
    cardapio.eventos.init();
    cardapio.metodos.obterItensCardapio();
})

var cardapio = {};

cardapio.eventos = {

    init: () => {
        cardapio.metodos.obterItensCardapio();
    },

}

cardapio.metodos = {

    // Puxa a lista de itens do cardápio
    obterItensCardapio: (categoria = 'burgers') => {

        var filtro = MENU[categoria];
        console.log(filtro);

        $("#itensCardapio").html('')

        $.each(filtro, (i, e) => {

            let temp = cardapio.templates.item.replace(/\${img}/g, e.img)
            .replace(/\${name}/g, e.name)
            .replace(/\${desc}/g, e.dsc)
            .replace(/\${preco}/g, e.price.toFixed(2).replace('.',','))

            $("#itensCardapio").append(temp)

        })

        // remover o activo
        $(".container-menu a").removeClass('active');

        // setar o menu para activo
        $("#menu-" + categoria).addClass('active')

    },

}

cardapio.templates = {

    item: `
            <div class="col-3 mb-5">
                <div class="card card-item">
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
                        <span class="btn-menos"><i class="fas fa-minus"></i></span>
                        <span class="add-numero-itens">0</span>
                        <span class="btn-mais"><i class="fas fa-plus"></i></span>
                        <span class="btn btn-add"><i class="fas fa-shopping-bag"></i></span>
                    </div>
                </div>
            </div>
    `

}

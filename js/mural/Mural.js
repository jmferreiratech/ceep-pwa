const Mural = (function(_render, Filtro){
    "use strict"
    let cartoes = getCards();

    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto});

    render();

    Filtro.on("filtrado", render)

    function getCards() {
        return (JSON.parse(localStorage.getItem(`cartoes[${usuario}]`)) || [])
            .map(card => new Cartao(card.conteudo, card.tipo))
            .map(card => preparaCartao(card));
    }

    function putCartds() {
        localStorage.setItem(`cartoes[${usuario}]`, JSON.stringify(cartoes.map(card => ({conteudo: card.conteudo, tipo: card.tipo}))));
    }

    function preparaCartao(cartao) {
            cartao.on("mudanca.**", () => {
                putCartds();
                render();
            });
            cartao.on("remocao", () => {
                cartoes = cartoes.slice(0);
                cartoes.splice(cartoes.indexOf(cartao), 1);
                putCartds();
                render();
            });
            return cartao;
    }

    function adiciona(cartao){
        if (logado) {
            cartoes.push(cartao)
            putCartds();
            preparaCartao(cartao);
            render()
            return true
        }
        alert("Você não está logado");
        return false;
    }

    login.on("login", () => {
        cartoes = getCards();
        render();
    });

    login.on("logout", () => {
        cartoes = [];
        render();
    });

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro)

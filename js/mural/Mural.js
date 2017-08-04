const Mural = (function(_render, Filtro){
    "use strict"
    let cartoes = getCards();
    cartoes.forEach(card => preparaCartao(card));

    const render = () => _render({cartoes: cartoes, filtro: Filtro.tagsETexto});

    render();

    Filtro.on("filtrado", render)

    function getCards() {
        return (JSON.parse(localStorage.getItem("cartoes")) || [])
            .map(card => new Cartao(card.conteudo, card.tipo));
    }

    function putCartds() {
        localStorage.setItem("cartoes", JSON.stringify(cartoes.map(card => ({conteudo: card.conteudo, tipo: card.tipo}))));
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

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro)

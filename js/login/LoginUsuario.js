let logado = !!localStorage.getItem("logado");

LoginUsuario_render({
    logado,
    usuario: localStorage.getItem("nomeUsuario"),
    onLogin: (nomeUsuario) => {
        logado = true;
        localStorage.setItem("logado", true);
        localStorage.setItem("nomeUsuario", nomeUsuario);
    },
    onLogout: () => {
        logado = false;
        localStorage.removeItem("logado");
        localStorage.removeItem("nomeUsuario");
    },
});

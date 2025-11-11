const protocol = "http://";
const baseURL = "localhost:3000";

async function obtemFilmes() {
    const filmesEndpoint = "/filmes";
    const URLcompleta = `${protocol}${baseURL}${filmesEndpoint}`;
    const filmes = (await axios.get(URLcompleta)).data;

    exibirTabela(".filmes", filmes);
}

async function cadastrarFilme() {
    const filmesEndpoint = "/filmes";
    const URLcompleta = `${protocol}${baseURL}${filmesEndpoint}`;
    let tituloInput = document.querySelector("#tituloinput");
    let sinopseInput = document.querySelector("#sinopseinput");
    let titulo = tituloInput.value;
    let sinopse = sinopseInput.value;
    if (titulo && sinopse) {
        tituloInput.value = "";
        sinopseInput.value = "";
        const dados = {
            titulo,
            sinopse,
        };
        const filmes = (await axios.post(URLcompleta, dados)).data;
        exibirTabela(".filmes", filmes);
        exibirAlerta(
            ".alert-filme",
            "Filme cadastrado com sucesso!",
            ["show", "alert-success"],
            ["d-none"],
            1500
        );
    } else {
        exibirAlerta(
            ".alert-filme",
            "Preencha todos os campos!",
            ["show", "alert-danger"],
            ["d-none"],
            1500
        );
    }
}

async function cadastrarUsuario() {
    let usuarioCadastroInput = document.getElementById("userCadastroInput");
    let senhaCadastroInput = document.getElementById("passCadastroInput");
    let usuarioCadastro = usuarioCadastroInput.value;
    let senhaCadastro = senhaCadastroInput.value;
    if (usuarioCadastro && senhaCadastro) {
        try {
            const usuarioEndpoint = "/auth/signup";
            const URLcompleta = `${protocol}${baseURL}${usuarioEndpoint}`;
            const dados = {
                login: usuarioCadastro,
                password: senhaCadastro,
            };
            await axios.post(URLcompleta, dados);
            usuarioCadastroInput.value = "";
            senhaCadastroInput.value = "";
            exibirAlerta(
                ".alert-cadastro",
                "Usuário cadastrado com sucesso!",
                ["show", "alert-sucess"],
                ["d-none"],
                2000
            );
            esconderModal("#modalCadastro", 2000);
        } catch (error) {
            console.error(error);
            exibirAlerta(
                ".alert",
                "Usuário já existente!",
                ["show", "alert-danger"],
                ["d-none"],
                2000
            );
            esconderModal("#modalCadastro", 2000);
        }
    } else {
        exibirAlerta(
            ".alert",
            "Preencha todos os campos!",
            ["show", "alert-danger"],
            ["d-none"],
            2000
        );
    }
}

function exibirAlerta(seletor, texto, classesAdd, classesRemove, timer) {
    let alert = document.querySelector(seletor);
    alert.innerHTML = texto;
    alert.classList.add(...classesAdd);
    alert.classList.remove(...classesRemove);
    setTimeout(() => {
        alert.classList.remove(...classesAdd);
        alert.classList.add(...classesRemove);
    }, timer);
}

function esconderModal(seletor, timer) {
    setTimeout(() => {
        let modal = bootstrap.Modal.getInstance(
            document.querySelector(seletor)
        );
        modal.hide();
    }, timer);
}

function exibirTabela(seletor, itens) {
    let tabela = document.querySelector(seletor);
    let corpo = tabela.getElementsByTagName("tbody")[0];
    corpo.innerHTML=""
    itens.forEach((item) => {
        let linhaNova = corpo.insertRow(0);
        let celulaTitulo = linhaNova.insertCell(0);
        let celulaSinopse = linhaNova.insertCell(1);
        celulaTitulo.innerHTML = item.titulo;
        celulaSinopse.innerHTML = item.sinopse;
    });
}

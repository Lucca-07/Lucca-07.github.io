const protocol = "http://";
const baseURL = "localhost:3000";

async function obtemFilmes() {
    const filmesEndpoint = "/filmes";
    const URLcompleta = `${protocol}${baseURL}${filmesEndpoint}`;
    const filmes = (await axios.get(URLcompleta)).data;

    let tabela = document.querySelector(".filmes");
    let corpo = tabela.getElementsByTagName("tbody")[0];
    filmes.forEach((filme) => {
        let linhaNova = corpo.insertRow(0);
        let celulaTitulo = linhaNova.insertCell(0);
        let celulaSinopse = linhaNova.insertCell(1);
        celulaTitulo.innerHTML = filme.titulo;
        celulaSinopse.innerHTML = filme.sinopse;
    });
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
        let tabela = document.querySelector(".filmes");
        let corpo = tabela.getElementsByTagName("tbody")[0];
        corpo.innerHTML = "";
        filmes.forEach((filme) => {
            let linha = corpo.insertRow(0);
            let celulaTitulo = linha.insertCell(0);
            let celulaSinopse = linha.insertCell(1);
            celulaTitulo.innerHTML = filme.titulo;
            celulaSinopse.innerHTML = filme.sinopse;
        });
    } else {
        let alert = document.querySelector(".alert-filme");
        alert.classList.add("show");
        alert.classList.remove("d-none");
        setTimeout(() => {
            alert.classList.remove("show");
            alert.classList.add("d-none");
        }, 1500);
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
            const usuario = (await axios.post(URLcompleta, dados)).data;
            usuarioCadastroInput.value = "";
            senhaCadastroInput.value = "";
            let alert = document.querySelector(".alert");
            alert.classList.add("show", "alert-success");
            alert.classList.remove("d-none");
            alert.innerHTML = "Usuário cadastrado com sucesso!";
            setTimeout(() => {
                alert.classList.remove("show", "alert-success");
                alert.classList.add("d-none");
                modalCadastro = bootstrap.Modal.getInstance(
                    document.querySelector("#modalCadastro")
                );
                modalCadastro.hide();
            }, 2000);
        } catch (error) {
            console.error(error);
            let alert = document.querySelector(".alert");
            alert.classList.add("show", "alert-danger");
            alert.classList.remove("d-none");
            alert.innerHTML = "Usuário já existente!";
            setTimeout(() => {
                alert.classList.remove("show", "alert-danger");
                alert.classList.add("d-none");
                modalCadastro = bootstrap.Modal.getInstance(
                    document.querySelector("#modalCadastro")
                );
                modalCadastro.hide();
                usuarioCadastroInput.value = "";
                senhaCadastroInput.value = "";
            }, 2000);
        }
    } else {
        let alert = document.querySelector(".alert");
        alert.classList.add("show", "alert-danger");
        alert.classList.remove("d-none");
        alert.innerHTML = "Preencha todos os campos!";
        setTimeout(() => {
            alert.classList.remove("show", "alert-danger");
            alert.classList.add("d-none");
        }, 2000);
    }
}

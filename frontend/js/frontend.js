const protocol = "http://";
const baseURL = "localhost:3000";
const filmesEndpoint = "/filmes";

async function obtemFilmes() {
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
        let alert = document.querySelector(".alert");
        alert.classList.add("show");
        alert.classList.remove("d-none");
        setTimeout(() => {
            alert.classList.remove("show");
            alert.classList.add("d-none");
        }, 1500);
    }
}

const readline = require('readline');
const fs = require('fs');

const url = readline.createInterface({
  input: process.stdin,
  output: process.stdout
}); 

url.question('Digite a URL completa do repositório GitHub: ', (repo) => {
    console.log("Você digitou: " + repo)
    const repourl = repo.substr(19,);
    const sitegit = repo.substr(0,19);
    if (sitegit == 'https://github.com/') {
    site = `https://api.github.com/repos/`;
    resultado = site + repourl + `/issues?page=1&per_page=100`;
    console.log(`Logando em: ${resultado}`)

    const fetch = require('node-fetch');
    fetch(resultado)
    .then(res => res.json())
    .then(function (data) {

     var csv = 'title, body, state, number, assign, labels, milestone\n';
     
        data.forEach(function(row) {
                csv += row.title;
                csv += ';'+ row.body.replace(/(\r\n|\n|\r)/gm,"");
                csv += ';'+ row.state;
                csv += ';'+ row.number;
                csv += ';'+ row.assign;
                csv += ';'+ row.labels;
                csv += ';'+ row.milestone;
                csv += '\n';
        });
        fs.writeFile('./IssuesGitHub.csv', csv, (err) => {
          if (err) throw err;
          console.log('O arquivo foi salvo como: IssuesGitHub\nFim!');
        });
    });
} else {
  console.log("URL Inválida !\n(OBS: Não esqueça do https://)");
}
  url.close();
});
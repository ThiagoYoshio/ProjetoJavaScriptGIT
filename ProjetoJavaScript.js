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

     var csv = 'TITLE| BODY| STATE| NUMBER| ASSIGN| LABELS| MILESTONE\n';
        data.forEach(function(flecha) {
            var assigneeBody = flecha.assignee;
            if (assigneeBody != null && "login" in assigneeBody) assigneeBody=assigneeBody.login;
            var milestoneBody = flecha.milestone;
            if (milestoneBody != null && "title" in milestoneBody) milestoneBody=milestoneBody.title;
                csv += flecha.title.replace(/"/g, "'");
                csv += '|"'+ flecha.body.replace(/(\r\n|\n|\r)/gm,"").replace(/"/g, "'")+'"';
                csv += '|'+ flecha.state.replace(/"/g, "'");
                csv += '|'+ flecha.number;
                csv += '|'+ assigneeBody;
                csv += '|'+ JSON.stringify(flecha.labels);
                csv += '|'+ (milestoneBody);
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
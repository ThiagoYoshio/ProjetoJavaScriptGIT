const readline = require('readline'); //biblioteca para dar input no usuário
const fs = require('fs'); //biblioteca para criar o arquivo csv 

const url = readline.createInterface({
  input: process.stdin,
  output: process.stdout
}); //função para ler o que o usuário digitar

url.question('Digite a URL completa do repositório GitHub: ', (repo) => {
    console.log("Você digitou: " + repo)
    const repourl = repo.substr(19,);
    const sitegit = repo.substr(0,19);
    if (sitegit == 'https://github.com/') {
    site = `https://api.github.com/repos/`;
    resultado = site + repourl + `/issues?page=1&per_page=100`;
    console.log(`Logando em: ${resultado}`)

    const fetch = require('node-fetch');
    //biblioteca fetch
    fetch(resultado)
    .then(res => res.json())
    .then(function (data) {
      console.log(typeof(data))
      /*var filtrados = data.filter(function(dadosTitle) {
        var dadosTitle = dadosTitle.title
        //console.log(dadosTitle);
      });
      var filtrados2 = data.filter(function(dadosBody){
        var dadosBody = dadosBody.body
        //console.log(dadosBody);
      });
      var filtrados3 = data.filter(function(dadosState){
        var dadosState = dadosState.state
        //console.log(dadosState);
      });
      var filtrados4 = data.filter(function(dadosNumber){
        var dadosNumber = dadosNumber.number
        //console.log(dadosNumber);
      });
      var filtrados5 = data.filter(function(dadosAssign){
        var dadosAssign = dadosAssign.assign
        //console.log(dadosAssign);
      });
      var filtrados6 = data.filter(function(dadosLabel){
        var dadosLabel = dadosLabel.labels
        //console.log(dadosLabel);
      });
      var filtrados7 = data.filter(function(dadosMilestone){
        var dadosMilestone = dadosMilestone.milestone
        //console.log(dadosMilestone);
      });


      var _gerarCsv = function(){
     */
        var csv = 'title, body, state, number, assign, labels, milestone\n';
     
        data.forEach(function(row) {
                csv += row.title;
                csv += ';'+ row.body;
                csv += ';'+ row.state;
                csv += ';'+ row.number;
                csv += ';'+ row.assign;
                csv += ';'+ row.labels;
                csv += ';'+ row.milestone;
                csv += '\n';
        });
        fs.writeFile('./teste.csv', csv, (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });
        //console.log(csv)
        //console.log(csv)

        //fs.appendFile('message.csv', data, 'utf8', callback);
      

        //hiddenElement.click();
    //};
    //_gerarCsv();
    });

    

} else {
  console.log("URL Inválida !\n(OBS: Não esqueça do https://)");

}
  url.close();
  console.log("Finalizado !");
  
});

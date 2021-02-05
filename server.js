const express = require('express')
const app = express()
const port = 3000
const { exec } = require("child_process");
const bodyParser = require('body-parser');
var fs = require('fs');

app.use(express.static('src/front'));

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/front/index.html');
})

const checkAnswer = (request, response) => {

    content = "Monitor_dzn= ["+request.body.array[0]+"];\n";
    content += request.body.array[1].filter(item => item != '_').length>0 ? "Processor_dzn= ["+request.body.array[1]+"];\n" : "%Processor_dzn= ["+request.body.array[1]+"];\n" ;
    content += request.body.array[2].filter(item => item != '_').length>0 ? "Hard_disk_dzn= ["+request.body.array[2]+"];\n" : "%Hard_disk_dzn= ["+request.body.array[2]+"];\n" ;
    content += request.body.array[3].filter(item => item != '_').length>0 ? "Price_dzn= ["+request.body.array[3]+"];" : "%Price_dzn= ["+request.body.array[3]+"];" ;

    console.log(content);

    fs.writeFile('dzn/test_computer.dzn', content, function (err) {
        if (err) throw err;
        console.log('Updated!');
    });

    exec("minizinc -a --solver Gecode mzn/computer_puzzle_modele.mzn dzn/test_computer.dzn", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
      response.status(200).json(`${stdout}`) 
    });
}

const checkAnswerAlPacino = (request, response) => {

  content = "Personne_dzn= ["+request.body.array[0]+"];\n";
  content += request.body.array[1].filter(item => item != '_').length>0 ? "Film_dzn= ["+request.body.array[1]+"];\n" : "%Film_dzn= ["+request.body.array[1]+"];\n" ;
  content += request.body.array[2].filter(item => item != '_').length>0 ? "Jour_dzn= ["+request.body.array[2]+"];\n" : "%Jour_dzn= ["+request.body.array[2]+"];\n" ;
  content += request.body.array[3].filter(item => item != '_').length>0 ? "Horaire_dzn= ["+request.body.array[3]+"];" : "%Horaire_dzn= ["+request.body.array[3]+"];" ;

  console.log(content);

  fs.writeFile('dzn/test_alpacino.dzn', content, function (err) {
      if (err) throw err;
      console.log('Updated!');
  });

  exec("minizinc -a --solver Gecode mzn/alpacino_puzzle_modele.mzn dzn/test_alpacino.dzn", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      response.status(200).json(`${stdout}`) 
  });
}

const checkAnswerPastaWine = (request, response) => {

  content = "Shirt= ["+request.body.array[0]+"];\n"+
            "Name= ["+request.body.array[1]+"];\n"+
            "Surname= ["+request.body.array[2]+"];\n"+
            "Pasta= ["+request.body.array[3]+"];\n"+
            "Wine= ["+request.body.array[4]+"];\n"+
            "Age= ["+request.body.array[5]+"];";


  content = request.body.array[0].filter(item => item != '_').length>0 ? "Shirt= ["+request.body.array[0]+"];\n" : "%Shirt= ["+request.body.array[0]+"];\n" ;
  content += request.body.array[1].filter(item => item != '_').length>0 ? "Name= ["+request.body.array[1]+"];\n" : "%Name= ["+request.body.array[1]+"];\n" ;
  content += request.body.array[2].filter(item => item != '_').length>0 ? "Surname= ["+request.body.array[2]+"];\n" : "%Surname= ["+request.body.array[2]+"];\n" ;
  content += request.body.array[3].filter(item => item != '_').length>0 ? "Pasta= ["+request.body.array[3]+"];\n" : "%Pasta= ["+request.body.array[3]+"];\n" ;
  content += request.body.array[4].filter(item => item != '_').length>0 ? "Wine= ["+request.body.array[4]+"];\n" : "%Wine= ["+request.body.array[4]+"];\n" ;
  content += request.body.array[5].filter(item => item != '_').length>0 ? "Age= ["+request.body.array[5]+"];\n" : "%Age= ["+request.body.array[5]+"];\n" ;

  console.log(content);

  fs.writeFile('dzn/test_pastaWine.dzn', content, function (err) {
      if (err) throw err;
      console.log('Updated!');
  });

  exec("minizinc -a --solver Gecode mzn/pastaWine_puzzle_modele.mzn dzn/test_pastaWine.dzn", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      response.status(200).json(`${stdout}`) 
  });
}

app.post('/checkAnswer', checkAnswer)
app.post('/checkAnswerAlPacino', checkAnswerAlPacino)
app.post('/checkAnswerPastaWine', checkAnswerPastaWine)

app.listen(port, () => {
  console.log(`Puzzle is listening at http://localhost:${port}`)
})
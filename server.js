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

    content = "Monitor_dzn= ["+request.body.array[0]+"];\n"+
              "Processor_dzn= ["+request.body.array[1]+"];\n"+
              "Hard_disk_dzn= ["+request.body.array[2]+"];\n"+
              "Price_dzn= ["+request.body.array[3]+"];";

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

  content = "Personne_dzn= ["+request.body.array[0]+"];\n"+
            "Film_dzn= ["+request.body.array[1]+"];\n"+
            "Jour_dzn= ["+request.body.array[2]+"];\n"+
            "Horaire_dzn= ["+request.body.array[3]+"];";

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
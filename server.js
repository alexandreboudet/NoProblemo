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

    content = "Monitor_dzn= ["+request.body.array[0]+"]\n"+
              "Processor_dzn= ["+request.body.array[1]+"]\n"+
              "Hard_disk_dzn= ["+request.body.array[2]+"]\n"+
              "Price_dzn= ["+request.body.array[3]+"]";

    console.log(content);

    fs.writeFile('dzn/test_computer.dzn', content, function (err) {
        if (err) throw err;
        console.log('Updated!');
    });

    exec("minizinc -a --solver Gecode computer_puzzle_modele.mzn dzn/test_computer.dzn", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        response.status(200).json(`stdout: ${stdout}`) 
    });
}

app.post('/checkAnswer', checkAnswer)

app.listen(port, () => {
  console.log(`Puzzle is listening at http://localhost:${port}`)
})
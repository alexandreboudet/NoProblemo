const express = require('express')
const app = express()
const port = 3000
const { exec, execSync } = require("child_process");
const bodyParser = require('body-parser');

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

    exec("$(which minizinc) --version", (error, stdout, stderr) => {
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

    // let res = execSync('bash ./snap/bin/minizinc --version')
    // console.log(`${res}`)
}

app.get('/checkAnswer', checkAnswer)

app.listen(port, () => {
  console.log(`Puzzle is listening at http://localhost:${port}`)
})
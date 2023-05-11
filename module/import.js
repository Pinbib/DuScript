module.exports = (body, mainpath, door, variable, comment, declare, modul, global, tool) => {
    const { Variable, Formation } = require(tool);
    const { spawn } = require('child_process');
    const Elog = require("console").error;
    let data = body.split(" ");

    // const args = [body, mainpath, door, variable, comment, declare, modul, global, tool];
    // const scriptPath = 'test/main.py';

    // const pythonProcess = spawn('python', [scriptPath, ...args]);

    // pythonProcess.stdout.on('data', (data) => {
    //     console.log(`${data}`);
    // });

    // pythonProcess.stderr.on('data', (data) => {
    // });

    // pythonProcess.on('close', (code) => {
    // });

    if (data[1] == "from") {
        if (data[2] == "Python") {
            modul[data[3]] = {
                main: (body, mainpath, door, variable, comment, declare, modul, global, tool) => {
                    const args = [body.join(" "), mainpath, JSON.stringify(door), JSON.stringify(variable), comment.join(","), JSON.stringify(declare), JSON.stringify(modul), JSON.stringify(global), tool];
                    const scriptPath = data.slice(4).join(" ");

                    const pythonProcess = spawn('python', [scriptPath, ...args]);

                    pythonProcess.stdout.on('data', (data) => {
                    });

                    pythonProcess.stderr.on('data', (data) => {
                    });

                    pythonProcess.on('close', (code) => {
                    });
                }, request: true
            }
        }
    } else if (data[1] == "run") {
        if (data[2] == "Python") {
            const args = [body, mainpath, door, variable, comment, declare, modul, global, tool];
            const scriptPath = data.slice(3).join(" ");

            const pythonProcess = spawn('python', [scriptPath, ...args]);

            pythonProcess.stdout.on('data', (data) => {
            });

            pythonProcess.stderr.on('data', (data) => {
            });

            pythonProcess.on('close', (code) => {
            });
        }
    }
}

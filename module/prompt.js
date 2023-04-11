module.exports = (body, mainpath, door, variable, comment, declare, modul, global, tool) => {
    const prompt = require("prompt-sync")({ sigint: true });
    const { Variable, Formation } = require(tool);
    let data = body.split(" ");
    switch (data[1]) {
        case "line":
            if (true) {
                Variable.set(variable, data[2], prompt(
                    Formation.var(
                        variable, Formation.com(
                            comment, Formation.var(
                                variable, data.slice(3).join(" ")
                            )
                        )
                    )
                )
                );
            }
            break;
        case "multiline":
            if (true) {
                var end = data[3];
                var cirkle = [];
                var a = true;
                console.log(Formation.var(
                    variable, Formation.com(
                        comment, Formation.var(
                            variable, data.slice(4).join(" ")
                        )
                    )
                ));
                while (a) {
                    var value = prompt("");
                    if (value == end) {
                        Variable.set(variable, data[2], cirkle.join("\n"));
                        a = false;
                    } else {
                        cirkle.push(value);
                    };
                }
            }
            break;
        case "key":
            if (true) {
                const prompt = require("prompt-sync")({ sigint: true, echo: false });
                Variable.set(variable, data[2], prompt(
                    Formation.var(
                        variable, Formation.com(
                            comment, Formation.var(
                                variable, data.slice(3).join(" ")
                            )
                        )
                    )
                )
                    .split("")
                );
            }
            break;
    }
};
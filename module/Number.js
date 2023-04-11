module.exports = (body, mainpath, door, variable, comment, declare, modul, global, tool) => {
    const { Variable, Formation } = require(tool);
    let data = body.split(" ");

    switch (data[1]) {
        case "transform":
            let value = parseInt(
                Formation.var(
                    variable, Formation.com(
                        comment, Formation.var(
                            variable, data.slice(3).join(" ")
                        )
                    )
                )
            );
            console.log(value)
            Variable.set(variable, data[2], value);
            break;
    }
}
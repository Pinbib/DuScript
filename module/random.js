module.exports = (body, mainpath, door, variable, comment, declare, modul, global, tool) => {
    const { Variable, Formation } = require(tool);
    var data = body.split(" ");

    function random(max) {
        let rs = Math.ceil(Math.random() * max);
        return rs;
    }

    switch (data[1]) {
        case "Int":
            Variable.set(variable, data[2],
                random(
                    parseInt(
                        Formation.var(
                            variable, data[3]
                        )
                    )
                )
            );
            break;
        case "from":
            var dat = Formation.var(
                variable, data[2]
            ).split(",");
            Variable.set(variable, data[3], dat[random(dat.length - 1)])
            break;
    }
};
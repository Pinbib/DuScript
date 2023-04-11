module.exports = (body, mainpath, door, variable, comment, declare, modul, global, tool) => {
    const { Variable, Formation } = require(tool);
    var data = body.split(" ");

    function reandom(max) {
        let rs = Math.ceil(Math.random() * max);
        return rs;
    }

    switch (data[1]) {
        case "Int":
            Variable.set(variable, data[2],
                reandom(parseInt(Formation.var(variable, data[3])))
            );
            break;
    }
};
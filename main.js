var scripts;
var variable = {};

function createVar(name, value) {
    variable[name] = value;
}

for (var i = 0; i < document.querySelectorAll('script').length; i++) {
    var script = document.querySelectorAll('script');
    if (script[i].attributes.language.value == 'text/nameLang') {
        scripts = script[i].innerHTML;
        i += script.length + 64;
    }
}

var lines = scripts.split(';');

for (var i = 0; i < lines.length; i++) {
    let line = lines[i].replace(/^\s+|\s+$/g, "").split(' ');

    if (line[0] == 'approve') {
        if (line[3].indexOf('\'') != -1) {
            createVar(line[1], line[3].replace(/['"]+/g, ''));
        } else {
            createVar(line[1], line[3]);
        }
    } else if (line[0] == 'call') {
        if (line.length > 2) {
            for (var r = 1; r < line.length; r++) {
                console.log(variable[line[r]]);
            }
        } else {
            console.log(variable[line[1]]);
        }
    } else if (line[0].indexOf('(') != -1) {
        var newline = lines[i].replace(/^\s+|\s+$/g, "").split(/[\(\)]/);
        if (newline[0] == 'printl') {
            var logs = [];
            var data = newline[1];
            var data2 = data.split(' ');
            for (let r = 0; r < data2.length; r++) {
                if (data2[r] == 'call') {
                    logs.push(variable[data2[r + 1]]);
                } else if (data2[r].indexOf('\'') != -1) {
                    logs.push(data2[r].replace(/['"]+/g, ''))
                } else if (!variable[data2[r]]) {
                    logs.push('');
                }
            }
            console.log(logs.join(' '));
        }
    }
}
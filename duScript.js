var scripts;
var variable = {};
var coment = {
    "index": 0
};
function createComent(type, value) {
    coment['comment' + coment.index] = {};
    coment['comment' + coment.index].type = type;
    coment['comment' + coment.index].value = value;
    coment.index++;
}
function createVar(name, value) {
    variable[name] = value;
}
function editVar(name, value) {
    variable[name] = value;
}
function createArr(name, value) {
    variable[name] = {};
    variable[name].iValue = 'Arr';
    variable[name].eValue = value;
}
function createObject(name, value) {
    variable[name] = {};
    variable[name].iValue = 'Obj';
    variable[name].eValue = value;
}
for (var i = 0; i < document.querySelectorAll('script').length; i++) {
    var script = document.querySelectorAll('script');
    if (script[i].attributes.language.value == 'text/duScript') {
        scripts = script[i].innerHTML;
        i += script.length + 64;
    }
}

var lines = scripts.split(';');

for (var i = 0; i < lines.length; i++) {
    let line = lines[i].replace(/^\s+|\s+$/g, "").split(' ');

    if (line[0] == 'approve') {
        if (line.length == 2) {
            createVar(line[1], 'void');
        } else if (line[3].indexOf('\'') != -1) {
            createVar(line[1], line[3].replace(/['"]+/g, ''));
        } if (line[3] == 'Array') {
            var arr = line.slice(4, line.length);
            createArr(line[1], arr);
        } else if (line[3] == 'JSON') {
            var get = line.slice(4).join('');
            var obj = JSON.parse(get);
            createObject(line[1], obj);
        } else {
            createVar(line[1], line[3]);
        }
    } else if (line[0] == 'call') {
        if (line.length > 2) {
            for (let r = 1; r < line.length; r++) {
                if (variable[line[r]] && typeof variable[line[r]].iValue !== 'undefined') {
                    if (variable[line[r]].iValue == 'Arr') {
                        console.log(variable[line[r]].eValue[line[r + 1]]);
                    }
                    //JSON
                }
            }
        } else {
            console.log(variable[line[1]])
        }
    } else if (line[0] == 'Edit') {
        if (line[3] == 'Math') {
            var m = [];
            for (var r = 4; r < line.length; r++) {
                m.push(line[r]);
            }
            var rs = eval(m.join(''));
            editVar(line[1], rs)
        } else {
            editVar(line[1], line[3]);
        }
    } else if (line[0] == 'get') {
        if (line[1] == 'all') {
            console.log(variable[line[2]].eValue)
        }
    } else if (line[0] == '//' || 'rem:' || '::') {
        createComent(line[0], line.slice(1, line.length));
    } else if (line[0].indexOf('(') != -1) {
        console.log('ok')
    }
}
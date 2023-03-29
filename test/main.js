var func = {};
var variable = {};
var regex = {
    "number": /[0-9]/gm,
    "letters": /\w/gm,
    "spec": /[^A-Za-z0-9]+/gm
}
function createFunc(name, body = []) {
    func[name] = {};
    func[name].body = [];

    for (var i = 0; i < body.length; i++) {
        var line = body[i].split(/\s/gm);
        if (line[0] == 'approve') {
            if (line.length == 2) {
                func[name].body.push({
                    "command": 'create',
                    "value": [line[1], 'void']
                })
            } else if (line[3].indexOf('\'') != -1) {
                func[name].body.push({
                    "command": 'create',
                    "value": [line[1], line[3].replace(/\'/gm, '')]
                })
            } else if (line[3] == 'Array') {
                func[name].body.push({
                    "command": 'create',
                    "value": [line[1], line.slice(4)],
                    "type": 'Arr'
                })
            } else if (line[3] == 'JSON') {
                var get = line.slice(4).join('');
                var obj = JSON.parse(get);
                func[name].body.push({
                    "command": 'create',
                    "value": [line[1], obj],
                    "type": 'Obj'
                })
            } else if (line[3] == 'get') {
                if (line[4] == 'value') {
                    if (line.length == 7) {
                        func[name].body.push({
                            "command": 'create',
                            "value": [line[1], `copy ${line[5]} ${line[6]}`]
                        })
                    } else {
                        func[name].body.push({
                            "command": 'create',
                            "value": [line[1], `copy ${line[5]}`]
                        })
                    }
                }
            } else {
                func[name].body.push({
                    "command": 'create',
                    "value": [line[1], line[3]]
                })
            }
        } else if (line[0] == 'call') {
            func[name].body.push({
                "command": 'call',
                "value": line.slice(1)
            })
        } else if (line[0] == 'Edit') {
            if (line[3] == 'Math') {
                func[name].body.push({
                    "command": 'edit',
                    "value": [line[1], eval(line.slice(4).join(''))]
                })
            }
        } else if (line[0] == 'get') {
            if (line[1] == 'all') {
                func[name].body.push({
                    "command": 'call all',
                    "value": variable[line[2]]
                })
            }
        }
    }
}

createFunc('msg', ['approve msg;', 'Edit msg = 2', 'call msg'])

function callFunc(name) {
    var body = func[name].body;
    var temporaryVar = [];
    for (var i = 0; i < body.length; i++) {
        if (body[i].command == 'create') {
            if (body[i].type == 'Arr') {
                variable[body[i].value[0]] = body[i].value.slice(1);
            } else if (body[i].type == 'Obj') {
                variable[body[i].value[0]] = JSON.parse(body[i].value.slice(1));
            } else {
                variable[body[i].value[0]] = body[i].value[1];
            }
            temporaryVar.push(body[i].value[0]);
        } else if (body[i].command == 'call') {
            console.log(variable[body[i].value[0]])
        }
    }

    //delet temporary variable

    for (var i = 0; i < temporaryVar.length; i++) {
        delete variable[temporaryVar[i]]
    }
}
callFunc('msg')
console.log(func);
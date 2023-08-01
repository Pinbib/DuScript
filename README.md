# DuScript

<span style="color: red;">__This documentation is only valid for npm version: 0.3.0 and github commit: 7312623__</span>

<img src="duScript.ico" width="500px" height="500px">

The purpose of creating this language was an experiment to find out their strength. The peculiarity of this language is the modules unlimited by syntax.

[GitHub](https://github.com/Pinbib/DuScript)

[npm](https://www.npmjs.com/package/duscript)

# Install 

I recommend installing the package globally using the command:

```npm install -g duscript```

Next, to find out where the package was installed, use the command:

```npm list -g duscript --depth=0 -p```

Now you need to open the folder that you received with the above command, open the /exe folder there will be two files duScriptWindows.exe and duScriptMac.exe select the desired file for your operating system and run it you will be asked for the username where npm was installed, after entering press enter if everything was done correctly, then you should have created a dus.bat file, you need to transfer it to the C:/Windows/System32 folder if you are on Windows and if on Mac then /usr/local/bin if you did everything correctly, now when you enter " dus ./test.txt" on the command line, you should get "The executable must have a .du permission".

Update: 

```npm update -g duscript```

# Start

After switching to the CLI format, now to run the code you need to run the file start.bat and enter the path to the executable file with the permission .du

## approve

The "approve" command is used to create variables.

Sample:

    approve [name] = [type] [value];

    The name parameter specifies the name of the variable, the data type, the value, the value of the variable.

### Data type
There are eight types of data in total:

- Int
- String
- Boolean
- Array
- Object
- Av
- ViewCondition
- !

Let's analyze each of them:

### Int

Int - used to create variables with numbers and manipulate them.

Sample:

    approve [name] = Int [value];

### String

String - used to create variables with text.

Sample:

    approve [name] = String [value];

### Boolean

Boolean - used to create variables with a boolean expression.

Sample:

    approve [name] = Boolean [true||false];

### Array

Array - used to create arraysю

Sample:

    approve [name] = Boolean [1,2,3];

### Object

Object - used to create json objects.

Sample:

    approve [name] = Object {
        "[name]": 1
    };

### Av

Av - used to create variables with text, mathematical operations and the ability to insert variables.

Sample:

    approve a = Int 2;
    approve b = Int 2;
    approve [name] = Av @a+@b;

Will: 4

Variables are accessed through the symbol "@" which is a global object of variables, all text except for accessing variables must be in single or double quotes, to connect something with something, the + symbol is used.

Sample:

    approve a = Int 2;
    approve b = Int 2;
    approve [name] = Av "a+b: "+@a+@b;

Will: a+b: 4

### ViewCondition

ViewCondition - a boolean expression is placed in a variable with this type, a boolean expression in this type is not specified, it is assigned when the specified condition is met.

Sample:

    approve a = Int 2;
    approve [name] = ViewCondition @a==2;

Will: true

### !

! - reference to a comment, each comment has its own index starting from zero.

Sample:

    // :)
    approve [name] = ! 0;

Will: :)

## call

call - calls a variable or function

Sample:

    call [call-type] [type] [name];

The call-type parameter indicates what is being called, there are two types of call:
- variable
- function

The type parameter is only needed if the call-type is "variable" , there are five types in total:
- v

v - used when displaying text and numbers

Sample:

    approve msg = String string;
    call variable v msg;
    approve msg1 = Int 12;
    call variable v msg1;

Will: string
Will: 12

- Array

Array - for outputting arrays

Sample:

    approve msg = Array [1,2,3];
    call variable Array msg 1;

Will: 2

- Object

Object - to display an object

Sample:

    approve msg = Object {
        "a": 1
    };
    call variable Object msg.a;

Will: 1

- @

@ - reference to the global variable object

Sample:

    approve msg = Int 1;
    call variable @;

Will: { msg: 1 }

- !

! - access to the global object comment

Sample: 

    // :)
    call variable !;

Will: :)

If the call-type is specified as "function" then the type parameter is not needed

## printl

printl - prints anything specified in () everything works as in variables with type "As"

```
printl ([body])
```

Sample:

    approve msg = Int 1;
    printl ("msg: "+@msg);

Will: msg: 1

Space before () is required
## if

if - from the name it is clear

Splitting lines inside the "if" block is carried out through the symbol "^"

Space before () is required

```
if ([condition]) { 
    [body]^
};
```

Sample:

    approve msg = Int 1;
    if (@msg==1) {
        call variable v msg^
    };

Will: 1

## while

while - a loop that checks the condition before each execution, and line breaking occurs through "&^" in the if block there cannot be a cycle, but in the while loop, the if block can be and if there is an if block in the while, line breaking occurs as usual through " ^".

```
while ([condition]) { 
    [body]&^
};
```

Sample:

    while (1==1) {
        printl (1)&^
        if (2==1) {
            printl (2)^
        }&^
    };

Will: 11111111111111111111111111111111111++

## declare

declare - used to create functions splitting occurs through "*^".

``` 
declare [declare-type] [name] { 
    [body]*^
}
```

Sample: 

    declare function test {
        printl (1)*^
    };
    call function test;

Will: 1

## //

// - used to create comments after the command requires a space

# Manifest
To run several files and connect between them, when specifying the src, you do not need to specify the path to the desired file, but you need to specify the path to the folder with the files and at the end you must add "/" and the specified folder should contain the file Door.json.

Sample file Door.json:
```JSON
{
    "call": [
        "1.du",
        "2.du"
    ]
}
```

An array of executable files is placed in the call

1.du:

    approve msg = Int 1;

2.du:

    printl (@msg);

Will: 1

You can also close access to variables and comments from other files with the "clear" command, here is an example:

Door.json:
```JSON
{
    "call": [
        "1.du",
        "clear",
        "2.du"
    ]
}
```

An array of executable files is placed in the call

1.du:

    approve msg = Int 1;

2.du:

    printl (@msg);

Will:  

The "clear" command completely clears the global objects variable , comment.

## Module

Modules are imported by adding a "module" block to the Door.json file.

Sample:

```JSON
"module": [
        {
            "name": "fs",
            "from": "#fs"
        }
    ]
```

The "module" block is an array of objects, each module is a new object, to import built-in modules such as fs, use the "#" symbol and then the module name, the "name" field indicates the command to which the interpreter will respond, and the "from" field then where the module will be imported from.

After importing the module in Door.json, you need to confirm the import in the file in the following way:

    father fs true;

You can also disable imports:

    father fs false;

The module is created using JavaScript and the module must be located in the folder that is being launched. Let's try to create a module that will create a variable and output it and then delete it:

Let's create a file cld.js (c - creat, l - log, d - deleat)

Import it into the Door.json file.

Door.json:
```JSON
{
    "call": [
        "a.du"
    ],
    "module": [
        {
            "name": "cld",
            "from": "./cld.js"
        }
    ]
}
```

Let's create the module itself in the cld.js file.

cld.js:
```javascript
module.exports = (body, mainpath, door, variable, comment, declare, modul, global, tool) => {
    const { Variable } = require(tool);
    var data = body.split(" ");
    Variable.set(variable, data[1], data[2]);
    console.log(Variable.get(variable, data[1]));
    Variable.delete(variable, data[2]);
};
```

We are exporting an anonymous function that is anonymous, it should contain the parameters body, mainpath, door, variable, comment, declare, tool in the body is placed the line in which the command was found, in the mainpath is the path to the executable folder, in the door is the file Door.json , in variable all variables, in comment all comments, in declare all creation of a function, in tool the path to the auxiliary module is placed.

We import the Variable helper class to make dealing with variables easier. Then we split the string by spaces. We create a variable using the Variable.set class method and pass the name and value of the variable to it. We get the desired variable through the get method from the Variable class, pass variable and the name of the desired variable to the parameters, and then display it. We delete through the delete method in the parameters we pass variable and the name of the desired variable.

a.du:

    father cld true;
    cld msg 12;

Will: 12

We allow the import of the module, and then we make the call.

## Built-in modules

## fs

fs - is a module for manipulating the file system.

Import:
```JSON
    {
        "module": [
            {
                "name": "fs",
                "from": "#fs"
            }
        ]
    }
```

fs has 4 commands writeFile , readFile , writeDir , readDir.

- writeFile
    
writeFile - used to create files.

    fs writeFile [src] [data]; 

Sample:

    father fs true;
    fs writeFile ./text.txt text;

Will: a text.txt file will be created with text inside "text"

- readFile

readFile - used to read files

    fs readFile [src] [variable]; 

src - is the path to the readable file.

variable - this is where the result of reading the file will be savedю.

Sample:

    father fs true;
    fs readFile ./text.txt msg;
    printl (@msg);

Will: text

- writeDir
    
writeDir - used to create directory files.

    fs writeDir [src]; 

Sample:

       father fs true;
       fs writeDir ./text;

To be: the "text" directory will be created

- readDir

readDir - used to read directories

    fs readDir [src] [variable]; 

src - is the path to the readable file.

variable - the result of reading the file will be stored here.

sample:

       father fs true;
       fs readDir ./ msg;
       printl (@msg);

Will: [1.du, text.txt]

## Number

Number - allows you to manipulate numbers, but the main task is to convert a string to a number.

Import:
```JSON
    "module": [
        {
            "name": "Number",
            "from": "#Number"
        }
    ]
```

- transform

To convert a string to a number, use the following command:

   Number [var] [value]; 

var - The variable where the value will be stored.

value - The string to be converted.

## prompt

prompt - Used for console requests.

Import:
```JSON
    "module": [
        {
            "name": "prompt",
            "from": "#prompt"
        }
    ]
```

The prompt has two commands:

- line
    
Requests one line:

    prompt line [var] [text]; 

var - The variable where the value will be stored.

text - Output text.

- multiline

Used to request multiline text:

    prompt multiline [var] [end] [text]; 

var - The variable where the value will be stored.

text - Output text.

end - the value after which the request will end.

## random

random - Used to get a random integer or array element.

Import: 
```JSON
    "module": [
        {
            "name": "random",
            "from": "#random"
        }
    ]
```

There are two commands:

- Int

Used to get a random integer:

    random Int [var] [max]; 

var - The variable where the value will be stored.

max - Maximum number.

- from

Used to get a random element of an array:

    random from [array] [var];

var - The variable where the value will be stored.

array - An array from which we will receive an element.

## request

request - Used for requests by url.

Import:
```JSON
    "module": [
        {
            "name": "request",
            "from": "#request"
        }
    ]
```

So far there is one command:

- GET

Used for GET requests:

    request GET [var] [url];

var - The variable where the value will be stored.

url - The address for which the request will be made.

## Data Type

Additional data types are imported in the same way as modules but in the DataType block.

Sample:

```JSON
    "DataType":[
        {
            "name": "List",
            "from": "#List"
        }
    ]
```

Here we have imported the built-in data type "List", the # symbol is used to import the built-in data types, but in order to use the data type, you need to enable its import with the command:

    mother List true;

You can also disable imports:

    mother List false;

Now we can use the "List" data type in this way:

    approve msg = Int 1;
    approve newList = List [@msg,2,3];

When we try to display a newList, we will get an object:

```JSON
    {
        newList0: 1,
        newList1: 2,
        newList2: 3
    }
```

Creating a Data Type is no different from creating a module, but
if the interpreter calls the module if its name is at the 
beginning of the line, then the Data Type if its name is 
specified as a type when creating a variable and the Data Type
must always return something.

## Built-in data types

## List

List - improved array, with easier handling.

Import:

```JSON
    "DataType":[
        {
            "name": "List",
            "from": "#List"
        }
    ]
```

We can use the List data type like this:


    approve msg = Int 1;
    approve newList = List [@msg,2,3];

When we try to display a newList, we will get an object:

```JSON
    {
        newList0: 1,
        newList1: 2,
        newList2: 3
    }
```

To display a specific element, you need to add the index of the desired element to the name of the variable where the list was created, like this:

    printl (@newList0);

Will: 1

## regex-test

regex-test - Used to validate text through regular expressions.

Import: 
```JSON
    "DataType":[
        {
            "name": "regex",
            "from": "#regex-test"
        }
    ]
```

Sample:

    // approve [name] = regex [regex] [flags] [text];

    approve msg = regex /1/ gm 1212;
    printl (@msg);

Will: true

## new

new - is rather not a data type, but a constructor, it receives a processing function from the Global. 

To use "new" you need to register a handler function.

To register such a command, you can do it like this using the "Sample" example - this is a module that registers a processing command and also creates an object template for which it is then created.

Door.json:

```JSON
{
    "call": [
        "file.du"
    ],
    "dataType": [
        {
            "name": "new",
            "from": "#new"
        }
    ],
    "module": [
        {
            "name": "Sample",
            "from": "#Sample"
        }
    ]
}
```
file.du:

    // Allow import new and Sample;
    mother new true;
    father Sample true;
    // Registering a processing command;
    Sample;
    // Create a new Sample;
    Sample test (a, b, c);

    approve msg = new Sample test 1 2 3;

Let's create our own handler function for "new" which will return true if there is a value of 1 and if 0 then losh:

newFunction.js:

```javascript
odule.exports = (body, mainpath, door, variable, comment, declare, modul, global, tool) => {
    const { Variable, Formation } = require(tool);
    var data = body.split(" ");

    if (typeof global.newFunction == "undefined") {
        global.newFunction = {
            new: (data) => {
                let bod = data.split(" ");

                if(bod[0]=="1"){
                    return true;
                } else {
                    return false;
                }
            }
        };
    };
}
```

We check if there is a newFunction block in the Global object, if not, then we register it, then we split the data by spaces and look at what bod[0] is equal to and then return the desired value.

Door.json:

```JSON
{
    "call": [
        "file.du"
    ],
    "dataType": [
        {
            "name": "new",
            "from": "#new"
        }
    ],
    "module": [
        {
            "name": "newF",
            "from": "./newFunction.js"
        }
    ]
}
```

file.du:

    mother new true;
    father newF true;

    newF;

    approve msg = new newF 1;

Will: true

## Groups

Groups are a shorter possibility of import permission and not only, there are four groups in total: sister, brother, family, variable.

- sister

sister - used to allow import of data types.

An example of creating and running a group.

Door.json:

```JSON
{
    "call": [
        "file.du"
    ],
    "dataType": [
        {
            "name": "List",
            "from": "#List"
        },
        {
            "name": "new",
            "from": "#new"
        }
    ],
    "sister": [
        {
            "name": "newList",
            "member": [
                "new", "List"
            ]
        }
    ]
}
```

When entering members, each of the members should already be imported, in the name field you need to specify the name of the group, now you need to start the group with the sister command:

file.du:

    sister newList true;

    approve msg = List [1,2,3];

    printl (@msg);

Will: ```{
        msg0: 1,
        msg1: 2,
        msg2: 3
    }```

- brother - used to allow import of module.

An example of creating and running a group.

Door.json:

```JSON
{
    "call": [
        "file.du"
    ],
    "module": [
        {
            "name": "random",
            "from": "#random"
        },
        {
            "name": "prompt",
            "from": "#prompt"
        }
    ],
    "brother": [
        {
            "name": "randomPrompt",
            "member": [
                "random", "prompt"
            ]
        }
    ]
}
```

When entering members, each of the members should already be imported, in the name field you need to specify the name of the group, now you need to start the group with the brother command:

file.du:

    brother randomPrompt true;

    random Int msg 5;

    printl (@msg);

Will: 0-5

- family

family - used to allow import of module and data types.

An example of creating and running a group.

Door.json:

```JSON
{
    "call": [
        "file.du"
    ],
    "module": [
        {
            "name": "random",
            "from": "#random"
        },
        {
            "name": "prompt",
            "from": "#prompt"
        }
    ],
    "dataType": [
        {
            "name": "List",
            "from": "#List"
        },
        {
            "name": "new",
            "from": "#new"
        }
    ],
    "family":[
        {
            "name": "randomList",
            "member":[
                {
                    "type": "module",
                    "name": "random"
                },
                {
                    "type": "module",
                    "name": "prompt"
                },
                {
                    "type": "data",
                    "name": "List"
                },
                {
                    "type": "data",
                    "name": "new"
                }
            ]
        }
    ]
}
```

When entering members from each group should already be imported, in the name field you need to specify the name of the group, and in the type field the name of the member type if this is a module then the type name will be "module", if the data type is "data" now you need to use the family command:

file.du:

    family randomList true;

    random Int m 5;
    random Int s 5;
    random Int g 5;

    approve msg = List [@m, @s, @g];
    printl (@msg);

Will: ```{
        msg0: 0-5,
        msg1: 0-5,
        msg2: 0-5
    }```

- variable

variable - this group can be used to designate variables in advance.

An example of creating and running a group.

Door.json:

```JSON
{
    "call": [
        "file.du"
    ],
    "variable": [
        {
            "name": "msg",
            "value": "Hello"
        }
    ]
}
```

file.du: 

    printl (@msg);

Will: 

We can't do anything with this variable since it's not in the variable object but in the global to move them there is a built-in watchGloballyVar module.

Door.json:

```JSON
{
    "call": [
        "file.du"
    ],
    "module":[
        {
            "name": "wGVar",
            "from": "#watchGloballyVar"
        }
    ]
    "variable": [
        {
            "name": "msg",
            "value": "Hello"
        }
    ]
}
```

The watchGloballyVar module has one command:

    wGVar get all;
    // Translates all variables;
    mGVar get [msg];
    // Translate a specific variable

file.du: 

    father wGVar true;
    wGVar get msg;
    printl (@msg);

Will: Hello
# DuScript

This language was created as an experiment, it is made of shit and sticks, and it is also interpreted in JavaScript.

It works similar to YoptaScript , although they only have a similar connection method and the fact that they are interpreted in JavaScript.

[:GitHub](https://github.com/Pinbib/DuScript)

[:npm](https://www.npmjs.com/package/duscript)

# <span style="color: red;">!</span>

## If in JavaScript, when entering several elements of the enumeration, the "," character is used, while in duScript it is done with a space.

## Also the use of the character " can lead to incorrect output or in the worst case to an error, use '

# Connection

```<script type="text/duScript">[body]</script>```

```<script src="path/to/duScript.js"></script>```

Then write the code in the first script tag

# Syntax

## Creating variables

The creation of variables goes through the "approve" command.
(The end of the line occurs through the character ";" in the last line it is not required to put it)

```approve [name] = [value];```

Creating an empty variable

```approve [name];```

The creation of an array passes through the command: 

```approve [name] = Array value;```

The symbol [ and ] also, when listing the values of an array, the symbol "," is not required.

Creating a json object is exactly the same as creating an array, only JSON is used instead of the Array keyword.
 Example: 
 
 ``` 
 approve msg = JSON {"a": 1};
 approve msg = JSON {
  "a": 1
 };
 ```
 
  But using the character ";" may result in an error.

## Changing the value of a variable

Changing the value of a variable occurs through the "Edit" command.

```Edit [variable] = [new value];```

## The output of the variable

The output of the variable is passed through the "call" command.

```call [variable];```

Command ```call msg;``` will output ```value msg```, and command ```call msg msg1;``` will output

 ```value msg```
 
```value msg```

The array output is passed through the command:

``` call [array] [index ] ```

When displaying an array through "call", you can only enter one value and the value of the index is mandatory, otherwise it will be displayed undefined.
The symbol [ and ] is not required.

## Mathematical operations

For mathematical operations it is required to create an empty variable and then perform changes to the value by "Math expression;".

```
approve msg;
Edit msg = Math 2+2
```

Variable msg will have the value 4

#Output 

## get all

 If "call" can only fetch one element, then "get all" fetches everything at once. Example:

 ``` approve msg = JSON {"a": 1}; ```

 ```get all msg```

 Output:

 ```{"a": 1}```

  ``` approve msg = Array 1 2 3 4 5; ```

 ```get all msg```

 Output:

 ```[1, 2, 3, 4, 5]```

## printl

The "printl()" command prints everything inside the quotes from numbers to strings to variables with text and numbers.

If you want to display several elements, then this is done through a space.
# Conditions 

## If(){}

  Checks the condition inside the parentheses, if it is true, then it executes everything that is written inside the curly brackets.  
  
  Line ending inside curly braces is done with ":" character.

# Comment

 It is possible to create comments in three ways "//", "rem:", "::" note that they are followed by a space.

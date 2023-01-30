#DuScript

This language was created as an experiment, it is made of shit and sticks, and it is also interpreted in JavaScript.

It works similar to YoptaScript , although they only have a similar connection method and the fact that they are interpreted in JavaScript.

#!

##If in JavaScript, when entering several elements of the enumeration, the "," character is used, while in duScript it is done with a space.
##Also the use of the character " can lead to incorrect output or in the worst case to an error, use '

#Connection

```<script language="text/duScript">[body]</script><script src="path/to/duScript.js"></script>```

Then write the code in the first script tag

#Syntax

##Creating variables

The creation of variables goes through the "approve" command.
(The end of the line occurs through the character ";" in the last line it is not required to put it)

```approve [name] = [value];```

Creating an empty variable

```approve [name];```

##Changing the value of a variable

Changing the value of a variable occurs through the "Edit" command.

```Edit [variable] = [new value];```

##The output of the variable

The output of the variable is passed through the "call" command.

```call [variable];```

Command ```call msg;``` will output ```value msg```, and command ```call msg msg1;``` will output

 ```value msg```
 
```value msg```

##Mathematical operations

For mathematical operations it is required to create an empty variable and then perform changes to the value by "Math expression;".

```
approve msg;
Edit msg = Math 2+2
```

Variable msg will have the value 4

#Output 

##println()

```printl(msg msg1 'Hello World' 432);```


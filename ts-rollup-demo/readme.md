环境搭建
安装ts
```js
npm i -g typescript
//初始化工程
mkdir ts-demo
npm init -y 
```
安装rollup
```js
npm i -g rollup
npm i rollup -D
```
添加rollup.config.js
```js
touch rollup.config.js 
npm i rollup-plugin-json -D
npm i rollup-plugin-typescript typescript tslib  -D

import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript';

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/app.js',
    format: 'cjs'
  },
  plugins: [ typescript() ]
};
```
package.json
```json
{
  "name": "ts-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev-build": "rollup -c",
    "dev": "npm run dev-build && node ./dist/app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "rollup": "^1.27.5",
    "rollup-plugin-json": "^4.0.0",
    "rollup-plugin-typescript": "^1.0.1",
    "tslib": "^1.10.0",
    "typescript": "^3.7.2"
  }
}
```
main.ts
```ts
// src/main.ts
function greeter(person: string):string {
    return "Hello, "   person;
}

const user = "Jane User,this is js hello from ts";

document.body.textContent = greeter(user);
```
index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    
</head>
<body>
    
    <script src="./app.js"></script>

</body>
</html>
```
打开index.html, 界面出现Hello, Jane User,this is js hello from ts ,恭喜你，你已经typescript入门了！！！

typescript配置文件
typescript支持两种配置文件：

tsconfig.json
xxx.json，其中包含其需要的配置项
下方将侧重介绍tsconfig.json
tsconfig.json常用配置
```json
{
   "files": [  # 指定需要编译文件，相对配置文件所在
        "core.ts",
        "sys.ts",
        "types.ts",
        "scanner.ts",
        "parser.ts",
        "utilities.ts",
        "binder.ts",
        "checker.ts",
        "emitter.ts",
        "program.ts",
        "commandLineParser.ts",
        "tsc.ts",
        "diagnosticInformationMap.generated.ts"
    ],
    "exclude": [ # 指定不需要编译文件
        "node_modules",
        "**/*.spec.ts"
    ],
    "include": [ # 指定需要编译文件; 不配置files,include，默认除了exclude的所有.ts,.d.ts,.tsx
        "src/**/*"
    ],
    # 指定基础配置文件路径 大部分配置 compilerOptions, files, include, and exclude。切忌循环引用。
    "extends": "./configs/base",
    "compilerOptions": {   # 告知TypeScript 编译器怎么编译
        "baseUrl": "./",
        "paths": {   # 相对于baseUrl配置 
            "jquery": ["node_modules/jquery/dist/jquery"] ,
             "*": [
                    "*",
                    "generated/*"
             ]
        },
        "rootDirs":[ # 根（root）文件夹列表，表示运行时组合工程结构的内容。
                "src/views",
                "generated/templates/views"
        ],
        "module": "commonjs",
        "noImplicitAny": true, # 在表达式和声明上有隐含的 any类型时报错。
        "removeComments": true, # 移除代码注解 
        "preserveConstEnums": true, # 保留 const和 enum声明。
        "sourceMap": true, # 生成相应的 .map文件。
        "types": [],  # 要包含的类型声明文件名列表。
        "noResolve":true , # 不会自动导入import 依赖, 编译会报错
        "downlevelIteration":true, # 进行js 语法降级 for..of 
        "module": "esnext",
       "moduleResolution": "node",
        "strictNullChecks": true,  # 开启null，检测
        "target":"ES5",
        "strictBindCallApply":true,
        "skipLibCheck":true, # 忽略所有的声明文件（ *.d.ts）的类型检查。
    },
    # 以上属性，为常用配置属性
    "compileOnSave": false, # 整个工程而言，需要编译器支持，譬如Visual Studio 2015 with TypeScript 1.8.4 
    "typeAcquisition":{   # 整个工程的类型定义.d.ts
            "enable":false,  # 默认值 false 
            "include" : ["jquery", "lodash"] 
            "exclue"：["jquery", "lodash" ]
    },
   "references":[{ # 引用的工程 
       path: 'xxxx'
     }]  
}
```
其中，

1. 相对路径，都是相对配置文件所在路径
2. 优先级：命令行配置 > files > exclude > include 。
3. exclude默认为：nodemodules, bowercomponents, jspm_packages and outDir配置项
4. A.ts 引用B.ts ; A.ts在files 或者include中，B.ts也会被默认导入。
5. 一个路径或者一个文件，在include与exclude之间是互斥的。
6. typeRoots与@types互斥，types、@types也可以互斥。
移除代码中注释
```json
{
    "files": [
        "src/main.ts"
    ],
    "compilerOptions": {
       "removeComments": true,
    }
}
```
```ts
// main.ts
//add the person type
interface Person{
    firstName: string;
    lastName: string;
}
class Student{
    firstName: string;
    lastName: string;
    constructor(firstName:string , lastName: string){
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
// add the greeter 
function greeter(person: Person):string {
    return `Hello,${person.firstName}:${person.lastName}`
}
//new a student
const user = new Student('xiaoming','hello');

document.body.textContent = greeter(user);

//编译后
'use strict';

var Student = (function () {
    function Student(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello,"   person.firstName   ":"   person.lastName;
}
var user = new Student('xiaoming', 'hello');
document.body.textContent = greeter(user);
```
开启null、undefined检测
```json
{
    "files": ["./src/main.ts"],
    "compilerOptions": {
        "removeComments": true,
        "declaration": true,
        "declarationDir": "./",
        "noResolve": false,
        "strictNullChecks": true
    },
}
```
```ts
const user ;
user = new Student('xiaoming','hello'); # 编译报错
```

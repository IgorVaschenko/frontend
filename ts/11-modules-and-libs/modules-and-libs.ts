//NAMESPACES & REFERENCE  
console.log('<<<NAMESPACES & REFERENCE>>>');

namespace A {
    export const a = 5

    export interface B {
        c: number
    }
}
//A.a
///<reference path="module/app1.ts"/>
//https://coursehunter.net/course/typescript-s-nulya-polnyy-kurs-i-patterny-proektirovaniya?lesson=97


//MODULES FOR BACKEND  ===> tsconfig ==> "module": "commonjs";  "outDir": "./build/"
console.log('<<<MODULES FOR BACKEND>>>');

import { AA } from './module/app1'
console.log(AA.a);
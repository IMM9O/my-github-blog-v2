---  
title: Top skills you need to master angular 👨‍💻
description: Master those topics to master angular framework
image: "../../img/laptop.jpg"
date: 2021-02-26
tags: ['angular', 'javascript', 'typescript', 'rxjs']
---

<center>

![Flatlay Display of Electronics next to Eyeglases](../../img/laptop.jpg)

<span><small>Photo by fauxels from Pexels</small></span>

</center>

Before going ahead, I assume you have a basic understanding of angular if not please check this [course](https://www.freecodecamp.org/news/want-to-learn-angular-heres-our-free-33-part-course-by-dan-wahlin-fc2ff27ab451/) from Dan Wahlin. 


# What is angular?

Angular is a front-end framework to build web applications that can be work across multiple platforms.

Angular has a steep learning curve composing a lot of software terms and that makes it harder for beginners but the good part is you don't have to know everything about those topics to get started because the angular team did a good job hiding much complexity away to make you focus on building rather than learning.  

In this article, I will show you from my experience what you have to learn to master angular.

## 1. Directives

Directives are one of the core features of Angular. They allow an Angular developer to write new, application-specific HTML syntax. In actual, directives are functions that are executed by the Angular compiler when the same finds them in the DOM.

There are three kinds of directives in Angular:

* Components—directives with a template.
* Structural directives—change the DOM layout by adding and removing DOM elements.
* Attribute directives—change the appearance or behavior of an element, component, or another directive.

Learning the difference between those kinds, how to use it properly and how to create a custom one 

## 2. Decorators 

> Decorators provide a way to add both annotations and a meta-programming syntax for class declarations and members. Decorators are a [stage 2 proposal](https://github.com/tc39/proposal-decorators) for JavaScript and are available as an experimental feature of TypeScript.

If you work with angular for awhile, you for sure noticed this wired syntax which is called decorators or annotations. Angular used it a lot internal and in your code, you can go deep and learn how to [build one from scratch](https://ultimatecourses.com/blog/angular-decorators) or learn what [angular provide](https://angular.io/api?type=decorator) 

Type of decorators in angular

* Class decorators, e.g. `@Component` and `@NgModule`
* Property decorators for properties inside classes, e.g. `@Input` and `@Output`
* Method decorators for methods inside classes, e.g. `@HostListener`
* Parameter decorators for parameters inside class constructors, e.g. `@Inject`

There are more than 15 decorators available in angular you can check them all here [Exploring the Various Decorators in Angular](https://netbasal.com/exploring-the-various-decorators-in-angular-b208875b207c).

## 3. Dependency injection

> Dependency injection, or DI, is a design pattern in which a class requests dependencies from external sources rather than creating them.
( [angular.io](angular.io) )

This one of the core features in angular learning how to create it and how to provide it, you can inject anything starting from [objects](https://angular.io/guide/dependency-injection-providers#injecting-a-configuration-object), [functions](https://angular.io/guide/dependency-injection-providers#using-factory-providers) to class.

## 4. Layout Composition

Layout Composition is a way to composing different blocks like component, directives, pipes, and service to solve the business need 

* [Advanced Component Patterns](https://gist.github.com/isaacplmann/0255c1f42ee6c1dad87586b1f6719023)
* [A Philosophy for Designing Components with Composition](https://www.youtube.com/watch?v=oHTm5LYkgEY) - Jeremy Elbourn | ng-conf

## 5. How change detection work in angular
 
Change detection is the mechanism designed to track changes in an application state and render the updated state on the screen. It ensures that the user interface always stays in sync with the internal state of the program.

Angular uses [ZoneJS](https://indepth.dev/posts/1059/do-you-still-think-that-ngzone-zone-js-is-required-for-change-detection-in-angular) to intercept events that occurred in the application and run a change detection cycle automatically.

For learning how change detections work and how to optimize it, read this article [Change detections rules in angular](https://dev.to/imm9o/rules-of-change-detections-in-angular-5hhm) which I wrote it before


## Honorable Mention

The previous mention topics earlier are the basic building blocks for any angular apps, but there are many topics not related to angular by itself so I will mention them here with good resources to learn it 😍

**1. Object-Oriented Programming**

It is one of the most popular programming paradigms in the software industry and it is basically a way to structure your app based on objects and the relations between them so it is called object-oriented. Learn object-oriented is a great way to succeed in the software industry and a great bounce for mastering angular. [Mosh Hamedani](https://twitter.com/moshhamedani) did a good job explaining object-oriented programming with nice Illustrations (My Prefer way to learn) don't miss it out [Object-oriented Programming in 7 minutes](https://www.youtube.com/watch?v=pTB0EiLXUC8)

* [JavaScript OOP Crash Course (ES5 & ES6)](https://www.youtube.com/watch?v=vDJpGenyHaA) - Traversy Media
* [Object Oriented vs Functional Programming with TypeScript](https://www.youtube.com/watch?v=fsVL_xrYO0w)

![Principles of Object-Oriented Programming](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ikwbv5dwaops3bunngs1.png)

**2. Typescript**

Typescript by far is [the most adopted technology](https://2020.stateofjs.com/en-US/awards/) in web development it helps you make your code type-safe and future proof. First, you need to know that typescript isn't a completely different programming language actually, it is called javascript superset language because every valid javascript syntax is also valid in typescript and you can check [their goals](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Design-Goals) for more details especially points 6,7 and 8. Second, javascript has types but it is [a loosely typed language](https://flaviocopes.com/loosely-strongly-typed/) it means that when you declare a variable as a string you can change it later to the number, and the javascript engine will not complain so using typescript to make our code strongly typed to prevent and catch those errors earlier, Finally typescript is a compiler whiches is used to convert your code to normal javascrpt without types and on top of that angular build custom compiler called [ngtsc](https://indepth.dev/posts/1242/an-in-depth-overview-of-angular-compilers) It is a typescript compiler with a set of Angular transforms.  

* [Typescrpt offical docs](https://www.typescriptlang.org/docs/)
* [TypeScript Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gUgr39Q_yD6v-bSyMwKPUI) - The net ninja
* [Dynamic Static Typing In TypeScript](https://www.smashingmagazine.com/2021/01/dynamic-static-typing-typescript/)
* [10 Insights from Adopting TypeScript at Scale](https://www.techatbloomberg.com/blog/10-insights-adopting-typescript-at-scale/)
* [Deep Dive into the Angular Compiler](https://www.youtube.com/watch?v=anphffaCZrQ) - Alex Rickabaugh | AngularConnect


![strong, weak, static and dynamic type](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9ctqwkmxnzaot2ltgqy1.png)
 
**3. Rxjs**

> ReactiveX: Reactive programming combines the [Observer pattern](https://en.wikipedia.org/wiki/Observer_pattern) with the [Iterator pattern](https://en.wikipedia.org/wiki/Iterator_pattern) and [functional programming with collections](https://martinfowler.com/articles/collection-pipeline/#NestedOperatorExpressions) to fill the need for an ideal way of managing sequences of events. ([rxjs-dev](https://rxjs-dev))

RxJS = Observables + Operators + Schedulers + Observer + Subscription those are the main building blocks in rxjs to achive reactive programming paradigms which are based on events or what we call event-driven. First, differentiate between [cold and hot observables](https://luukgruijs.medium.com/understanding-hot-vs-cold-observables-62d04cf92e03), Second differentiate between [Subject](https://luukgruijs.medium.com/understanding-rxjs-subjects-339428a1815b), [BehaviorSubject](https://luukgruijs.medium.com/understanding-rxjs-behaviorsubject-replaysubject-and-asyncsubject-8cc061f1cfc0), [ReplaySubject](https://luukgruijs.medium.com/understanding-rxjs-behaviorsubject-replaysubject-and-asyncsubject-8cc061f1cfc0), and [AsyncSubject](https://luukgruijs.medium.com/understanding-rxjs-behaviorsubject-replaysubject-and-asyncsubject-8cc061f1cfc0), Finaly, learn the oberators esbacailly the most common used.

* [RxJS: Observables, Observers and Operators Introduction](https://ultimatecourses.com/blog/rxjs-observables-observers-operators)
* [RxJS Quick Start with Practical Examples](https://www.youtube.com/watch?v=2LCo926NFLI) - Fireship
* [Top 7 RxJS Concepts for Angular Developers](https://www.youtube.com/watch?v=65Us8NwmYf4) - Fireship
* [RxJS Top Ten - Code This, Not That](https://www.youtube.com/watch?v=ewcoEYS85Co)
* [Why Should You Care About RxJS Higher-order Mapping Operators?](https://www.youtube.com/watch?v=ldRdjc-60PM) - Deborah Kurata | ng-conf

![Event Driven Architecture](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/spuuqochw6jfa6q9dj3e.png)

## Conclusion

Learning those topics will make you fluent in angular and make you more productive with a lot of confidence. 



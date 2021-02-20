---
title: 'Change detection rules in angular'
description: 'What makes angular running change detection and how to optimize it'
image: https://images.unsplash.com/reserve/81gZijLSWfge41LgzqQ6_Moving%20Parts.JPG?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80
tags: ['angular', 'javascript']
date: 2021-01-03
---

<center>

![alt](https://images.unsplash.com/reserve/81gZijLSWfge41LgzqQ6_Moving%20Parts.JPG?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80)
<span><small>Photo by <a href="https://unsplash.com/@chesteralvarez?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Chester Alvarez</a> on <a href="https://unsplash.com/s/photos/gear?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></small></span>

</center>

> What makes angular running change detection and how to optimize it

## What is change detection?

Change detection is the mechanism designed to track changes in an application state and render the updated state on the screen. It ensures that the user interface always stays in sync with the internal state of the program.

## How change detections work in angular?

Angular uses [ZoneJS](https://indepth.dev/posts/1059/do-you-still-think-that-ngzone-zone-js-is-required-for-change-detection-in-angular) to intercept events that occurred in the application and run a change detection cycle automatically.

We can reduce events that angular intercept by changing `ChangeDetectionStrategy` in component decorator to `ChangeDetectionStrategy.OnPush`

ChangeDetectionStrategy.OnPush tells Angular that the component only depends on its @inputs() ( aka pure ) and needs to be checked only in the following cases:

1️⃣ The Input reference changes.
2️⃣ An event originated from the component or one of its children. ( The rule applies only to DOM events)
3️⃣ We run change detection explicitly.
4️⃣ Observable emits a new value inside the component template. 

## How to optimize running of change detection

* Always use `OnPush` Change Detection Strategy.
* Always use [immutable](https://medium.com/javascript-in-plain-english/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089) data because once you set component to `OnPush` strategy angular will use [shallow](https://javascript.info/object-copy) comparison to detect change and perform the reRender task.
* Prevent unnecessary emits in observables inside component.
* Prevent triggers unnecessary async task like scrolling using technics like [Debounce](https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086) or [Throttle](https://levelup.gitconnected.com/throttle-in-javascript-improve-your-applications-performance-984a4e020a3f). 
* Reduce the amount of [long tasks](https://web.dev/optimize-fid/) by moving it to [Web Workers](https://blog.bitsrc.io/angular-performance-web-workers-df382c4d3919).
* Use [runOutsideAngular](https://medium.com/@krzysztof.grzybek89/how-runoutsideangular-might-reduce-change-detection-calls-in-your-app-6b4dab6e374d) when starting a work consisting of one or more asynchronous tasks that don't require UI.


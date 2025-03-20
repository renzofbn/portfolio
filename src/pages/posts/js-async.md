---

layout: ../../layouts/MarkdownPostLayout.astro  
title: 'Asynchronous in JavaScript'  
pubDate: 2025-03-01  
description: 'An overview of asynchronous programming in JavaScript, including callbacks, promises, and async/await.'  
author: 'renzofbn'  
tags: ["Javascript", "Theory"]  
tableOfContents: true  
---

## async

### Content

Asynchrony refers to the ability to execute tasks in a non-blocking manner, meaning the program can continue with other operations while waiting for a task to complete. In the context of JavaScript (JS), asynchrony is particularly important due to its event-driven execution environment, such as a web browser.

In JS, asynchrony is achieved using callbacks, promises, and, more recently, the async/await syntax introduced in ECMAScript 2017.

---

## Callbacks

Callbacks are functions passed as arguments to other functions and are invoked after an asynchronous operation is completed. For example:

```jsx
function fetchData(callback) {
  setTimeout(() => {
    const data = "Data retrieved";
    callback(data);
  }, 2000);
}

// Usage example
fetchData((data) => {
  console.log(data); // Prints "Data retrieved"
});
```

>[!TIP]
> Callbacks can lead to a deeply nested structure known as **callback hell** when multiple asynchronous operations are chained.

>[!TIP]
> Proper error handling is required since callbacks do not automatically handle errors like promises do.

---

## Promises

Promises are objects representing a future value that may or may not become available. They allow for chaining asynchronous operations in a more readable way and handling both success and failure cases.

A promise is created using the `Promise` constructor, which takes a callback function with two arguments: `resolve` and `reject`.  

- `resolve` is used to indicate that the operation was successful.
- `reject` is used to indicate an error or failure in the operation.

```jsx
const myPromise = new Promise((resolve, reject) => {
  const response = true;
  if (response) {
    resolve("Data found");
  } else {
    reject("No data found");
  }
});
```

>[!TIP]
> Both `resolve()` and `reject()` are callbacks that are later handled by `then()` or `catch()`.

Promises allow multiple asynchronous operations to be chained in a more structured and readable way using the `then()` and `catch()` methods.

- `then()` is used to handle the success case.
- `catch()` is used to handle errors and clean up if necessary.
- `finally()` executes regardless of the promise’s outcome.

```jsx
// Using myPromise
myPromise
  .then(data => {
    console.log("Response:", data);
  })
  .catch(error => {
    console.error("Error:", error);
  })
  .finally(() => {
    console.log("Task completed regardless of the result");
  });
```

>[!TIP]
> The only way to access `then()` is by resolving the promise with `resolve()`. If any error occurs, the execution jumps to `catch()`, whether `reject()` was used or not.

The `.then()` method takes up to two arguments, both being callback functions for handling success or failure cases. Each `.then()` returns a newly created promise object, which can be used for chaining:

```jsx
myPromise
  .then(handleResolvedA, handleRejectedA)
  .then(handleResolvedB, handleRejectedB)
  .then(handleResolvedC, handleRejectedC);
```

>[!TIP]
> A `.catch()` is essentially just a `.then()` without an argument slot for a success callback function.

If an error occurs inside a promise, it can be handled within `then()`:

```jsx
myPromise
  .then(value => { return 'Msg:', value }, err => { return 'Recovering...' })
  .then(value => { console.log(value) });
// Output: 
// Msg: value
// Recovering...
```

Regardless of the promise's result, execution reaches the last `then()`.

>[!TIP]
> If an error occurs in either function of a `then()`, it moves to the second function in the next `then()`. If everything goes well, it moves to the first function, regardless of previous errors.

>[!TIP]
> If an error occurs and the next `then()` does not have an error-handling function or if there is no `catch()`, execution will stop.

---

## async, await

The `async` and `await` keywords simplify writing and managing asynchronous JavaScript code. They allow working with promises in a more synchronous-like manner, improving code readability and structure.

The `async` keyword declares an asynchronous function. Inside an `async` function, the `await` keyword can be used to pause execution until a promise resolves.

```jsx
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

>[!TIP]
> Inside an `async` function, you can handle multiple asynchronous functions at once, as long as they start with `await`.

>[!TIP]
> It is important to use `try...catch` blocks to handle exceptions that may occur in asynchronous operations.

>[!TIP]
> `async` functions always return a promise, meaning they can be handled like any other promise.

```jsx
async function asyncFunction() {
  return "Hello, I am an async function";
}

asyncFunction()
  .then(result => {
    console.log(result);
  });
```

---

## References

[Promise.resolve() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)  

[async function expression - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function)  

[await - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)  



## Understanding Asynchronous JavaScript

### What is Asynchrony?

Asynchronous programming allows JavaScript to execute tasks in a non-blocking manner. This means that the program can continue executing other tasks while waiting for an operation (such as a network request or a file read operation) to complete.

JavaScript, being single-threaded, uses an event-driven, non-blocking model to handle asynchronous operations efficiently. Asynchronous code execution is essential for:

- Fetching data from APIs.
- Handling user interactions.
- Executing time-based operations.
- Running tasks without freezing the UI in web applications.

JavaScript provides multiple ways to work with asynchrony:

1. **Callbacks** (older approach).
2. **Promises** (modern and structured way).
3. **Async/Await** (syntactic sugar over Promises for better readability).

---

## Callbacks: The First Approach to Asynchrony

A **callback function** is a function passed as an argument to another function, which is executed after an asynchronous operation completes.

### Example: Using a Callback in a Simulated API Request

```jsx
function fetchData(callback) {
  setTimeout(() => {
    const data = "Data retrieved";
    callback(data);
  }, 2000);
}

fetchData((data) => {
  console.log(data); // Prints "Data retrieved" after 2 seconds
});
```

### Callback Hell: A Common Problem

When multiple asynchronous operations rely on each other, nested callbacks can create complex and unreadable code, known as **callback hell**.

```jsx
function step1(callback) {
  setTimeout(() => {
    console.log("Step 1 completed");
    callback();
  }, 1000);
}

function step2(callback) {
  setTimeout(() => {
    console.log("Step 2 completed");
    callback();
  }, 1000);
}

function step3(callback) {
  setTimeout(() => {
    console.log("Step 3 completed");
    callback();
  }, 1000);
}

step1(() => {
  step2(() => {
    step3(() => {
      console.log("All steps completed");
    });
  });
});
```

This deeply nested structure is hard to manage and debug. Promises were introduced to solve this problem.

---

## Promises: A Better Way to Handle Asynchrony

A **promise** represents a value that may be available now, in the future, or never. A promise has three possible states:

- **Pending**: The initial state, before the operation completes.
- **Fulfilled**: The operation completed successfully.
- **Rejected**: The operation failed.

### Creating and Using a Promise

```jsx
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("Data fetched successfully");
    } else {
      reject("Error fetching data");
    }
  }, 2000);
});

myPromise
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log("Operation completed");
  });
```

### Chaining Promises

Promises can be **chained** to execute multiple asynchronous operations sequentially.

```jsx
function step1() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Step 1 completed");
      resolve();
    }, 1000);
  });
}

function step2() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Step 2 completed");
      resolve();
    }, 1000);
  });
}

function step3() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Step 3 completed");
      resolve();
    }, 1000);
  });
}

step1()
  .then(step2)
  .then(step3)
  .then(() => {
    console.log("All steps completed");
  });
```

This structure is much more readable than nested callbacks.

---

## Async/Await: Writing Cleaner Asynchronous Code

The **async/await** syntax, introduced in ES2017, makes working with promises more intuitive and readable.

### Declaring an Async Function

An `async` function always returns a promise. The `await` keyword pauses execution until the promise resolves.

```jsx
async function fetchData() {
  return "Data retrieved";
}

fetchData().then(data => console.log(data));
```

### Using Async/Await with Try-Catch

The `try...catch` block handles errors in async functions.

```jsx
async function fetchData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();
```

### Running Multiple Async Operations in Parallel

Use `Promise.all()` to execute multiple asynchronous operations concurrently.

```jsx
async function fetchMultiple() {
  try {
    const [data1, data2] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/todos/1").then(res => res.json()),
      fetch("https://jsonplaceholder.typicode.com/todos/2").then(res => res.json())
    ]);
    console.log("Data 1:", data1);
    console.log("Data 2:", data2);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchMultiple();
```

---

## Conclusion

- **Callbacks** were the first approach but led to nested, unreadable code.
- **Promises** introduced structured error handling and chaining.
- **Async/Await** provided a cleaner, synchronous-like way to handle asynchronous operations.

Understanding these techniques is essential for writing efficient JavaScript applications, especially for web development, API interactions, and modern frameworks.

---

## References

<div class="references-wrapper">
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank" rel="noopener">
    <div class="reference-card">
    <span class="text-xs md:text-sm text-gray-500 font-bold">developer.mozilla.org</span>
      <h5 class="hover:drop-shadow-[0px_0px_10px_#FF6467]">MDN Web Docs: Promises</h5>
      <p>Learn about JavaScript promises and how to use them effectively.</p>
    </div>
  </a>
  <a href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises" target="_blank" rel="noopener">
    <div class="reference-card">
      <span class="text-xs md:text-sm text-gray-500 font-bold">
        developer.mozilla.org
      </span>
      <h5 class="hover:drop-shadow-[0px_0px_10px_#FF6467]">MDN Web Docs: Async/Await</h5>
      <p>Learn about JavaScript promises and how to use them effectively.</p>
    </div>
  </a>
  <a href="https://javascript.info/async" target="_blank" rel="noopener">
    <div class="reference-card">
      <span class="text-xs md:text-sm text-gray-500 font-bold">
        javascript.info
      </span>
      <h5 class="hover:drop-shadow-[0px_0px_10px_#FF6467]">JavaScript.info: Async JavaScript</h5>
      <p>Learn about JavaScript promises and how to use them effectively.</p>
    </div>
  </a>
</div>

---

layout: ../../layouts/MarkdownPostLayout.astro  
title: 'Asynchronous in JavaScript'  
pubDate: 2025-03-01  
description: 'An overview of asynchronous programming in JavaScript, including callbacks, promises, and async/await.'  
author: 'renzofbn'  
tags: ["Javascript", "Theory"]  
tableOfContents: true  
---

Asynchronous programming allows JavaScript to execute tasks in a non-blocking manner.

This means that the program **can continue executing other tasks while waiting for an operation** (such as a network request or a file read operation) to complete.

<img src="/imgs/synchronous-vs-asynchronous-javascript.webp" alt="synchronous-vs-asynchronous-javascript" />
<p><i>Taken from: <a href="https://medium.com/@vivianyim/synchronous-vs-asynchronous-javascript-de4918e8ad62" target="_blank">Medium</a></i></p>

Asynchronous programming is essential for doing tasks that take time, such as:

- Fetching data from APIs.
- Handling user interactions.
- Executing time-based operations.
- Running tasks without freezing the UI in web applications.

That's why JavaScript provides multiple ways to work with asynchrony:

1. **Callbacks**
2. **Promises**
3. **Async/Await**

---

## Callbacks
>[!WARNING]
> Callbacks are the first approach to handle asynchrony in JavaScript. However, they can lead to nested callbacks, making the code hard to read and maintain.

A **callback function** is a function passed as an argument to another function, which is executed after an asynchronous operation completes.

```jsx
// Example: Using a Callback in a Simulated API Request
function fetchData(callback) {
  setTimeout(() => {
    const data = "Data retrieved";
    callback(data);
  }, 2000);
}

fetchData((data) => {
  console.log(data); 
  // Output: "Data retrieved"
  // after 2 seconds
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

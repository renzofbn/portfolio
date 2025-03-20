---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Decorators in Python'
pubDate: 2025-03-01
description: 'A brief introduction to decorators in Python, and how they work.'
author: 'renzofbn'
tags: ["Python", "Theory"]
tableOfContents: true
---

**Decorators** in Python are a powerful and elegant way to modify or extend the behavior of a function or class without altering its original implementation. They work by wrapping a function or class with another function that adds additional functionality before or after execution.  

To understand how decorators work, we first need to grasp the concept of **closures**.  

## **Closures in Python**  

A function that retains references to local variables in its definition environment, even after the function has finished executing. This means that the function can access and remember the values of those variables even when they no longer exist in memory. The concept of closures is based on Python's ability to treat functions as first-class objects, allowing functions to be assigned to variables, passed as arguments, and returned as values.  

```python
def make_multiplier_of(n):
    def multiplier(x):
        return x * n
    return multiplier

times5 = make_multiplier_of(5)

print(times5(3))
# Output: 15
```  

The `make_multiplier_of` function takes a number `n` as an argument and returns the inner function `multiplier`, which remembers the value of `n` even after `make_multiplier_of` has been deleted. This allows calculations with the initial variable `n` and enables it to receive additional values `y`.  

> [!TIP]  
> Remember that the main function must always return the nested function.  

> [!TIP]  
> Closures are useful when you want functions that "remember" certain values or specific states at a given moment.  

```python
def counter():
    count = 0
    def increment():
        nonlocal count
        count += 1
        print(f"Counter: {count}")
    return increment

counter1 = counter()
counter1()  # Output: Counter: 1
counter1()  # Output: Counter: 2

counter2 = counter()
counter2()  # Output: Counter: 1
```  

## **Decorators**  

Decorators take advantage of closures to wrap functions or classes and modify their behavior by adding additional functionality before or after their execution without modifying their original implementation.  

By placing a decorator above a function or class, the decorator function runs before the decorated function or class. The decorator can perform additional actions, modify arguments or the result, and then call the original function or class.  

> [!TIP]  
> A decorator is a function that takes another function as a parameter, adds functionality, and returns a different function.  

```python
def decorator(func):
    def wrapper(name):
        print(f'Hello {name} from the decorator')
        func(name)
        print("The function has been executed")
    return wrapper
```  

> [!TIP]  
> The first function always receives the function to be decorated, the second one receives the arguments that the decorated function can take, and inside it, you can perform calculations before or after executing it. Then, the first function returns the second function.  

There are two ways to apply this decorator: without using `@`  

```python
# Without using @
def say_goodbye(name):
    print(f"Goodbye {name}")

say_goodbye = decorator(say_goodbye)
say_goodbye("Renzo")
```  

Or using `@` above the function to be decorated  

```python
@decorator
def greet(name):
    print(f"Hello {name}")

greet("Renzo")
```  

## **Adding Arguments**  

To create a decorator that takes parameters, an additional function is used to wrap the main decorator. This function takes the parameters and returns the decorator.  

```python
def decorator_with_parameters(param1, param2):
    def decorator(func):
        def wrapper(*args, **kwargs):
            # Additional actions using the parameters
            print(f"Parameters {param1} - {param2}")
            return func(*args, **kwargs)
        return wrapper
    return decorator
```  

It can be used as follows:  

```python
@decorator_with_parameters("Hello", 10)
def greet(name):
    print(f"Hello, {name}!")

greet("Juan")
```  


Learn how to use closures and decorators to make your code more modular and readable.

---

## What Is a Closure?

A **closure** is a function that remembers the environment in which it was created. Even if the outer function finishes execution, the inner function can still access the variables from that scope. This feature allows you to “remember” values across multiple function calls.



```python
def make_multiplier(n):
    def multiplier(x):
        return x * n  # n is remembered here
    return multiplier

times3 = make_multiplier(3)
print(times3(4))  # Output: 12
```



*Explanation:*  
Here, `make_multiplier` returns the `multiplier` function. The inner function keeps the value of `n` (in this case, 3), so every time you call `times3`, it multiplies its argument by 3.

---

## What Are Decorators?

**Decorators** are a special type of function that modify or enhance another function's behavior without permanently changing it. They wrap a function and add extra steps before or after its execution. This is particularly useful for adding logging, timing, or access control.



```python
def friendly_decorator(func):
    def wrapper(name):
        print(f"Hi {name}! (from the decorator)")
        func(name)
        print("Function executed!")
    return wrapper
```



*Explanation:*  
The `friendly_decorator` takes a function as input, wraps it in another function (`wrapper`), and adds custom behavior. The wrapper can modify inputs, outputs, or even perform additional tasks around the original function call.

---

## Using Decorators

There are two common ways to apply a decorator: directly or using the `@` syntax.

### Without @ Syntax

You can manually wrap your function by assigning it to the result of the decorator.



```python
def say_goodbye(name):
    print(f"Goodbye, {name}!")

say_goodbye = friendly_decorator(say_goodbye)
say_goodbye("Alice")
```



*Explanation:*  
Here, `say_goodbye` is wrapped by `friendly_decorator`, so when called, it shows the extra messages defined in the wrapper.

### With @ Syntax

The `@` symbol provides a cleaner and more readable way to apply a decorator.



```python
@friendly_decorator
def greet(name):
    print(f"Hello, {name}!")

greet("Bob")
```



*Explanation:*  
The `@friendly_decorator` syntax automatically wraps `greet` with the decorator, making your code easier to follow.

---

## Decorators with Parameters

Sometimes you need a decorator to accept its own arguments. To do this, create an extra outer function that takes these parameters and returns the actual decorator.



```python
def decorator_with_params(param1, param2):
    def decorator(func):
        def wrapper(*args, **kwargs):
            print(f"Using parameters: {param1} and {param2}")
            return func(*args, **kwargs)
        return wrapper
    return decorator

@decorator_with_params("Welcome", 42)
def greet_person(name):
    print(f"Hello, {name}!")

greet_person("Charlie")
```



*Explanation:*  
The outer function `decorator_with_params` accepts parameters and then returns the real decorator. This real decorator wraps the target function, allowing you to use extra information (like custom messages or settings) within the wrapper.

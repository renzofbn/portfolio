---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Decorators in Python'
pubDate: 2025-03-01
description: 'A brief introduction to decorators in Python, and how they work.'
author: 'renzofbn'
tags: ["Python", "Theory"]
tableOfContents: true
---

Decorators in Python are a **powerful and elegant** way to modify or extend the behavior of a function or class without altering its original implementation.

To understand how decorators work, we first need to grasp the concept of **closures**.

## Closures

Those functions that remembers the environment in which they were created are called `closures`.

Even if the outer function finishes execution, the inner function can still access the variables from that scope. This feature allows you to *remember* values across multiple function calls.


```python
def make_multiplier(n):
    def multiplier(x):
        # n is remembered here
        return x * n
    return multiplier

times3 = make_multiplier(3)
# Output: 12
print(times3(4))
# Output: 15
print(times3(5))
```


*Explanation:*  
Here, `make_multiplier` returns the `multiplier` function, which remembers the value of `n` (in this case, 3). Every time you call `times3` (made it from `multiplier`), it multiplies its argument by 3.

> [!TIP]  
> Remember that the main function must always return the nested function.

## Decorators

Now that we understand **closures** and how they work, we can talk about **decorators**, we can create them by defining a function that takes another function as input and returns a new function that wraps the original one.

```python
def friendly_decorator(func):
    def wrapper(name):
        print(f"Hi {name}! (from the decorator)")
        func(name)
        print("Function executed!")
    return wrapper
```

>[!IMPORTANT]
> The `wrapper` function is the one that will be called when the decorated function is executed. So it's where you can **add your custom logic** and it should have **the same arguments** as the original function.

*Explanation:*  
The `friendly_decorator` takes a function as input, wraps it in another function `wrapper`, and adds custom behavior. The wrapper can modify inputs, outputs, or even perform additional tasks around the original function call.

## Decorating

There are two common ways to apply a decorator to a function: manually wrapping the function or using the `@` syntax.

### Without @ Syntax

You can manually wrap your function by assigning it to the result of the decorator.

>[!NOTE]
> Example using the decorator from above.

```python
def goodbye_to(name):
    print(f"Goodbye, {name}!")

say_goodbye = friendly_decorator(goodbye_to)
say_goodbye("Alice")
# Output:
# Hi Alice! (from the decorator)
# Goodbye, Alice!
# Function executed!
```



*Explanation:*  
Here, `goodbye_to` is wrapped by `friendly_decorator`, creating a new function `say_goodbye` that includes the custom behavior. This way, you can apply the decorator to any function you want.

>[!NOTE]
> Example using the decorator from above.

### With @ Syntax

The `@` symbol provides a cleaner and more readable way to apply a decorator.


>[!NOTE]
> Example using the decorator from above.

```python
@friendly_decorator
def greet(name):
    print(f"Hello, {name}!")

greet("Bob")
# Output:
# Hi Bob! (from the decorator)
# Hello, Bob!
# Function executed!
```

*Explanation:*  
The `@friendly_decorator` syntax automatically wraps `greet` with the decorator, making your code easier to follow.


## Decorators with Arguments

Sometimes you need a decorator to accept its own arguments. To do this, create an extra outer function that takes these parameters and returns the actual decorator.

```python
def decorator_with_arguments(arg1, arg2):
    def decorator(func):
        def wrapper(*args, **kwargs):
            print(f"Using parameters: {arg1} and {arg2}")
            return func(*args, **kwargs)
        return wrapper
    return decorator
```

```python
@decorator_with_arguments("Welcome", 42)
def greet_person(name):
    print(f"Hello, {name}!")

greet_person("Charlie")
# Output:
# Using parameters: Welcome and 42
# Hello, Charlie!
```

*Explanation:*  
The outer function `decorator_with_params` accepts parameters and then returns the real decorator. This real decorator wraps the target function, allowing you to use extra information (like custom messages or settings) within the wrapper.

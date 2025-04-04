---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'How to design functions'
pubDate: 2025-03-01
description: 'A guide to the How to Design Functions (HtDF) method for designing functions.'
author: 'renzofbn'
tags: ["Theory", "CS", "Python"]
tableOfContents: true
---

When building software, it's important to follow a structured approach to ensure that your code is clear, maintainable, and correct. One effective method is the **How to Design Functions (HtDF)** approach, which provides a step-by-step guide for creating well-structured functions.

It has 5 steps, which we will go through one by one. Start with ...

> [!NOTE]  
> In this guide, we will use Python as the programming language, and we will write a function that converts Roman numerals to Arabic numerals.

## Signature, Purpose, and Stub

Before writing any actual code, start by defining **what your function will do**. It's important to have a clear understanding of the function's purpose and behavior. In order to do this, we need to define the **signature** of the function.

### Signature

Determine the data types the function will *consume* (input) and *produce* (output). Write this as a comment to set clear expectations.

**Example:**

```python
# String -> Number
```

This means the function will take a string (Roman numerals) as input and return a number (Arabic numerals).

---

### Purpose
 
In this step, you will **clearly describe what the function is meant to do**. Summarize its objective in a single, concise sentence.

*Example:*

```python
# Given a Roman numeral, return its Arabic numeral equivalent (as an int)
```

This statement explains the function’s goal without diving into implementation details.

---

### Stub

Now, write the basic structure of the function: its name, parameters, and return type. **This is your starting point or “skeleton” for the function.**

*Example:*

```python
def roman_to_arabic(r: str) -> int:
    return 0
```

Here, you define the function `roman_to_arabic` that takes a string `r` and returns an integer `0`.

---

## Examples

Before writing any actual code, we have to sstablish the expected behavior of your function by writing simple examples or tests. This step helps you define different cases and **ensures you have a clear goal before coding**.

*Example:*

```python
if roman_to_arabic("VI") == 6:
    print(True)

if roman_to_arabic("XXX") == 30:
    print(True)
```

These tests illustrate what outputs you expect from given inputs. Use different cases (e.g., simple, complex, edge cases) to fully specify the behavior.

---

## Inventory

Outline the steps your function should take. **Think of this as a checklist or a blueprint for your code**. Write a pseudo-code template that lists all the necessary operations.

*Example:*

```python
def roman_to_arabic(r: str) -> int:
    # Use a dictionary to map Roman numerals to Arabic numbers
    # Traverse the input string to convert and accumulate the values
    # Return the final result
    return result
```

This inventory helps you organize your thoughts and determine what resources (like dictionaries or loops) you need.

---

## Code

It is time to code, implement the function by filling in the details from your inventory. **Follow the plan you created and write the actual code**.

*Example:*

```python
def roman_to_arabic(r: str) -> int:
    # Dictionary for Roman numeral conversion
    roman_numerals = {'I': 1, 'V': 5, 'X': 10,
                      'L': 50, 'C': 100, 'D': 500,
                      'M': 1000}
    result = 0
    prev_value = 0

    # Process the numeral from right to left
    for numeral in reversed(r):
        value = roman_numerals[numeral]
        if value < prev_value:
            result -= value
        else:
            result += value
        prev_value = value
    return result
```
Now that you have the code, you can test it and debug any issues that arise.

---

## Test and Debug

Finally, validate your function using a testing framework or simple test cases. **The goal is to verify the correctness and handle unexpected inputs** by using exceptions or error-handling mechanisms.

**Example:**

```python
# Basic tests
if roman_to_arabic("VI") == 6:
    print("Test 1 passed!")
else:
    print("Test 1 failed!")

if roman_to_arabic("XXX") == 30:
    print("Test 2 passed!")
else:
    print("Test 2 failed!")

# More tests can be added here
# Or use a testing framework like pytest
```

Start with simple tests and gradually add more complex cases to break your function. Use try/except blocks if needed to catch and handle errors.


```python

def roman_to_arabic(roman_numeral: str) -> int:
    # Check for empty input
    if not roman_numeral:
        raise ValueError("Roman numeral cannot be empty")
    
    # Dictionary for Roman numeral conversion
    roman_numerals = {
        'I': 1, 'V': 5, 'X': 10,
        'L': 50, 'C': 100, 'D': 500,
        'M': 1000
    }
    
    # Validate characters
    for char in roman_numeral:
        if char not in roman_numerals:
            raise ValueError(f"Invalid character: '{char}'. Only I, V, X, L, C, D, M are allowed")
    
    # Validate basic Roman numeral patterns
    invalid_patterns = ["IIII", "VV", "XXXX", "LL", "CCCC", "DD", "MMMM"]
    for pattern in invalid_patterns:
        if pattern in roman_numeral:
            raise ValueError(f"Invalid Roman numeral pattern: '{pattern}'")
    
    result = 0
    prev_value = 0
    
    # Process the numeral from right to left
    for numeral in reversed(roman_numeral):
        current_value = roman_numerals[numeral]
        
        # If current value is less than previous, subtract it
        if current_value < prev_value:
            result -= current_value
        else:
            result += current_value
            
        prev_value = current_value
    
    return result
```

Now you have a working function that converts Roman numerals to Arabic numerals.

---

## Final Thoughts

The How to Design Functions (HtDF) method is a structured approach to creating well-structured functions. By following these 5 steps, you can ensure that your code is **clear, maintainable, and correct**. The HtDF method helps you **think through the process of building** a function and provides a step-by-step guide to help you write better code.

---

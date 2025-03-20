---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'How to design functions'
pubDate: 2025-03-01
description: 'A guide to the How to Design Functions (HtDF) method for designing functions.'
author: 'renzofbn'
tags: ["Theory", "CS", "Python"]
tableOfContents: true
---

## Signature, Purpose, and Stub

Before writing any actual code, start by defining **what your function will do**.

### Signature

Determine the data types the function will consume (input) and produce (output). Write this as a comment to set clear expectations.

**Example:**

```python
# String -> Number
```

This means the function will take a string as input and return a number.

---

### Purpose
 
Clearly describe what the function is meant to do. Summarize its objective in a single, concise sentence.

**Example:**

```python
# Given a Roman numeral, return its Arabic numeral equivalent (as an int)
```

This statement explains the function’s goal without diving into implementation details.

---

### Stub

Write the basic structure of the function: its name, parameters, and return type. This is your starting point or “skeleton” for the function.

**Example:**

```python
def roman_to_arabic(r: str) -> int:
    return 0
```

Here, you define the function `roman_to_arabic` that takes a string `r` and returns an integer. The return value `0` is a placeholder.

---

## Examples

Establish the expected behavior of your function by writing simple examples or tests. This step helps you define different cases and ensures you have a clear goal before coding.

**Example:**

```python
if roman_to_arabic("VI") == 6:
    print(True)

if roman_to_arabic("XXX") == 30:
    print(True)
```

*Explanation:*  
These tests illustrate what outputs you expect from given inputs. Use different cases (e.g., simple, complex, edge cases) to fully specify the behavior.

---

## Inventory

Outline the steps your function should take. Think of this as a checklist or a blueprint for your code. Write a pseudo-code template that lists all the necessary operations.

**Example:**

```python
def roman_to_arabic(r: str) -> int:
    # Use a dictionary to map Roman numerals to Arabic numbers
    # Traverse the input string to convert and accumulate the values
    # Return the final result
    return result
```

*Explanation:*  
This inventory helps you organize your thoughts and determine what resources (like dictionaries or loops) you need.

---

## Code

Implement the function by filling in the details from your inventory. Follow the plan you created and write the actual code.

**Example:**

```python
def roman_to_arabic(r: str) -> int:
    # Dictionary for Roman numeral conversion
    roman_numerals = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
    result = 0
    prev_value = 0

    # Process the numeral from right to left
    for numeral in reversed(r):
        value = roman_numerals[numeral]
        # If the current numeral is smaller than the previous one, subtract it; otherwise, add it.
        if value < prev_value:
            result -= value
        else:
            result += value
        prev_value = value
    return result
```

*Explanation:*  
- **Dictionary Setup:** Maps each Roman numeral to its Arabic value.  
- **Loop:** Iterates over the string in reverse to compare each numeral with the previous value.  
- **Condition:** Determines whether to add or subtract based on the numeral's order.

---

## Test and Debug

**Concept:**  
Finally, validate your function using a testing framework or simple test cases. The goal is to verify the correctness and handle unexpected inputs by using exceptions or error-handling mechanisms.

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
```

*Explanation:*  
Start with simple tests and gradually add more complex cases to break your function. Use try/except blocks if needed to catch and handle errors.

---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Step-by-Step Guide to Designing Functions (HTDF)'
pubDate: 2025-03-01
description: 'A guide to the How to Design Functions (HtDF) method for designing functions.'
author: 'renzofbn'
tags: ["Theory", "CS", "Python"]
tableOfContents: true
---
## Signature, purpose, stub

### Signature

Without writing any code, just think what data consume and produce this function? Then leave it in a comment on top

```python
# String -> Number
```

### Purpose

What’s the purpose of the function? What it will do? Be the most clear, write it dow in a single line.

```python
#Given a roman number returns an arabic number (int)
```

### Stub

Write just the name of the function, its parameters and what it should return.

```python
def roman_to_arabic(r: str) -> int:
  return 0
```

## Example

What is the expected beheivor of the function? Write some examples or tests

```python
if(roman_to_arabic("VI") == 6)
	print(true)
	
if(roman_to_arabic("XXX") == 30)
	print(true)
```

How much tests are needed? Do no expect much time writing these first examples, but use diferente cases to stablish what should be the expected behaivour of the function.

## Inventory

Using the `stub` write down a template of the functions, what steps should the function take?

```python
def roman_to_arabic(r: str) -> int:
	# Use a dictionary for reference
	# Read the dictionary to convert values
  return result

```

## Code

Using the template, finish the function

```python
def roman_to_arabic(r: str) -> int:
  roman_numerals = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
  result = 0
  prev_value = 0
  
  for numeral in reversed(r):
    value = roman_numerals[numeral]
    if value < prev_value:
      result -= value
    else:
      result += value    
    prev_value = value
  return result
```

## Test and debug

Using your favorite library for testing, write more tests and try to brake your function, and use exepctions to fix it.

## Overview

The How to Design Functions (HTDF) method is a systematic approach to developing functions. This guide will walk you through each step, providing clear explanations and practical examples along the way. You will learn how to define the signature, purpose, and stub, create examples, outline the function's steps (inventory), write the code, and finally test and debug your function.

---

## 1. Signature, Purpose, and Stub

Before writing any actual code, start by defining **what your function will do**.

### Signature

**Concept:**  
Determine the data types the function will consume (input) and produce (output). Write this as a comment to set clear expectations.

**Example:**

```python
# String -> Number
```

This means the function will take a string as input and return a number.

---

### Purpose

**Concept:**  
Clearly describe what the function is meant to do. Summarize its objective in a single, concise sentence.

**Example:**

```python
# Given a Roman numeral, return its Arabic numeral equivalent (as an int)
```

This statement explains the function’s goal without diving into implementation details.

---

### Stub

**Concept:**  
Write the basic structure of the function: its name, parameters, and return type. This is your starting point or “skeleton” for the function.

**Example:**

```python
def roman_to_arabic(r: str) -> int:
    return 0
```

Here, you define the function `roman_to_arabic` that takes a string `r` and returns an integer. The return value `0` is a placeholder.

---

## 2. Examples

**Concept:**  
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

## 3. Inventory

**Concept:**  
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

## 4. Code

**Concept:**  
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

## 5. Test and Debug

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

---

## Conclusion

By following the HTDF method—starting with the signature, defining the purpose, creating a stub, writing examples, planning the inventory, coding, and finally testing—you create a structured, clear, and maintainable approach to function design. This method ensures that your functions are well thought-out and robust against errors.

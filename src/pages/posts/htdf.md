---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'How to Design Functions'
pubDate: 2025-03-01
description: 'A guide to the How to Design Functions (HtDF) method for designing functions.'
author: 'renzofbn'
tags: ["Theory", "CS"]
tableOfContents: true
---

# HtDF

Created: March 29, 2024 5:03 PM

## How to Desing Functions

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
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

Una función que guarda referencias a variables locales en su entorno de definición, incluso cuando la función ha terminado de ejecutarse. Esto significa que la función puede acceder y recordar los valores de esas variables aunque ya no existan en la memoria. El concepto de closure se basa en la capacidad de Python de tratar las funciones como objetos de primera clase, lo que permite que las funciones sean asignadas a variables, pasadas como argumentos y retornadas como valores.

```python
def make_multiplier_of(n):
	def multiplier(x):
		return x * n
	return multiplier

times5 = make_multiplier_of(5)

print(times5(3))
# Output: 15
```

La función `make_multiplier_of` toma de argumento un número `n` y devuelve la función interna `multiplier`, el cual recuerda el valor de `n`, incluso después de eliminar la función `make_multiplier_of`. Pudiendo así hacer cálculos con la variable inicial `n` y pudiendo recibir mas `y`.


> [!TIP]
> Recuerda que la función principal siempre debe retornar la función anidada.

>[!TIP]
>Los closures son útiles cuando se desea tener funciones que "recuerden" ciertos valores o estados específicos en un momento dado.

```python
def contador():
    count = 0
    def incrementar():
        nonlocal count
        count += 1
        print(f"Contador: {count}")
    return incrementar

contador1 = contador()
contador1()  # Output: Contador: 1
contador1()  # Output: Contador: 2

contador2 = contador()
contador2()  # Output: Contador: 1
```

##@decorando

Los decoradores aprovechan los closures para envolver funciones o clases y modificar su comportamiento agregando funcionalidad adicional antes o después de su ejecución, sin modificar su implementación original.

Al colocar un decorador encima de una función o clase, la función del decorador se ejecuta antes de la función o clase decorada. El decorador puede realizar acciones adicionales, modificar los argumentos o el resultado y luego llamar a la función o clase original.

> [!TIP]
> Un decorador es una función que recibe como parámetro otra función, le añade cosas, y retorna una función distinta.

```python
def decorador(func):
	def envoltura(name):
		print(f'Hola {name} desde el decorador')
		func(name)
		print("Se ha ejecutado la función")
	return envoltura
```

>[!TIP]
> La primera función recibe siempre la función a decorar, la segunda recibe los argumentos que la función a decorar puede recibir y dentro de la misma puede hacer cálculos antes o después de ejecutarla. Luego la primera función retorna la segunda función.

Existen 2 formas de aplicar este decorador, sin usar @

```python
# Sin usar @
def despedirse(name):
	print(f"Adios {name}")

despedirse = decorador(despedirse)
despedirse("Renzo")
```

O usando @ en la cabeza de la función a decorar

```python
@decorador
def saludar(name):
	print(f"Hola {name}")

saludar("Renzo")
```

## Agregando argumentos

Para crear un decorador que reciba parámetros, se utiliza una función adicional que envuelve al decorador principal. Esta función toma los parámetros y devuelve el decorador.

```python
def decorador_con_parametros(parametro1, parametro2):
    def decorador(funcion):
        def wrapper(*args, **kwargs):
            # Acciones adicionales utilizando los parámetros
            print(f"Parámetros {parametro1} - {parametro2}")
            return funcion(*args, **kwargs)
        return wrapper
    return decorador
```

Se puede utilizar de la siguiente manera:

```python
@decorador_con_parametros("Hola", 10)
def saludar(nombre):
    print(f"Hola, {nombre}!")

saludar("Juan")
```
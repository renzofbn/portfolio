---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Asynchronous JavaScript'
pubDate: 2025-03-01
description: 'An overview of asynchronous programming in JavaScript, including callbacks, promises, and async/await.'
author: 'renzofbn'
tags: ["Javascript", "Theory"]
tableOfContents: true
---

# async

- Contenido

La asincronía se refiere a la capacidad de ejecutar tareas de forma no bloqueante, lo que significa que el programa puede continuar con otras operaciones mientras espera la finalización de una tarea. En el contexto de JavaScript (JS), la asincronía es particularmente importante debido a la naturaleza de un entorno de ejecución basado en eventos, como un navegador web.

En JS, la asincronía se logra mediante el uso de devoluciones de llamada (callbacks), promesas y, más recientemente, mediante el uso de la sintaxis async/await introducida en ECMAScript 2017.

# Callbacks

Son funciones que se pasan como argumentos a otras funciones y se invocan después de que se complete una operación asincrónica. Por ejemplo:

```jsx
function fetchData(callback) {
  setTimeout(() => {
    const data = "Datos obtenidos";
    callback(data);
  }, 2000);
}

// Ejemplo de uso
fetchData((data) => {
  console.log(data); // Imprime "Datos obtenidos"
});
```

<aside>
💡 Los callbacks pueden generar una estructura de código anidada compleja conocida como callback hell si se encadenan múltiples operaciones asincrónicas.

</aside>

<aside>
💡 Requieren una buena gestión del control de errores, ya que no se manejan automáticamente como en las promesas.

</aside>

# Promesas

Las promesas son objetos que representan un valor futuro que puede estar disponible o no. Permiten encadenar operaciones asincrónicas de una manera más legible y manejar tanto el éxito como el fallo de una operación.

Una promesa se crea utilizando el constructor `Promise`. Toma una función de retorno de llamada que a su vez toma dos argumentos, `resolve` y `reject`. 

- `resolve` se usa para indicar que la operación se ha completado con éxito
- `reject` se usa para indicar un error o una falla en la operación.

```jsx
const miPromesa = new Promise((resolve, reject) => {
	const response = true;
	if(response){
		resolve("Data encontrada");
	}
	else{
		reject("No se ha encontrado data");
		}
});
```

<aside>
💡 Tanto resolve() como reject() son los callbacks que luego then() o catch() manejarán.

</aside>

Las promesas permiten encadenar múltiples operaciones asincrónicas de forma más legible y
ordenada. Esto se logra utilizando los métodos `then()` y `catch()` al usar una promesa. 

- `then()` se utiliza para manejar el caso de éxito
- `catch()` se utiliza para manejar errores, y limpiar si esnecesario
- `finally()` se ejecutará independientemente del resultado de la promesa.

```jsx
// Usando miPromesa
miPromesa
  .then(data => {
    console.log("Respuesta:", data);
  })
  .catch(error => {
    console.error("Error:", error);
  })
  .finally(() => {
    console.log("Tarea finalizada sin importar el resultado");
  });
```

<aside>
💡 La única forma de acceder a `then()` es confirmando que la resolución de la promesa con `resolve()`, en cambio si sucede cualquier error se llegará a `catch()` con o sin usar `reject()`.

</aside>

El método `.then()`toma hasta dos argumentos; ambos son un *callback* por si todo sale bien o si sucede un error. Cada `.then()`devuelve un objeto de promesa recién generado, que de manera opcional se puede usar para crear mas; por ejemplo:

```jsx
miPromesa
  .then(handleResolvedA, handleRejectedA)
  .then(handleResolvedB, handleRejectedB)
  .then(handleResolvedC, handleRejectedC);
```

<aside>
💡 Un `.catch()` es realmente solo un `.then()` sin una ranura de argumento para una función de devolución de llamada para el caso en que se resuelva la promesa.

</aside>

Si ocurre un error dentro de una promesa, se puede intentar solucionarlo usando `then()`:

```jsx
miPromesa
	.then(value =>{return 'Msg:', value}, err =>{return 'Reparando...'})
	.then(value =>{console.log(value)})
	// Msg: value
	// Reparando...
```

Sea cual sea el resultado de la promesa se llegará al ultimo `then()`.

<aside>
💡 Si ocurre un error ya sea en la primera o segunda función de un `then()`, esta pasará a la segunda función del siguiente `then()`, en cambio si todo sale bien, pasarán al primero, sin importar si ocurrió un error antes.

</aside>

<aside>
💡 Si ocurre un error y el siguiente `then()` no tiene función para manejar el problema o no existe un `catch()` este detendrá la ejecución del programa.

</aside>

# async, await

Usado para simplificar la escritura y el manejo de código asincrónico en JavaScript. Permiten trabajar con promesas de una manera más similar a la programación síncrona, lo que mejora la legibilidad y la estructura del código.

La palabra clave `async` se utiliza para declarar una función asincrónica. Dentro de una función `async`, se pueden utilizar las palabras clave `await` para esperar la resolución de una promesa antes de continuar con la ejecución del código.

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

<aside>
💡 Dentro de una función `async` puedes manejar varias funciones asíncronas a la vez siempre y cuando comiencen por `await`.

</aside>

<aside>
💡 Es importante manejar los errores utilizando bloques `try...catch` para capturar las excepciones que puedan ocurrir en las operaciones asincrónicas.

</aside>

<aside>
💡 Las funciones `async` devuelven una promesa. Lo que significa que las puedes manejar de la misma manera.

</aside>

```jsx
async function asyncFunction() {
  return "Hola, soy una función asíncrona";
}

asyncFunction()
	.then(result => {
	   console.log(result);
});
```

# Referencias

[Promise.resolve() - JavaScript | MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)

[async function expression - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function)

[await - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
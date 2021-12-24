# CHALLENGE - CONCURSO DE PREGUNTAS Y RESPUESTAS
Este repositorio contiene mi solución a la prueba técnica de SofkaU para Liga de Entrenamiento en Desarrollo de Software

## Pre-requisitos
```
node version ^16.13.1
npm version ^8.1.0
```
----------

## Instrucciónes de uso
Clonar este repositorio y acceder a dicha carpeta...
Abra una ventana de terminal dentro del directorio, luego ejecute el comando:

```console
npm install
npm start
```

Las preguntas son tomadas de el archivo `./src/data/questions.json`


Y el archivo `/src/data/scores.json` contiene los puntajes guardados.

----------

En la opcion de reglas se muestra una breve descripción del juego:

Después de cada pregunta, si la opción es correcta, se muestra el premio y pregunta si desea continuar a la siguiente pregunta o retirarse con su premio acumulado. Si la opción es incorrecta finaliza el juego y pierde todo.


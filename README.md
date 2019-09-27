# TereGramBot
Simple telegram node bot with a few funny commands

Hola. Soy Tere. Tere Gram. Y soy un bot de telegram. Este bot esta hecho en `node.js` con [micro-bot](https://npm.im/micro-bot)

Para lanzar este bot es necesario un archivo `.env` en la raiz del proyecto que contenga algo así
```
BOT_TOKEN=aaaaa:bbbbbbb
```

## desplegar en [now.sh](https://now.sh)
Para desplegar el bot en `now` es necesario incluir una variable `NOW_TOKEN` en el archivo `.env`

Puedes desplegar una nueva version en now.sh (borrando la antigua) con `npm run deploy`

## Contribuciones
Se aceptan todo tipo de Pull Requests. Aunque estaría guay cumplir esto:
* tabulacion con dos espacios
* usar estandares de ES6 en adelante (`const` y `let` en vez de `var` y etc)

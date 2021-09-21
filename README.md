# TASK

### Для реализации использовать:  

1. React и любая библиотека для работы со store  
2.  Для стилей предпочтительно Styled Components  
3. Использование сторонних библиотек разрешено, если это требуется.  

### Условия:  
1. Поле для рисования должно быть выполнено в виде HTML-страницы (располагайте HTML элементы в соответствии с логикой вашего приложения), не используйте элемент \<canvas> и его API.  
2. Программа должна быть покрыта тестами.  
### Задача:  
Написать простую программу для рисования, исполняющую последовательность команд из файла input.txt и выдающую output.txt.  
Допускаются следующие команды:  
C w h  
L x1 y1 x2 y2  
R x1 y1 x2 y2  
B x y c  
*Canvas*: создать canvas шириной w и высотой h.  
*Line*: проложить линию от (x1, y1) до (x2, y2), используя для рисования псевдографический символ “x”. Поддерживаются только горизонтальные и вертикальные линии.  
*Rectangle*: создать прямоугольник с верхним левым углом в точке (x1,y1), нижним правым  
углом в точке (x2, y2). Вертикальные и горизонтальные линии должны быть отрисованы псевдографическими символами “x”.  
*Bucket Fill*: залить всю область (x,y) цветом ("color", c), аналогично тому, как работает инструмент “Заливка” в графических редакторах  
**Важно: рисовать можно только при условии, что создан canvas! (применена команда C, width, height)!**  
### Пример:  

Файл input.txt:  
C 20 4 – создаёт холст в документе шириной 20 и высотой 4  
L 1 2 6 2 – создаёт линию от (x1 = 1, y1 = 2) до (x2 = 6, y2 = 2)  
L 6 3 6 4 - создаёт линию от (x1 = 1, y1 = 2) до (x2 = 6, y2 = 2)  
R 16 1 20 3 – создаёт прямоугольник (16, 1), (20, 3)  
B 10 3 o - делает заливку на координату (x = 10, y = 3) цвета o (например #ff0000)  
L 7 2 15 2 – создаёт линию от (x1 = 1, y1 = 2) до (x2 = 6, y2 = 2)  
B 7 3 f - делает заливку на координату (x = 7, y = 3) цвета f  
  
Результат формата отображения описан в output.txt   

## Init server  

```sh
cd server/
npm i  
node index.js
```

## Init canvas  

```sh
cd canvas/
npm i
npm start
```

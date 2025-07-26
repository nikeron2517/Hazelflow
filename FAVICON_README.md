# Favicon для Hazelflow

## Описание
Создан favicon для сайта Hazelflow с буквой "H" в фирменных цветах бренда.

## Файлы
- `favicon.svg` - основная SVG версия favicon
- `favicon.ico` - ICO версия (нужно конвертировать)
- `favicon-16x16.png` - PNG версия 16x16 (нужно конвертировать)
- `favicon-32x32.png` - PNG версия 32x32 (нужно конвертировать)

## Конвертация в PNG и ICO

### Онлайн конвертеры:
1. **Convertio** - https://convertio.co/svg-png/
2. **CloudConvert** - https://cloudconvert.com/svg-to-png
3. **Favicon.io** - https://favicon.io/favicon-converter/

### Используя ImageMagick (командная строка):
```bash
# Установка ImageMagick (если не установлен)
# Windows: скачать с https://imagemagick.org/script/download.php
# macOS: brew install imagemagick
# Linux: sudo apt-get install imagemagick

# Конвертация в PNG
magick favicon.svg -resize 16x16 favicon-16x16.png
magick favicon.svg -resize 32x32 favicon-32x32.png

# Конвертация в ICO (с несколькими размерами)
magick favicon.svg -resize 16x16,32x32,48x48 favicon.ico
```

### Используя Node.js (если у вас есть npm):
```bash
# Установка sharp
npm install -g sharp-cli

# Конвертация
sharp -i favicon.svg -o favicon-16x16.png resize 16 16
sharp -i favicon.svg -o favicon-32x32.png resize 32 32
```

## Цвета бренда
- Основной цвет: `#66E8FF` (голубой)
- Фон: Градиент от `#66E8FF` до `#4AC8E8` (голубой)
- Буква "H": `white` (белый)
- Декоративные элементы: `white` с прозрачностью

## Особенности дизайна
- Белая буква "H" на голубом градиентном фоне
- Светлый, современный дизайн
- Градиентный фон от голубого к более светлому голубому
- Декоративные элементы в белом цвете
- Скругленные углы
- Адаптивный дизайн

## Поддержка браузеров
- SVG favicon поддерживается всеми современными браузерами
- PNG и ICO версии для обратной совместимости
- Различные размеры для разных устройств 
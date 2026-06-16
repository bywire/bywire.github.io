# Profilbilder för Hinder

Byt ut bilderna i den här mappen för att ändra profilerna i appen.

Rekommenderad storlek för svepkorten:

- 1080 x 1440 px
- stående 3:4-format
- JPG, WebP eller SVG

Just nu används dessa filer i `index.html`:

- `images/profile-1.svg`
- `images/profile-2.svg`
- `images/profile-3.svg`
- `images/profile-4.svg`

Det enklaste är att ersätta filerna med egna bilder med samma filnamn. Om du vill använda JPG i stället, ändra bara bildvägarna i `profiles`-listan i `index.html`, till exempel:

```js
image: 'images/profile-1.jpg'
```

Undvik viktiga detaljer längst ned i bilden, eftersom namn, text och gradient ligger där.

# Photo Folder

Place your photos for Eline here!

## How to use photos in chapters:

1. Add your photos to this folder
2. Update the chapters in `src/data/chapters.ts`
3. Add the image path to the chapter object:

```typescript
{
  id: 2,
  title: "Onze Herinneringen",
  content: "...",
  image: require("../../assets/photos/photo1.jpg"),
  ...
}
```

## Supported formats:
- .jpg / .jpeg
- .png
- .webp

Keep images optimized for mobile (under 1MB each recommended).

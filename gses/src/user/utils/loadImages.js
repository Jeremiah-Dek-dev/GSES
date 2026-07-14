// utils/loadImages.js

const preloadImages = async (urls) => {
  const promises = urls.map(
    (url) =>
      new Promise((resolve) => {
        const img = new Image();

        img.onload = () => {
          console.log(`Loaded image: ${url}`);
          resolve();
        };

        img.onerror = () => {
          console.warn(`Failed to load image: ${url}`);
          resolve(); // don't block app loading
        };

        img.src = url;
      }),
  );

  await Promise.all(promises);
};


const loadAssetsImages = async () => {
  const images = import.meta.glob(
    "/src/assets/**/*.{png,jpg,jpeg,webp,svg}",
    {
      eager: true,
      import: "default",
    },
  );

  const urls = Object.values(images);

  await preloadImages(urls);
};


const loadPublicImages = async () => {
  const urls = Object.values(
    import.meta.glob("/public/**/*.{png,jpg,jpeg,webp,svg}", {
      eager: true,
      query: "?url",
      import: "default",
    }),
  );

  await preloadImages(urls);
};


export const loadAllImages = async () => {
  await Promise.all([
    loadAssetsImages(),
    loadPublicImages(),
  ]);

  console.log("All images loaded");
};
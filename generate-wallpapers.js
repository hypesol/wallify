const fs = require("fs");
const path = require("path");

const wallpapersDir = "./wallpapers/full";

let data = {};

fs.readdirSync(wallpapersDir).forEach(category => {
  const categoryPath = path.join(wallpapersDir, category);

  if (fs.statSync(categoryPath).isDirectory()) {
    data[category] = [];

    fs.readdirSync(categoryPath).forEach(file => {
      if (file.endsWith(".jpg") || file.endsWith(".webp")) {
        const imagePath = `${category}/${file}`;
        data[category].push(imagePath);
      }
    });
  }
});

fs.writeFileSync("wallpapers.json", JSON.stringify(data, null, 2));

console.log("JSON generated successfully!");

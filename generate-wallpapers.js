const fs = require("fs");
const path = require("path");

const wallpapersDir = "./wallpapers";

let data = {};

fs.readdirSync(wallpapersDir).forEach(type => {
  const typePath = path.join(wallpapersDir, type);

  if (fs.statSync(typePath).isDirectory()) {
    data[type] = {};

    fs.readdirSync(typePath).forEach(category => {
      const categoryPath = path.join(typePath, category);

      if (fs.statSync(categoryPath).isDirectory()) {
        data[type][category] = [];

        fs.readdirSync(categoryPath).forEach(file => {
          if (file.endsWith(".jpg") || file.endsWith(".webp")) {
            const imagePath = `${type}/${category}/${file}`;
            data[type][category].push(imagePath);
          }
        });
      }
    });
  }
});

fs.writeFileSync("wallpapers.json", JSON.stringify(data, null, 2));

console.log("JSON generated successfully!");

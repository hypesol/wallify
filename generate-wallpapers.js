const fs = require("fs");
const path = require("path");

const baseUrl = "https://raw.githubusercontent.com/hypesol/wallify/main/wallpapers"; // Update with your actual CDN/hosting URL
const wallpapersDir = "./wallpapers";

let data = {};

fs.readdirSync(wallpapersDir).forEach(category => {
  const categoryPath = path.join(wallpapersDir, category);

  if (fs.statSync(categoryPath).isDirectory()) {
    data[category] = [];

    fs.readdirSync(categoryPath).forEach(file => {
      if (file.endsWith(".jpg") || file.endsWith(".webp")) {
        const url = `${baseUrl}/${category}/${file}`;
        data[category].push(url);
      }
    });
  }
});

fs.writeFileSync("wallpapers.json", JSON.stringify(data, null, 2));

console.log("JSON generated successfully!");

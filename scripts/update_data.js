const fs = require("fs");
const path = require("path");

// Функция для сбора данных (замените на свою логику)
async function fetchData() {
  // Пример: здесь можно сделать запрос к API вакансий
  return {
    lastUpdated: new Date().toISOString(),
    technologies: [
      { name: "JavaScript", count: 125 },
      { name: "TypeScript", count: 87 },
      { name: "Python", count: 92 },
    ],
    stats: {
      total: 304,
      updatedAt: new Date().toLocaleString("ru-RU"),
    },
  };
}

// Основная функция
async function main() {
  try {
    const data = await fetchData();
    const outputPath = path.join(__dirname, "../docs/data.json");

    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log("Данные успешно обновлены!");
  } catch (error) {
    console.error("Ошибка при обновлении данных:", error);
    process.exit(1);
  }
}

main();

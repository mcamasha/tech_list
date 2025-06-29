const axios = require("axios");
const fs = require("fs");

async function fetchVacancies() {
  const response = await axios.get(
    "https://api.hh.ru/vacancies?text=JavaScript"
  );
  return response.data.items.slice(0, 10); // Берем первые 10 вакансий
}

async function analyzeTechnologies(vacancies) {
  // Простой анализ технологий (реальная логика будет сложнее)
  const techs = {};
  vacancies.forEach((v) => {
    const skills = v.skills?.map((s) => s.name.toLowerCase()) || [];
    skills.forEach((skill) => {
      techs[skill] = (techs[skill] || 0) + 1;
    });
  });
  return techs;
}

async function updateData() {
  const vacancies = await fetchVacancies();
  const technologies = await analyzeTechnologies(vacancies);

  return {
    updatedAt: new Date().toISOString(),
    source: "hh.ru",
    technologies: Object.entries(technologies)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count),
  };
}

// Запуск и сохранение
updateData()
  .then((data) => {
    fs.writeFileSync("docs/data.json", JSON.stringify(data, null, 2));
    console.log("Data updated successfully!");
  })
  .catch(console.error);

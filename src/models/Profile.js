const Database = require("../db/config");

let data = {
  name: "Carlos Eduardo",
  avatar: "https://github.com/CarlosEduardoVdeOliveira.png",
  "monthly-budget": 3000,
  "hours-per-day": 5,
  "days-per-week": 6,
  "vacation-per-year": 4,
  "value-hours": 75,
};

module.exports = {
  async get() {
    const db = await Database();

    const data = await db.get(`SELECT * FROM profile`);

    await db.close();

    return {
      name: data.name,
      avatar: data.avatar,
      "monthly-budget": data.monthly_budget,
      "hours-per-day": data.hours_per_day,
      "days-per-week": data.days_per_week,
      "vacation-per-year": data.vacation_per_year,
      "value-hours": data.value_hours,
    };
  },
  async update(newData) {
    const db = await Database();

    db.run(`UPDATE profile SET
      name = "${newData.name}",
      avatar = "${newData.avatar}",
      monthly_budget = ${newData["monthly-budget"]},
      hours_per_day = ${newData["hours-per-day"]},
      days_per_week = ${newData["days-per-week"]},
      vacation_per_year = ${newData["vacation-per-year"]},
      value_hours = ${newData["value-hours"]}
    `);

    await db.close();
  },
};

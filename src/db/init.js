const Database = require("./config");

const initDb = {
  async init() {
    const db = await Database();

    const profile = `CREATE TABLE profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      avatar TEXT,
      monthly_budget INT,
      hours_per_day INT,
      days_per_week INT,
      vacation_per_year INT,
      value_hours INT
      );`;
    await db.exec(profile);

    const jobs = `CREATE TABLE jobs(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      daily_hours INT,
      total_hours INT,
      created_at DATETIME
    );`;
    await db.exec(jobs);

    const profileInsert = `INSERT INTO profile (
      name,
      avatar,
      monthly_budget,
      hours_per_day,
      days_per_week,
      vacation_per_year,
      value_hours
    ) VALUES(
      "Carlos Eduardo",
      "https://github.com/CarlosEduardoVdeOliveira.png",
      10000,
      5,
      6,
      4,
      75
    );`;
    await db.run(profileInsert);

    const jobPizzaria = `INSERT INTO jobs(
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES(
      "Pizzaria Guloso",
      2,
      1,
      1617514376018
    );`;
    await db.run(jobPizzaria);

    const jobOnTow = `INSERT INTO jobs(
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES(
      "Pizzaria Guloso",
      2,
      1,
      1618510477579
    );`;
    await db.run(jobOnTow);

    await db.close();
  },
};

initDb.init();

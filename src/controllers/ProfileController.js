const Profile = require("../models/Profile");

module.exports = {
  async index(req, res) {
    return res.render("profile", { profile: await Profile.get() });
  },

  async update(req, res) {
    // req.body
    const data = req.body;
    // definição de semanas no ano: 52
    const weeksPerYear = 52;
    // remove as semanas de ferias, para pegar quantas semanas tem 1 mês
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
    // Total de horas trabalhadas na semana
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
    // horas trabalhadas no mes
    const monthlyTotalHours = weeksPerMonth * weekTotalHours;
    // qual sera o valor da minha hora
    const valueHours = data["monthly-budget"] / monthlyTotalHours;
    const profile = await Profile.get();
    await Profile.update({
      ...profile,
      ...req.body,
      "value-hours": valueHours,
    });

    return res.redirect("/profile");
  },
};

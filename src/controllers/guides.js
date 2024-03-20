const { guidesDb, usersDb, todosDb } = require("../db");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
function createGuidePage(req, res) {
  res.render("guides/create");
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
function createGuide(req, res) {
  const { title, content, notify } = req.body;

  const newGuide = guidesDb.create({ title, content });

  if (notify) {
    const users = usersDb.findAll();

    const newTodos = users.map((user) => {
      return {
        user_id: user.id,
        guide_id: newGuide.id,
        completed: false,
      };
    });

    todosDb.createBulk(newTodos);
  }

  req.flash("success", "Tartib muvaffaqiyatli yaratildi");

  if (notify) {
    req.flash("success", "Bildirishnomalar hammaga jo'natildi");
  }

  res.redirect("/guides/list");
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
function listGuides(req, res) {
  const guides = guidesDb.findAll();

  res.render("guides/list", { guides });
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
function showGuide(req, res) {
  console.log(req.params);
  const { id } = req.params;

  const guide = guidesDb.findById(id);

  if (!guide) {
    req.flash("warning", "Tartib topilmadi");

    return res.redirect("/guides/list");
  }

  res.render("guides/show", { guide });
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
function editGuidePage(req, res) {
  const { id } = req.params;

  const guide = guidesDb.findById(id);

  if (!guide) {
    req.flash("warning", "Tartib topilmadi");

    return res.redirect("/guides/list");
  }

  res.render("guides/edit", { guide });
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
function editGuide(req, res) {
  const { id } = req.params;
  const { title, content, notify } = req.body;

  const guide = guidesDb.findById(id);

  if (!guide) {
    req.flash("error", "Tartib topilmadi");

    return res.redirect("/guides/list");
  }

  guidesDb.update(id, { title, content });

  if (notify) {
    const users = usersDb.findAll();

    const newTodos = users.map((user) => {
      return {
        user_id: user.id,
        guide_id: id,
        completed: false,
      };
    });

    todosDb.createBulk(newTodos);

    console.log("boshqalarga yuborildi");
  }

  req.flash("success", "Tartib muvaffaqiyatli tahrirlandi");

  if (notify) {
    req.flash("success", "Bildirishnomalar hammaga jo'natildi");
  }

  res.redirect("/guides/list");
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
function removeGuide(req, res) {
  const { id } = req.params;

  const guide = guidesDb.findById(id);

  if (!guide) {
    req.flash("error", "Tartib topilmadi");

    return res.redirect("/guides/list");
  }

  guidesDb.remove(id);

  todosDb.removeAllOfGuide(id);

  res.redirect("/guides/list");
}

module.exports = {
  createGuidePage,
  createGuide,
  listGuides,
  showGuide,
  editGuidePage,
  editGuide,
  removeGuide,
};

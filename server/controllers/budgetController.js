const Budget = require('../models/Budget');

const getBudgets = async (req, res) => {
  try {
    const { month } = req.query;
    const filter = { userId: req.user._id };
    if (month) filter.month = month;
    const budgets = await Budget.find(filter);
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const setBudget = async (req, res) => {
  try {
    const { category, limit, month } = req.body;
    
    // Upsert: update if exists, create if not
    const budget = await Budget.findOneAndUpdate(
      { userId: req.user._id, category, month },
      { limit },
      { upsert: true, new: true }
    );
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBudget = async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id);
    res.json({ message: 'Budget deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getBudgets, setBudget, deleteBudget };
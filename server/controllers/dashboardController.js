const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');

// @desc    Get dashboard summary
// @route   GET /api/dashboard/summary
const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    // Current month date range
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Total income
    const incomeResult = await Transaction.aggregate([
      { $match: { userId, type: 'income' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    // Total expenses
    const expenseResult = await Transaction.aggregate([
      { $match: { userId, type: 'expense' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    // This month's expenses by category
    const categoryExpenses = await Transaction.aggregate([
      { $match: { userId, type: 'expense', date: { $gte: startOfMonth, $lte: endOfMonth } } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $sort: { total: -1 } }
    ]);

    // Monthly trend (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);

    const monthlyTrend = await Transaction.aggregate([
      { $match: { userId, type: 'expense', date: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { year: { $year: '$date' }, month: { $month: '$date' } },
          total: { $sum: '$amount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Budget status for current month
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const budgets = await Budget.find({ userId, month: currentMonth });

    const budgetStatus = await Promise.all(budgets.map(async (budget) => {
      const spent = await Transaction.aggregate([
        { $match: { userId, type: 'expense', category: budget.category, date: { $gte: startOfMonth, $lte: endOfMonth } } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);
      const spentAmount = spent[0]?.total || 0;
      return {
        category: budget.category,
        limit: budget.limit,
        spent: spentAmount,
        percentage: Math.round((spentAmount / budget.limit) * 100),
        isOver: spentAmount > budget.limit
      };
    }));

    res.json({
      totalIncome: incomeResult[0]?.total || 0,
      totalExpenses: expenseResult[0]?.total || 0,
      balance: (incomeResult[0]?.total || 0) - (expenseResult[0]?.total || 0),
      categoryExpenses,
      monthlyTrend,
      budgetStatus
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardSummary };
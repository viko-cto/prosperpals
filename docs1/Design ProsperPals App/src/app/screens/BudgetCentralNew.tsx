import { useState } from "react";
import { DollarSign, TrendingDown, Plus, Edit2, AlertCircle } from "lucide-react";
import { PageHeader, Card, StatCard, Button, ProgressBar, CompanionMessage } from "../components/DesignSystem";

export function BudgetCentral() {
  const [selectedMonth] = useState("February 2026");

  const categories = [
    { id: 1, name: "Groceries", emoji: "🛒", spent: 375, budget: 420, color: "gold" as const },
    { id: 2, name: "Transport", emoji: "🚗", spent: 180, budget: 200, color: "blue" as const },
    { id: 3, name: "Entertainment", emoji: "🎬", spent: 95, budget: 150, color: "green" as const },
    { id: 4, name: "Dining Out", emoji: "🍕", spent: 220, budget: 200, color: "gold" as const },
    { id: 5, name: "Utilities", emoji: "⚡", spent: 150, budget: 150, color: "blue" as const },
  ];

  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);

  return (
    <div className="flex h-screen bg-[#0f0f1a]">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <PageHeader
          title="Budget Central"
          subtitle={`Track your spending for ${selectedMonth}`}
          icon="💰"
          action={
            <Button variant="primary-gold" icon={<Plus className="w-4 h-4" />}>
              Add Category
            </Button>
          }
        />

        {/* Overview Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard
            label="Total Budget"
            value={`€${totalBudget}`}
            icon={<DollarSign className="w-4 h-4" />}
            gradient="gold"
          />
          <StatCard
            label="Total Spent"
            value={`€${totalSpent}`}
            icon={<TrendingDown className="w-4 h-4" />}
            trend={{ value: "+12%", positive: false }}
            gradient="gold"
          />
          <StatCard
            label="Remaining"
            value={`€${totalBudget - totalSpent}`}
            icon={<DollarSign className="w-4 h-4" />}
            trend={{ value: "€100/day", positive: true }}
            gradient="green"
          />
        </div>

        {/* Budget Categories */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white mb-4">Categories</h2>
          
          {categories.map((category) => {
            const percentage = (category.spent / category.budget) * 100;
            const isOverBudget = percentage > 100;

            return (
              <Card key={category.id} gradient="none" className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{category.emoji}</span>
                    <div>
                      <h3 className="text-base font-semibold text-white">{category.name}</h3>
                      <p className="text-sm text-white/60">
                        €{category.spent} / €{category.budget}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isOverBudget && (
                      <AlertCircle className="w-4 h-4 text-red-400" />
                    )}
                    <Button variant="ghost" size="sm" icon={<Edit2 className="w-3 h-3" />}>
                      Edit
                    </Button>
                  </div>
                </div>

                <ProgressBar
                  value={category.spent}
                  max={category.budget}
                  gradient={isOverBudget ? "gold" : category.color}
                  showPercentage
                />

                {isOverBudget && (
                  <p className="text-xs text-red-400 mt-2">
                    €{category.spent - category.budget} over budget
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Right Panel - Insights */}
      <div className="w-[360px] bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] border-l border-white/10 overflow-y-auto p-6 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Insights</h3>

          {/* Goldie's Advice */}
          <CompanionMessage
            companion="goldie"
            message="You're €100 over on dining out this month. Try cooking 2 more meals at home to stay on track!"
            actions={
              <div className="flex gap-2">
                <Button variant="primary-gold" size="sm">
                  Got it
                </Button>
                <Button variant="ghost" size="sm">
                  Adjust budget
                </Button>
              </div>
            }
          />
        </div>

        {/* Spending Trends */}
        <Card gradient="none" className="p-4">
          <h4 className="text-sm font-semibold text-white mb-3">This Week</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Monday</span>
              <span className="text-sm font-semibold text-white">€45</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Tuesday</span>
              <span className="text-sm font-semibold text-white">€32</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Wednesday</span>
              <span className="text-sm font-semibold text-white">€67</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Today</span>
              <span className="text-sm font-semibold text-yellow-400">€28</span>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <Button variant="secondary" size="sm" className="w-full justify-center">
              View Last Month
            </Button>
            <Button variant="secondary" size="sm" className="w-full justify-center">
              Export Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

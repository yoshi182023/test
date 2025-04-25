import { APIs } from "../services/api.js";

class GoalModel {
  constructor() {
    this.goals = [];
  }


  async fetchGoals() {
    try {
      this.goals = await APIs.getGoals();
      return this.goals;
    } catch (error) {
      console.error("Error fetching goals:", error);
      return [];
    }
  }

 
  async addGoal(goal) {
    try {
      const newGoal = await APIs.createGoal({
        ...goal,
        achieved: false,
      });
      this.goals.push(newGoal);
      return newGoal;
    } catch (error) {
      console.error("Error adding goal:", error);
      throw error;
    }
  }

  
  async updateGoal(id, updates) {
    try {
      // Find current goal
      const currentGoal = this.goals.find((goal) => goal.id === id);
      if (!currentGoal) {
        throw new Error(`Goal with ID ${id} not found`);
      }

      // Update on server
      const serverGoal = await APIs.updateGoal(id, updates);

      // Update local goals array
      const index = this.goals.findIndex((goal) => goal.id === id);
      if (index !== -1) {
        this.goals[index] = serverGoal;
      }

      return serverGoal;
    } catch (error) {
      console.error("Error updating goal:", error);
      throw error;
    }
  }


  async deleteGoal(id) {
    try {
      await APIs.deleteGoal(id);

      // Remove from local goals array
      this.goals = this.goals.filter((goal) => goal.id !== id);
      return true;
    } catch (error) {
      console.error("Error deleting goal:", error);
      throw error;
    }
  }


  getGoals() {
    return this.goals;
  }
}

export { GoalModel };

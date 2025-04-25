class GoalController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  
  async init() {
    // Bind event handlers
    this.view.bindEvents(
      this.handleFormSubmit.bind(this),
      this.handleAchieveGoal.bind(this)
    );

    // Load initial data
    await this.loadGoals();
  }

  async loadGoals() {
    try {
      await this.model.fetchGoals();
      this.view.renderGoals(this.model.getGoals());
    } catch (error) {
      console.error("Error loading goals:", error);
    }
  }


  async handleFormSubmit() {
    const formData = this.view.getFormData();

    // Validate form data
    if (!this.view.validateForm(formData)) {
      return;
    }

    try {
      const newGoal = await this.model.addGoal(formData);
      this.view.clearForm();
      this.view.renderGoals(this.model.getGoals());
    } catch (error) {
      console.error("Error adding goal:", error);
      alert("Failed to add goal. Please try again.");
    }
  }

  async handleAchieveGoal(id) {
    try {
      const goal = this.model.getGoals().find((g) => g.id === id);
      if (!goal) return;

      // Toggle achieved status
      const newStatus = !goal.achieved;
      const updatedGoal = await this.model.updateGoal(id, {
        achieved: newStatus,
      });

      // Update the UI
      this.view.updateGoalStatus(id, newStatus);
    } catch (error) {
      console.error("Error updating goal:", error);
      alert("Failed to update goal. Please try again.");
    }
  }
}

export { GoalController };

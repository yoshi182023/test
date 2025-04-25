class GoalView {
  constructor() {
    this.form = document.getElementById("goal-form");
    this.goalsContainer = document.getElementById("goals-container");

    // Form inputs
    this.descriptionInput = document.getElementById("description");
    this.categoryInput = document.getElementById("category");
    this.repetitionsInput = document.getElementById("repetitions");
  }

  getFormData() {
    return {
      description: this.descriptionInput.value.trim(),
      category: this.categoryInput.value,
      repetitions: this.repetitionsInput.value.trim(),
    };
  }

  clearForm() {
    this.form.reset();
  }

  renderGoals(goals) {
    this.goalsContainer.innerHTML = "";

    if (goals.length === 0) {
      this.goalsContainer.innerHTML =
        "<p>No fitness goals found. Add your first goal to get started!</p>";
      return;
    }

    goals.forEach((goal) => {
      this.renderGoal(goal);
    });
  }

  renderGoal(goal) {
    const goalElement = document.createElement("div");
    goalElement.className = `goal-card ${goal.achieved ? "achieved" : ""}`;
    goalElement.dataset.id = goal.id;

    goalElement.innerHTML = `
      <div class="goal-content">

    <span class="goal-description">
    ${goal.description} - <span class="goal-bold">${goal.category}</span> (${
      goal.repetitions
    })
  </span>
      </div>
      <div class="goal-actions">
        <button class="btn">${
          goal.achieved ? "Achieved ✓" : "Mark as Achieved"
        }</button>
      </div>
    `;

    const achieveButton = goalElement.querySelector(".btn");
    achieveButton.addEventListener("click", () => {
      this.onAchieveGoal(goal.id);
    });

    this.goalsContainer.appendChild(goalElement);
  }

  validateForm(formData) {
    if (!formData.description || !formData.category || !formData.repetitions) {
      alert("Please fill out all fields");
      return false;
    }
    return true;
  }

  updateGoalStatus(id, achieved) {
    const goalElement = document.querySelector(`.goal-card[data-id="${id}"]`);
    if (!goalElement) return;

    if (achieved) {
      goalElement.classList.add("achieved");
    } else {
      goalElement.classList.remove("achieved");
    }

    const button = goalElement.querySelector(".btn");
    button.textContent = achieved ? "Achieved ✓" : "Mark as Achieved";
  }

  bindEvents(handleFormSubmit, handleAchieveGoal) {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      handleFormSubmit();
    });

    this.onAchieveGoal = handleAchieveGoal;
  }
}

export { GoalView };

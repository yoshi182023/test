import { GoalModel } from "./models/GoalModel.js";
import { GoalView } from "./views/GoalView.js";
import { GoalController } from "./controllers/GoalController.js";

document.addEventListener("DOMContentLoaded", () => {
 
  const model = new GoalModel();
  const view = new GoalView();
  const controller = new GoalController(model, view);

  // Initialize the app
  controller.init();
});

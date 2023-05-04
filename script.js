const taskForm = document.getElementById("task-form");
const taskTableBody = document.getElementById("task-table-body");
const deleteButtons = document.getElementsByClassName("delete-task");
const timeRemaining = document.getElementById("time-remaining");

let totalTime = 24 * 60;

function updateTimeRemaining(minutes) {
  totalTime -= minutes;
  const hours = Math.floor(totalTime / 60);
  const minutesLeft = totalTime % 60;
  timeRemaining.innerText = `Time remaining: ${hours} hours, ${minutesLeft} minutes`;
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const taskName = document.getElementById("task-name").value;
  const taskStartTime = document.getElementById("task-start-time").value;
  const taskEndTime = document.getElementById("task-end-time").value;
  
  const startHours = parseInt(taskStartTime.split(":")[0]);
  const startMinutes = parseInt(taskStartTime.split(":")[1]);
  const endHours = parseInt(taskEndTime.split(":")[0]);
  const endMinutes = parseInt(taskEndTime.split(":")[1]);
  
  const totalMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (totalMinutes <= 0) {
    alert("Invalid time range: End time must be after start time.");
    return;
  } else if (totalTime - totalMinutes < 0) {
    alert("You've exceeded the time limit!");
    return;
  }

  updateTimeRemaining(totalMinutes);

  const taskRow = document.createElement("tr");
  const nameCell = document.createElement("td");
  const timeCell = document.createElement("td");
  const durationCell = document.createElement("td");
  const deleteCell = document.createElement("td");
  const deleteButton = document.createElement("button");

  nameCell.innerText = taskName;
  timeCell.innerText = `${taskStartTime} - ${taskEndTime}`;
  durationCell.innerText = `${hours} hours, ${minutes} minutes`;
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-task");

  deleteCell.appendChild(deleteButton);
  taskRow.appendChild(nameCell);
  taskRow.appendChild(timeCell);
  taskRow.appendChild(durationCell);
  taskRow.appendChild(deleteCell);
  taskTableBody.appendChild(taskRow);

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function () {
      const duration = this.parentNode.parentNode.querySelector("td:nth-child(3)").innerText;
      const hours = parseInt(duration.split(" ")[0]);
      const minutes = parseInt(duration.split(" ")[2]);
      updateTimeRemaining(-(hours * 60 + minutes));
      this.parentNode.parentNode.remove();
    });
  }

  taskForm.reset();
}); 
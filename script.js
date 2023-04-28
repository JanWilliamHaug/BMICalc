const btn = document.getElementById("calculate");
const ageInput = document.getElementById("age");
const genderInput = document.getElementById("gender");

btn.addEventListener("click", function () {
  let height = document.querySelector("#height").value;
  let weight = document.querySelector("#weight").value;
  let age = ageInput.value;
  let gender = genderInput.value;

  if (height == "" || weight == "" || age == "" || gender == "") {
    alert("Please fill out all input fields!");
    return;
  }

  // Input validation
  height = Math.abs(height);
  weight = Math.abs(weight);

  if (height > 300 || weight > 600) {
    alert("Please enter realistic values!");
    return;
  }

  // BMI = weight in KG / (height in m * height in m)
  height = height / 100;
  let BMI = weight / (height * height);
  BMI = BMI.toFixed(2);

  document.querySelector("#result").innerHTML = BMI;

  let status = "";
  const commentElement = document.querySelector(".comment");
  let tips = "";

  if (BMI < 18.5) {
    status = "Underweight";
    commentElement.style.backgroundColor = "#3f51b5";
    tips = "Consider eating more healthy foods to increase your weight.";
  } else if (BMI >= 18.5 && BMI < 25) {
    status = "Healthy";
    commentElement.style.backgroundColor = "#4caf50";
    tips = "Maintain your current lifestyle and diet to keep your BMI in the healthy range.";
  } else if (BMI >= 25 && BMI < 30) {
    status = "Overweight";
    commentElement.style.backgroundColor = "#ff9800";
    tips = "Consider making some lifestyle changes and incorporating exercise into your routine.";
  } else {
    status = "Obese";
    commentElement.style.backgroundColor = "#f44336";
    tips = "Consider consulting with a doctor or nutritionist to develop a weight loss plan.";
  }

  if (age >= 18) {
    if (gender === "male") {
      tips += " As a man, try to maintain a balanced diet and exercise regularly.";
    } else if (gender === "female") {
      tips += " As a woman, try to maintain a balanced diet and exercise regularly.";
    } else {
      tips += " Try to maintain a balanced diet and exercise regularly.";
    }
  } else {
    tips += " Since you're under 18, it's important to consult with a healthcare professional for personalized advice.";
  }

  commentElement.innerHTML = `Comment: you are <span>${status}</span>`;
  document.querySelector("#tips").innerHTML = tips;
});

// Reset button functionality
const resetBtn = document.getElementById("reset");

resetBtn.addEventListener("click", function () {
  document.querySelector("#height").value = "";
  document.querySelector("#weight").value = "";
  document.querySelector("#age").value = "";
  document.querySelector("#gender").value = "male";
  document.querySelector("#result").innerHTML = "00.00";
  document.querySelector(".comment").innerHTML = "";
  document.querySelector("#comment").style.backgroundColor = "transparent";
});

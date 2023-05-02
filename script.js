const btn = document.getElementById("calculate");
const ageInput = document.getElementById("age");
const genderInput = document.getElementById("gender");
const resultSection = document.querySelector(".result");

const statusTranslations = {
  underweight: {
    en: "underweight",
    no: "undervektig",
  },
  healthy: {
    en: "healthy",
    no: "Ssunn",
  },
  overweight: {
    en: "overweight",
    no: "overvektig",
  },
  obese: {
    en: "obese",
    no: "fedme",
  },
};

btn.addEventListener("click", function () {
  let height = document.querySelector("#height").value;
  let weight = document.querySelector("#weight").value;
  let age = ageInput.value;
  let gender = genderInput.value;
  let lang = languageSelect.value;
  let tipsTranslations = LANGUAGES[lang].norwegianCommentsTips;

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
    status = lang === "no" ? statusTranslations.underweight.no : statusTranslations.underweight.en;
    commentElement.style.backgroundColor = "#3f51b5";
    tips = lang === "no" ? tipsTranslations.underweight : "Consider eating more healthy foods to increase your weight.";
  } else if (BMI >= 18.5 && BMI < 25) {
    status = lang === "no" ? statusTranslations.healthy.no : statusTranslations.healthy.en;
    commentElement.style.backgroundColor = "#4caf50";
    tips = lang === "no" ? tipsTranslations.healthy : "Maintain your current lifestyle and diet to keep your BMI in the healthy range.";
  } else if (BMI >= 25 && BMI < 30) {
    status = lang === "no" ? statusTranslations.overweight.no : statusTranslations.overweight.en;
    commentElement.style.backgroundColor = "#ff9800";
    tips = lang === "no" ? tipsTranslations.overweight : "Consider making some lifestyle changes and incorporating exercise into your routine.";
  } else {
    status = lang === "no" ? statusTranslations.obese.no : statusTranslations.obese.en;
    commentElement.style.backgroundColor = "#f44336";
    tips = lang === "no" ? tipsTranslations.obese : "Consider consulting with a doctor or nutritionist to develop a weight loss plan.";
  }

  if (age >= 18) {
    if (gender === "male") {
      tips += lang === "no" ? tipsTranslations.male : " As a man, try to maintain a balanced diet and exercise regularly.";
    } else if (gender === "female") {
      tips += lang === "no" ? tipsTranslations.female : " As a woman, try to maintain a balanced diet and exercise regularly.";
    } else {
      tips += lang === "no" ? tipsTranslations.other : " Try to maintain a balanced diet and exercise regularly.";
    }
  } else {
    tips += lang === "no" ? tipsTranslations.under18 : " Since you're under 18, it's important to consult with a healthcare professional for personalized advice.";
  }


  commentElement.innerHTML = `${lang === "no" ? "Kommentar: Du er" : "Comment: You are"} <span>${status}</span>`;
  document.querySelector("#tips").innerHTML = tips;

  // Add the "show" class to the result section
  resultSection.classList.add("show");
  // GSAP animations for the result section
  gsap.from(".result.show #result", {
    duration: 0.5,
    scale: 0,
    ease: "back.out(1.7)",
  });
  gsap.from(".result.show p, .result.show #comment", {
    duration: 0.5,
    opacity: 0,
    y: -20,
    delay: 0.5,
    stagger: 0.2,
  });
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


  resultSection.classList.remove("show");
  // GSAP animations for resetting the result section
gsap.to(".result #result, .result p, .result #comment", {
  duration: 0.3,
  opacity: 0,
  y: -20,
  onComplete: function () {
    resultSection.classList.remove("show");
    gsap.set(".result #result, .result p, .result #comment", { clearProps: "all" });
  },
});
});

// Dark mode toggle
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});


// Language select
const languageSelect = document.getElementById("language");

languageSelect.addEventListener("change", () => {
  updateLanguage(languageSelect.value);
});

function updateLanguage(lang) {
  const langData = LANGUAGES[lang];

  document.getElementById("darkModeToggle").textContent = langData.toggleDarkMode;
  document.querySelector('label[for="height"]').textContent = langData.height;
  document.querySelector('label[for="weight"]').textContent = langData.weight;
  document.querySelector('label[for="age"]').textContent = langData.age;
  document.querySelector('label[for="gender"]').textContent = langData.gender;
  document.querySelector('option[value="other"]').textContent = langData.other;
  document.querySelector('option[value="male"]').textContent = langData.male;
  document.querySelector('option[value="female"]').textContent = langData.female;
  document.getElementById("calculate").textContent = langData.calculate;
  document.querySelector(".result p").textContent = langData.yourBMI;
  document.getElementById("reset").textContent = langData.reset;
}


updateLanguage("en");

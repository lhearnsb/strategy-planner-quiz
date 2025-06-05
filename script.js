// Handle Question Progression (One question per page)
const steps = document.querySelectorAll('.step');
let currentStep = 0;
const nextBtn = document.getElementById('nextBtn');

nextBtn.addEventListener('click', () => {
  const currentInputs = steps[currentStep].querySelectorAll('input[type="radio"]');
  const oneChecked = Array.from(currentInputs).some(input => input.checked);

  if (!oneChecked) {
    alert("Please select an answer.");
    return;
  }

  steps[currentStep].classList.remove('active');
  currentStep++;
  steps[currentStep].classList.add('active');

  // Change "Next" button to "Submit" on the last question
  if (currentStep === steps.length - 1) {
    nextBtn.textContent = "Submit";
  }
});

// Handle form submission and org type result
document.getElementById('quizForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Calculate structure and alignment scores
  let structure = 0, alignment = 0;

  // Get answers from the form and calculate the scores
  const formData = new FormData(this);
  for (let value of formData.values()) {
    let [s, a] = value.split(',').map(Number);
    structure += s;
    alignment += a;
  }

  // Determine Org Type based on scores
  let orgType = '';
  let orgDesc = '';

  // Example conditions based on structure and alignment
  if (structure >= 7 && alignment >= 7) {
    orgType = 'Mission Mover';
    orgDesc = 'You turn alignment into action. With clear goals, connected teams, and the right structure in place, your organization is ready for lift-off.';
  } else if (structure <= 6 && alignment >= 7) {
    orgType = 'Insight Seeker';
    orgDesc = 'You ask the right questions and crave better data to guide your decisions. You value strategy and reflection—but without the right tools, insights can get stuck in silos.';
  } else if (structure <= 6 && alignment <= 6) {
    orgType = 'Heart-Led Hustler';
    orgDesc = 'You lead with purpose, passion, and people in mind. Your mission inspires action—but without shared goals and structure, things can get chaotic.';
  } else if (structure >= 7 && alignment <= 6) {
    orgType = 'Resourceful Reactor';
    orgDesc = 'You’re scrappy, responsive, and always ready to adapt. When challenges pop up, your team finds a way—but without clear systems, it’s hard to sustain progress.';
  }

  // Hide the quiz form
  document.getElementById('quizForm').style.display = 'none';
  document.querySelector('h1').style.display = 'none';  // Hide quiz title
  document.querySelector('p.quiz-hero-subtitle').style.display = 'none';  // Hide quiz subtitle
  document.getElementById('nextBtn').style.display = 'none';  // Hide the Submit button

  // Show the result
  document.getElementById('result').style.display = 'block';
  document.getElementById('orgType').textContent = orgType;
  document.getElementById('orgDesc').textContent = orgDesc;

  // Show the "Download My Strategy Snapshot" button
  document.getElementById('downloadBtn').addEventListener('click', function() {
    document.getElementById('result').style.display = 'none';
    document.getElementById('emailForm').style.display = 'block';  // Show email form
  });
});

// Step 2: Handle Email Capture Form Submission
document.getElementById('emailCaptureForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = e.target.email.value;

  // You would send the email and other data to Google Apps Script or another service
  // For now, just simulate success by showing the thank you page

  document.getElementById('emailForm').style.display = 'none';  // Hide the email form
  document.getElementById('thankYou').style.display = 'block';  // Show the thank you page
});

// Optional: Handle the "Download Now" Button
document.getElementById('downloadNow').addEventListener('click', function() {
  // Trigger the PDF generation or file download
  // This could trigger a Google Apps Script to generate the shareable
  alert("Your shareable is ready for download!");
});

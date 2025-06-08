// Handle Question Progression (One question per page)
document.addEventListener('DOMContentLoaded', function() {
  const steps = document.querySelectorAll('.step');
  let currentStep = 0;
  const nextBtn = document.getElementById('nextBtn');

  // Make sure only the first step is visible initially
  steps.forEach((step, index) => {
    if (index === 0) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });

  nextBtn.addEventListener('click', () => {
    console.log("Next button clicked");

    const currentInputs = steps[currentStep].querySelectorAll('input[type="radio"]');
    const oneChecked = Array.from(currentInputs).some(input => input.checked);

    if (!oneChecked) {
      alert("Please select an answer.");
      return;
    }

    // If we're on the last question, submit the form
    if (currentStep === steps.length - 1) {
      document.getElementById('quizForm').dispatchEvent(new Event('submit'));
      return;
    }

    // Hide current step
    steps[currentStep].classList.remove('active');
    
    // Show next step
    currentStep++;
    steps[currentStep].classList.add('active');

    // Change "Next" button to "Submit" on the last question
    if (currentStep === steps.length - 1) {
      nextBtn.textContent = "Submit";
    }
  });
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
    orgDesc = 'You're scrappy, responsive, and always ready to adapt. When challenges pop up, your team finds a way—but without clear systems, it's hard to sustain progress.';
  }

  // Hide the quiz form
  document.getElementById('quizForm').style.display = 'none';
  document.querySelector('h1').style.display = 'none';
  document.querySelector('p.quiz-hero-subtitle').style.display = 'none';
  document.getElementById('nextBtn').style.display = 'none';

  // Show the result
  const resultDiv = document.getElementById('result');
  resultDiv.style.display = 'block';
  
  // Update the result content
  const orgTypeSpan = document.getElementById('orgType');
  const orgDescP = document.getElementById('orgDesc');
  
  if (orgTypeSpan) orgTypeSpan.textContent = orgType;
  if (orgDescP) orgDescP.textContent = orgDesc;

  // Add the buttons if they don't exist
  if (!document.querySelector('.result-buttons')) {
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'result-buttons';
    buttonsDiv.innerHTML = `
      <a href="/recommendations/${orgType.toLowerCase().replace(/\s+/g, '-')}" class="btn btn-secondary">See My Recommendations</a>
      <button id="downloadBtn" class="btn btn-primary">Get My Personal Strategy Planner</button>
    `;
    resultDiv.appendChild(buttonsDiv);

    // Add event listener to the download button
    document.getElementById('downloadBtn').addEventListener('click', function() {
      resultDiv.style.display = 'none';
      document.getElementById('emailForm').style.display = 'block';
    });
  }
});

// Initialize the email form HTML
const emailForm = document.getElementById('emailForm');
if (emailForm) {
  emailForm.innerHTML = `
    <h3>Unlock Your Personalized Strategy Planner</h3>
    <p class="subhead">Based on your quiz results, this one-page guide helps you reflect, plan, and take action—on your own or with your team.</p>
    
    <div class="benefits">
      <h4>What You'll Get:</h4>
      <ul>
        <li>🧠 A summary of your org type + quadrant placement</li>
        <li>💬 Coaching-style prompts to spark reflection and discussion</li>
        <li>🧭 Planning questions to align your team</li>
        <li>🚀 Clear action steps to move your mission forward</li>
      </ul>
    </div>

    <form id="emailCaptureForm">
      <input type="email" name="email" placeholder="📧 Email Address" required />
      <input type="text" name="name" placeholder="👤 Name (optional)" />
      <input type="text" name="orgName" placeholder="🏢 Organization Name (optional)" />
      <input type="text" name="title" placeholder="🪪 Title/Role (optional)" />
      <div class="checkbox-wrapper">
        <input type="checkbox" id="newsletter" name="newsletter" />
        <label for="newsletter">Keep me posted on new tools and trainings</label>
      </div>
      <button type="submit" class="btn btn-primary">Send My Personalized Planner</button>
      <p class="trust-message">We respect your time and inbox. No spam—just helpful tools.</p>
    </form>
  `;
}

// Handle Email Capture Form Submission
document.addEventListener('submit', function(e) {
  if (e.target.id === 'emailCaptureForm') {
    e.preventDefault();
    const email = e.target.email.value;

    // You would send the email and other data to Google Apps Script or another service
    // For now, just simulate success by showing the thank you page
    document.getElementById('emailForm').style.display = 'none';
    document.getElementById('thankYou').style.display = 'block';
  }
});

// Handle the "Download Now" Button
document.addEventListener('click', function(e) {
  if (e.target.id === 'downloadNow') {
    // Trigger the PDF generation or file download
    alert("Your shareable is ready for download!");
  }
});

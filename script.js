import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";



document.addEventListener('DOMContentLoaded', function () {
  const firebaseConfig = {
    apiKey: "AIzaSyDTrpHZXLETnvxfTlKlbNl2f2gMwnC_H20",
    authDomain: "medicare-authentication-4ebe1.firebaseapp.com",
    projectId: "medicare-authentication-4ebe1",
    storageBucket: "medicare-authentication-4ebe1.appspot.com",
    messagingSenderId: "279684560122",
    appId: "1:279684560122:web:d1ff8afd661a6d59028543",
    measurementId: "G-B3BN3129CG"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

  const loginBtn = document.getElementById('loginBtn');
  const loginModal = document.getElementById('loginModal');
  const closeModal = document.getElementById('closeModal');
  const authForm = document.getElementById('authForm');
  const modalTitle = document.getElementById('modalTitle');
  const submitBtn = document.getElementById('submitBtn');
  const toggleBtn = document.getElementById('toggleBtn');
  const toggleText = document.getElementById('toggleText');

  let isLoginMode = true; // start in Login mode

  // Show modal
  loginBtn.addEventListener('click', () => {
    loginModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    setMode(true); // default Login mode
  });

  // Close modal handlers
  closeModal.addEventListener('click', closeModalFunc);
  loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
      closeModalFunc();
    }
  });

  function closeModalFunc() {
    loginModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    authForm.reset();
  }

  // Toggle between Login and Sign Up modes
  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    setMode(!isLoginMode);
  });

  // Set form mode and update UI text
  function setMode(loginMode) {
    isLoginMode = loginMode;
    if (isLoginMode) {
      modalTitle.textContent = 'Login';
      submitBtn.textContent = 'Login';
      toggleText.textContent = "Don't have an account?";
      toggleBtn.textContent = 'Sign Up';
    } else {
      modalTitle.textContent = 'Sign Up';
      submitBtn.textContent = 'Sign Up';
      toggleText.textContent = "Already have an account?";
      toggleBtn.textContent = 'Login';
    }
  }

  // Handle form submit for both login and signup
  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = authForm['email'].value;
    const password = authForm['password'].value;

    if (isLoginMode) {
      // Login
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          alert(`Logged in successfully as ${userCredential.user.email}`);
          closeModalFunc();
        })
        .catch(error => {
          alert(`Login failed: ${error.message}`);
        });
    } else {
      // Sign Up
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          alert(`Signed up successfully as ${userCredential.user.email}`);
          closeModalFunc();
        })
        .catch(error => {
          alert(`Sign up failed: ${error.message}`);
        });
    }
  });
});


  function animateCounter(el) {
    const target = +el.getAttribute('data-count');
    const duration = 4000; // total duration in ms
    const stepTime = 15;
    let current = 0;
    const increment = target / (duration / stepTime);

    const counter = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target.toLocaleString();
        clearInterval(counter);
      } else {
        el.textContent = Math.floor(current).toLocaleString();
      }
    }, stepTime);
  }

  function startCountersWhenVisible() {
    const counters = document.querySelectorAll('[data-count]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target); // only run once
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(counter => observer.observe(counter));
  }

  window.addEventListener('DOMContentLoaded', startCountersWhenVisible);


// Hero section animation
const hero = document.getElementById('hero-bg');

// Your images, starting from the second one
const images = [
  'images/bg-2.jpg'
];

let index = 0;

// Start image rotation after 3 seconds
setTimeout(() => {
  setInterval(() => {
    hero.style.backgroundImage = `url('${images[index]}')`;
    index = (index + 1) % images.length;
  }, 2000);
}, 2000);


//lab report
  document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const tableBody = document.getElementById('reportTable');
    const originalRows = Array.from(tableBody.querySelectorAll("tr")).map(row => row.cloneNode(true));

    searchInput.addEventListener('input', () => filterReports(searchInput.value.trim().toLowerCase()));

    document.querySelectorAll('.download-btn').forEach(button => {
      button.addEventListener('click', () => {
        const fileName = button.getAttribute('data-file');
        alert("Starting download for: " + fileName);
      });
    });

    function filterReports(input) {
      tableBody.innerHTML = ''; // Clear the table

      if (input === '') {
        // Restore original table if input is empty
        originalRows.forEach(row => tableBody.appendChild(row.cloneNode(true)));
        return;
      }

      const matched = [];

      originalRows.forEach(originalRow => {
        const row = originalRow.cloneNode(true);
        const nameCell = row.querySelector("td");
        const originalName = nameCell.getAttribute("data-name");
        const lowerName = originalName.toLowerCase();

        if (lowerName.includes(input)) {
          // Highlight match
          const highlightedName = originalName.replace(new RegExp(`(${input})`, "gi"), '<mark>$1</mark>');
          nameCell.innerHTML = highlightedName;
          matched.push(row);
        }
      });

      matched.forEach(row => tableBody.appendChild(row));
    }
  });


  //responsive 
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu = document.getElementById('closeMenu');

  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');
  });

  closeMenu.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });


  //box animation 
  document.addEventListener("DOMContentLoaded", function () {
    const appearElements = document.querySelectorAll('.animate-appear');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.2
    });

    appearElements.forEach(el => {
      observer.observe(el);
    });
  });

  //loading line
document.addEventListener("DOMContentLoaded", () => {
  const loadingBar = document.getElementById('loading-bar');

  if (!loadingBar) return; // safety check

  let width = 0;
  const interval = setInterval(() => {
    width += Math.random() * 2;
    if (width < 90) {
      loadingBar.style.width = width + '%';
    }
  }, 200);

  window.addEventListener('load', () => {
    clearInterval(interval);
    loadingBar.style.width = '100%';
    setTimeout(() => {
      loadingBar.style.opacity = '0';
    }, 400);
    setTimeout(() => {
      loadingBar.remove();
    }, 1000);
  });
});





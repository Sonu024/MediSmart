const serviceItems = document.querySelectorAll('.line-hover');
  const heroImg = document.getElementById('hero-img');
  const heroTitle = document.getElementById('hero-title');
  const heroText = document.getElementById('hero-text');
  const cardsContainer = document.getElementById('service-cards');

  serviceItems.forEach(item => {
    item.addEventListener('click', () => {
      const heroImage = item.getAttribute('data-hero-img');
      const title = item.getAttribute('data-hero-title');
      const text = item.getAttribute('data-hero-text');
      const cards = JSON.parse(item.getAttribute('data-cards'));

      heroImg.src = heroImage;
      heroTitle.textContent = title;
      heroText.textContent = text;

      cardsContainer.innerHTML = '';
      cards.forEach(card => {
        cardsContainer.innerHTML += `
          <div class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <img src="${card.img}" alt="${card.title}" class="w-full h-40 object-cover rounded" />
            <h4 class="text-xl font-semibold mt-4 text-blue-700">${card.title}</h4>
            <p class="text-gray-600 mt-2">${card.desc}</p>
          </div>
        `;
      });
    });
  });

  document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Appointment submitted successfully!');
    this.reset();
  });
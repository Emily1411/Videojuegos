const API_KEY = '320b0c9721584213bc116e0d937e72fc';
const CARDS_PER_PAGE = 10;

let currentPage = 1;
let allGames = [];

const fetchGames = async () => {
  try {
    const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=${30}&page=${80}`);
    const data = await response.json();
    allGames = data.results;
    renderPage(currentPage);
    updatePageIndicator();
  } catch (error) {
    console.error('Error al obtener los juegos:', error);
  }
};

const renderPage = (page) => {
  const container = document.getElementById('games-container');
  container.innerHTML = '';

  const start = (page - 1) * CARDS_PER_PAGE;
  const end = start + CARDS_PER_PAGE;
  const gamesToShow = allGames.slice(start, end);

  gamesToShow.forEach(game => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${game.background_image}" alt="${game.name}">
      <h2>${game.name}</h2>
      <small>Fecha de lanzamiento: ${game.released || 'N/A'}</small><br/>
      <small>Última actualización: ${game.updated || 'N/A'}</small>
      <div class="platforms">
        <strong>Plataformas:</strong> ${game.platforms.map(p => p.platform.name).join(', ')}
      </div>
      <div class="stores">
        <strong>Tiendas:</strong>
        ${game.stores ? game.stores.map(store =>
          `<a href="https://${store.store.domain}" target="_blank">${store.store.name}</a>`
        ).join('') : 'N/A'}
      </div>
    `;
    container.appendChild(card);
  });
};

const updatePageIndicator = () => {
  document.getElementById('page-indicator').innerText = `Página ${currentPage}`;
};

document.getElementById('prev-btn').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
    updatePageIndicator();
  }
});

document.getElementById('next-btn').addEventListener('click', () => {
  const maxPage = Math.ceil(allGames.length / CARDS_PER_PAGE);
  if (currentPage < maxPage) {
    currentPage++;
    renderPage(currentPage);
    updatePageIndicator();
  }
});

// Iniciar app
fetchGames();

// Data: Satara district tourist places
// Each item: { id, name, category, location, description, image }
const PLACES = [
  {
    id: 'kaas-plateau',
    name: 'Kaas Plateau (Valley of Flowers)',
    category: 'nature',
    location: 'Kaas, Satara',
    description: 'UNESCO World Natural Heritage site famous for seasonal wildflowers (Aug–Oct), scenic meadows, and laterite plateaus.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'thoseghar-waterfall',
    name: 'Thoseghar Waterfall',
    category: 'waterfall',
    location: 'Thoseghar, Satara',
    description: 'A series of roaring monsoon falls plunging into a deep valley. Best viewed from designated platforms.',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'sajjangad-fort',
    name: 'Sajjangad Fort',
    category: 'fort',
    location: 'Satara',
    description: 'Historic fort and the final resting place of Sant Ramdas. Offers panoramic views and a serene spiritual vibe.',
    image: 'https://images.unsplash.com/photo-1549893079-842e6e06a1a8?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'ajinkyatara-fort',
    name: 'Ajinkyatara Fort',
    category: 'fort',
    location: 'Satara city',
    description: 'Dominant hill fort overlooking Satara city, popular for sunrise/sunset hikes and historic bastions.',
    image: 'https://images.unsplash.com/photo-1523419409543-8a85d797a2f8?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'kaas-lake',
    name: 'Kaas Lake',
    category: 'nature',
    location: 'Near Kaas Plateau',
    description: 'Calm reservoir surrounded by forests and rolling Sahyadri hills. Great for relaxed picnics.',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'sajjangad-temple',
    name: 'Sajjangad Temple Complex',
    category: 'temple',
    location: 'Sajjangad, Satara',
    description: 'Temple complex and Samadhi of Sant Ramdas. Pilgrimage spot with community meals and monastery.',
    image: 'https://images.unsplash.com/photo-1549643276-fdf2fab55884?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'kasarsai-view',
    name: 'Kaas Viewpoint Ridge',
    category: 'viewpoint',
    location: 'Kaas Ghat section',
    description: 'Winding ghat viewpoint with dramatic cliffs, misty monsoons, and sweeping valley vistas.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'mayani-bird-sanctuary',
    name: 'Mayani Bird Sanctuary',
    category: 'nature',
    location: 'Mayani, Satara',
    description: 'Wetland sanctuary attracting migratory birds; best visited in winter mornings.',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'pratapgad-fort',
    name: 'Pratapgad Fort (Nearby)',
    category: 'fort',
    location: 'Near Mahabaleshwar (Satara district)',
    description: 'Iconic Maratha fort associated with Chhatrapati Shivaji Maharaj; short drive from Mahabaleshwar.',
    image: 'https://images.unsplash.com/photo-1605721931616-9fbb0e87a5a0?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'mahabaleshwar-temple',
    name: 'Mahabaleshwar Temple',
    category: 'temple',
    location: 'Old Mahabaleshwar',
    description: 'Ancient shrine dedicated to Lord Shiva with Hemadpanti architecture surrounded by forests.',
    image: 'https://images.unsplash.com/photo-1601758064138-16786cf1b2a1?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'mapro-garden',
    name: 'Mapro Garden (Mahabaleshwar)',
    category: 'museum',
    location: 'Panchgani-Mahabaleshwar Road',
    description: 'Strawberry themed garden and factory outlet with eateries; popular family stop.',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1200&auto=format&fit=crop'
  }
];

function createCard(place) {
  const card = document.createElement('article');
  card.className = 'card';
  card.setAttribute('data-category', place.category);

  const img = document.createElement('img');
  img.src = place.image;
  img.alt = place.name;
  img.loading = 'lazy';

  const body = document.createElement('div');
  body.className = 'card-body';

  const title = document.createElement('h4');
  title.className = 'card-title';
  title.textContent = place.name;

  const meta = document.createElement('div');
  meta.className = 'card-meta';
  meta.textContent = `${place.location} • ${capitalize(place.category)}`;

  const desc = document.createElement('p');
  desc.className = 'card-desc';
  desc.textContent = place.description;

  body.appendChild(title);
  body.appendChild(meta);
  body.appendChild(desc);

  card.appendChild(img);
  card.appendChild(body);
  return card;
}

function renderGrid(places) {
  const grid = document.getElementById('placesGrid');
  grid.innerHTML = '';
  places.forEach(p => grid.appendChild(createCard(p)));
  document.getElementById('emptyState').hidden = places.length !== 0;
}

function setupFilters() {
  const input = document.getElementById('searchInput');
  const select = document.getElementById('categoryFilter');

  function apply() {
    const term = input.value.trim().toLowerCase();
    const cat = select.value;
    const filtered = PLACES.filter(p => {
      const matchesText = !term || (
        p.name.toLowerCase().includes(term) ||
        p.location.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
      const matchesCat = cat === 'all' || p.category === cat;
      return matchesText && matchesCat;
    });
    renderGrid(filtered);
  }

  input.addEventListener('input', apply);
  select.addEventListener('change', apply);
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Optional: Override images with S3 links. Replace placeholders with your actual S3 object URLs.
  const S3_IMAGE_OVERRIDES = {
    'kaas-plateau': 'https://place-photos-mh11.s3.eu-north-1.amazonaws.com/kass-pathar.jpg',
     'ajinkyatara-fort': 'https://place-photos-mh11.s3.eu-north-1.amazonaws.com/ajinkytara+fort.jpg',
     'sajjangad-fort': 'https://place-photos-mh11.s3.eu-north-1.amazonaws.com/sajjangad+fort.jpg',
     'mahabaleshwar-temple': 'https://place-photos-mh11.s3.eu-north-1.amazonaws.com/mahabaleshwar+temple.jpg'
  };

  // Limit to the requested four places
  const ALLOWED_IDS = new Set(['kaas-plateau', 'ajinkyatara-fort', 'sajjangad-fort', 'mahabaleshwar-temple']);
  const selected = PLACES.filter(p => ALLOWED_IDS.has(p.id)).map(p => ({
    ...p,
    image: S3_IMAGE_OVERRIDES[p.id] || p.image
  }));

  renderGrid(selected);
  // Disable filters as we are showing fixed set; or keep working on selected
  const input = document.getElementById('searchInput');
  const select = document.getElementById('categoryFilter');
  if (input && select) {
    input.addEventListener('input', () => {
      const term = input.value.trim().toLowerCase();
      const cat = select.value;
      const filtered = selected.filter(p => {
        const matchesText = !term || (
          p.name.toLowerCase().includes(term) ||
          p.location.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
        );
        const matchesCat = cat === 'all' || p.category === cat;
        return matchesText && matchesCat;
      });
      renderGrid(filtered);
    });
    select.addEventListener('change', () => {
      input.dispatchEvent(new Event('input'));
    });
  }

  // Click to open image in a new tab (S3-ready)
  document.getElementById('placesGrid').addEventListener('click', (e) => {
    const img = e.target.closest('.card img');
    if (!img) return;
    window.open(img.src, '_blank', 'noopener');
  });
});





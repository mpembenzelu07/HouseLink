// Generate property cards dynamically
const propertiesGrid = document.querySelector('.properties-listing .properties-grid');

const properties = [
    {
        id: 1,
        title: "Bedsitter Sinza",
        location: "Sinza, Dar es Salaam",
        price: "135,000",
        type: "Bedsitter",
        bedrooms: "Studio",
        bathrooms: "1",
        size: "35 m²",
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        featured: false,
        available: true
    },
    // Add more properties here...
];

function generatePropertyCard(property) {
    return `
        <div class="property-card">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}">
                <span class="property-badge">${property.available ? 'Inapatikana' : 'Imechukuliwa'}</span>
                <button class="favorite-btn"><i class="far fa-heart"></i></button>
            </div>
            <div class="property-info">
                <h3>${property.title}</h3>
                <p class="property-location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                <p class="property-description">${property.description || 'Nyumba nzuri yenye vifaa vyote vya msingi...'}</p>
                <div class="property-features">
                    <span><i class="fas fa-bed"></i> ${property.bedrooms}</span>
                    <span><i class="fas fa-bath"></i> ${property.bathrooms}</span>
                    <span><i class="fas fa-ruler-combined"></i> ${property.size}</span>
                </div>
                <div class="property-price">
                    <h4>TZS ${property.price} <span>/mwezi</span></h4>
                    <a href="property-detail.html?id=${property.id}" class="btn btn-primary">Angalia Zaidi</a>
                </div>
            </div>
        </div>
    `;
}

// Generate initial properties
properties.forEach(property => {
    propertiesGrid.innerHTML += generatePropertyCard(property);
});

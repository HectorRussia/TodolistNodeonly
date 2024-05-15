
/*<form action="/dashboard/working/edit" method="post">
<div class="container">
    <div class="card-container" id="cardContainer">
        <!-- Existing cards here (if any) -->
        <!-- Cards will be dynamically added here -->
    </div>
</div>                            
</form> */


    document.addEventListener('DOMContentLoaded', function() {
        const addCardIcon = document.getElementById('addCardIcon');
        const cardContainer = document.getElementById('cardContainer');

        addCardIcon.addEventListener('click', function() {
            const newCard = `
                <div class="col-md-3 mb-3">
                    <div class="card text-white bg-primary">
                        <div class="card-header">Header <i class="fa-solid fa-trash fa-xs fa-trash"></i></div>

                        <div class="card-body">
                            <h5 class="card-title">Primary card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
            `;

            cardContainer.insertAdjacentHTML('beforeend', newCard);

            // Save added card information to local storage
            const allCards = cardContainer.innerHTML;
            localStorage.setItem('addedCards', allCards);
        });

        // Retrieve and render added cards from local storage
        const savedCards = localStorage.getItem('addedCards');
        if (savedCards) {
            cardContainer.innerHTML = savedCards;
        }

        // Delete card when trash icon is clicked
        cardContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('fa-trash')) 
            {
                if (window.confirm("Are you sure you want to delete?"))
                {
                    const card = event.target.closest('.col-md-3');
                    if (card) 
                    {
                        card.remove();

                    // Update local storage
                    const allCards = cardContainer.innerHTML;
                    localStorage.setItem('addedCards', allCards);
                    }
                }
            }

        });
    });

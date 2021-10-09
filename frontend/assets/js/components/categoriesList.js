const categoriesList = {
    init: function() {

        // Chargement des catégories
        categoriesList.loadCategoriesFromAPI();

    },

    /**
     * Chargement de la liste des catégories depuis l'API
     */
    loadCategoriesFromAPI: function() {

        // Options de la requête
        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };
        
        // Exécution de la requête HTTP via XHR
        fetch(app.apiBaseUrl + '/categories', fetchOptions)
        .then(
            function(response) {
                return response.json();
            }
        )
        .then(
            function(data) {
                // Création des options pour les deux select de l'interface
                for (let category of data) {
                    categoriesList.createOptionElement( document.getElementById('filterCategorySelect'), category.name, category.id );
                    categoriesList.createOptionElement( document.getElementById('addTaskForm-selectCategory'), category.name, category.id );
                }
            }
        );
    },

    /**
     * Méthode permettant la création d'options dans un select
     * 
     * @param {*} selectElement 
     * @param {string} categoryName 
     * @param {int} categoryId 
     */
    createOptionElement: function(selectElement, categoryName, categoryId) {
        let optionElement = document.createElement('option');
        optionElement.textContent = categoryName;
        optionElement.setAttribute('value', categoryId);

        selectElement.appendChild(optionElement);
    }
}
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
                console.log(data);

            }
        );
    }
}
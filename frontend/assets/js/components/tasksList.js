const tasksList = {
    init: function() {

        // Chargement des tâches depuis l'API
        tasksList.loadTasksFromAPI();

    },

    /**
     * Chargement de la liste des tâches depuis l'API
     */
    loadTasksFromAPI: function() {

        // Options de la requête
        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

        // Exécution de la requête HTTP via XHR
        fetch(app.apiBaseUrl + '/tasks', fetchOptions)
        .then(
            function(response) {
                return response.json();
            }
        )
        .then(
            function(data) {
                // Pour chaque tâche retournée par l'API, on crée une tâche dans le DOM
                for (let taskObject of data) {
                    task.createTaskElement(taskObject);
                }
            }
        );
    }
}
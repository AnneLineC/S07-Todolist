const tasksList = {
    init: function () {

        // Chargement des tâches depuis l'API
        tasksList.loadTasksFromAPI();

    },

    /**
     * Chargement de la liste des tâches depuis l'API
     */
    loadTasksFromAPI: function () {

        // Options de la requête
        let fetchOptions = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

        // Exécution de la requête HTTP via XHR
        fetch(app.apiBaseUrl + '/tasks', fetchOptions)
            .then(
                function (response) {
                    return response.json();
                }
            )
            .then(
                function (data) {
                    // Pour chaque tâche retournée par l'API, on crée une tâche dans le DOM
                    for (let taskObject of data) {
                        task.createTaskElement(taskObject);
                    }

                    // On cache ensuite par défaut les tâches archivées
                    tasksList.hideArchiveTasks();
                }
            );
    },

    /**
     * Permet de cacher les tâches archives
     */
    hideArchiveTasks: function () {
        const tasksElement = document.querySelectorAll(".task");

        for (let taskElement of tasksElement) {
            if (taskElement.classList.contains("task--archive")) {
                taskElement.style.display = "none";
            } else {
                taskElement.style.display = "block";
            }
        }
    },

    /**
     * Permet d'afficher les tâches archives et de cacher les tâches actives
     */
    showArchiveTasks: function () {
        const tasksElement = document.querySelectorAll(".task");

        for (let taskElement of tasksElement) {
            if (taskElement.classList.contains("task--archive")) {
                taskElement.style.display = "block";
            } else {
                taskElement.style.display = "none";
            }
        }
    }
}
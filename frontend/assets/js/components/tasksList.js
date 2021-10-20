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
                // console.log(data);
                // Pour chaque tâche retournée par l'API, on crée une tâche dans le DOM
                for (let taskObject of data) {
                    task.createTaskElement(taskObject);
                }

                // On cache ensuite par défaut les tâches archivées
                tasksList.hideArchiveTasks();
            }
        );

    },

    //* ----------------------------------------------------------------
    //* DOM
    //* ----------------------------------------------------------------

    /**
     * Permet de cacher les tâches archives et d'afficher les tâches actives
     */
    hideArchiveTasks: function (categoryId = 0) {
        const listTitleElement = document.querySelector('.list-title');
        listTitleElement.textContent = 'Liste des tâches';

        const addFormElement = document.querySelector('#addTaskForm');
        addFormElement.style.display = 'flex';

        const tasksElement = document.querySelectorAll('.task');

        for (let taskElement of tasksElement) {

            if (taskElement.classList.contains('task--archive')) {
                // Si la tâche est archivée, on ne l'affiche pas
                taskElement.style.display = 'none';

            } else {
                // Sinon, on filtre par catégorie
                tasksList.applyCategoryFilter(taskElement, categoryId);
            }
        }
    },

    /**
     * Permet d'afficher les tâches archives et de cacher les tâches actives
     */
    showArchiveTasks: function (categoryId) {
        const listTitleElement = document.querySelector('.list-title');
        listTitleElement.textContent = 'Archives';

        const addFormElement = document.querySelector('#addTaskForm');
        addFormElement.style.display = 'none';

        const tasksElement = document.querySelectorAll('.task');

        for (let taskElement of tasksElement) {

            if (taskElement.classList.contains('task--archive')) {
                // Si la tâche est archivée, on filtre par catégorie
                tasksList.applyCategoryFilter(taskElement, categoryId);
            } else {
                // Sinon, la tâche n'est pas affichée
                taskElement.style.display = 'none';
            }
        }
    },

    /**
     * Permet de cacher par défaut toutes les tâches sauf celles de la catégorie séléctionnée
     */
    showTasksFilteredByCategory: function (categoryId) {
        const tasksElement = document.querySelectorAll('.task');

        for (let taskElement of tasksElement) {

            // Si on a demandé l'affichage des tâches actives
            if (filters.showArchivedTasks === false) {
                if (taskElement.classList.contains('task--archive')) {
                    // Si la tâche est archivée, on la laisse cachée

                } else {
                    // Sinon, on filtre la tâche par catégorie
                    tasksList.applyCategoryFilter(taskElement, categoryId);
                }

            // Si on a demandé l'affichage des tâche archivées
            } else {
                if (taskElement.classList.contains('task--archive')) {
                    // Si la tâche est archivée, on filtre la tâche par catégorie
                    tasksList.applyCategoryFilter(taskElement, categoryId);
                } else {
                    // Sinon, on laisse la tâche cachée
                }
            }
        }
    },

    /**
     * Permet de gérer si une tâche doit être affichée ou non, 
     * en fonction de l'ID de la catégorie utilisée pour le filtre
     */
    applyCategoryFilter: function(taskElement, categoryId) {
        if (categoryId == 0) {
            taskElement.style.display = 'block';
        } else if (taskElement.dataset.categoryId == categoryId) {
            taskElement.style.display = 'block';
        } else {
            taskElement.style.display = 'none';
        }
    },

}
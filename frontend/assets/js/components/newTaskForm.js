const newTaskForm = {

    init: function() {

        const addTaskFormElement = document.getElementById('addTaskForm');
        addTaskFormElement.addEventListener('submit', newTaskForm.handleAddTaskFormSubmit);

    },

    handleAddTaskFormSubmit: function(event) {

        event.preventDefault();

        const newTaskTitleInput = document.getElementById('addTaskForm-titleInput');
        const newTaskTitleValue = newTaskTitleInput.value;

        const newTaskCategoryInput = document.getElementById('addTaskForm-selectCategory');
        const newTaskCategoryValue = newTaskCategoryInput.value;

        // ---------------------------
        // Requête à l'API
        // ---------------------------

        let data = { 
            title: newTaskTitleValue,
            categoryId: newTaskCategoryValue,
        };

        // Entêtes HTTP (headers) de la requête
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        // Options de la requête
        let fetchOptions = {
            method  : 'POST',
            mode    : 'cors',
            cache   : 'no-cache',
            headers : httpHeaders,
            body    : JSON.stringify(data)
        };

        // Exécution de la requête HTTP via XHR
        fetch(app.apiBaseUrl + 'tasks', fetchOptions)
        .then(function(response) {
            if (response.status == 201) {

                response.json().then(function(newTask) {
                    
                    task.createTaskElement(newTask);

                });

            } else {
                alert('Erreur lors de l\'ajout en base de données');
            }
        });
        



    }

}
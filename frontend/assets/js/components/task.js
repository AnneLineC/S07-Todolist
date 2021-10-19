const task = {

    //* ----------------------------------------------------------------
    //* EVENTS
    //* ----------------------------------------------------------------

    bindSingleTaskEvents: function(taskElement) {

        // Evènement permettant l'édition du titre de la tâche
        const taskTitleLabelElement = taskElement.querySelector('.task__title-label');
        taskTitleLabelElement.addEventListener('click', task.handleTaskTitleLabelClick);

        // Evènements permettant l'enregistrement du titre édité de la tâche
        const taskTitleFieldElement = taskElement.querySelector('.task__title-field');
        taskTitleFieldElement.addEventListener('blur', task.handleValidateNewTaskTitle);
        taskTitleFieldElement.addEventListener('keydown', task.handleValidateNewTaskTitleOnKeyDown);

        // Evènements la complétion/décomplétion de la tâche
        const buttonCompleteElement = taskElement.querySelector('.task__list-item--complete');
        buttonCompleteElement.addEventListener('click',task.handleCompleteTaskClick);
        const buttonIncompleteElement = taskElement.querySelector('.task__list-item--incomplete');
        buttonIncompleteElement.addEventListener('click',task.handleIncompleteTaskClick);

        // Evènements de l'archivage/désarchivage de la tâche
        const buttonArchiveElement = taskElement.querySelector('.task__list-item--archive');
        buttonArchiveElement.addEventListener('click',task.handleArchiveTaskClic);
        const buttonDesarchiveElement = taskElement.querySelector('.task__list-item--desarchive');
        buttonDesarchiveElement.addEventListener('click',task.handleDesarchiveTaskClic);

    },

    //* ----------------------------------------------------------------
    //* HANDLERS
    //* ----------------------------------------------------------------

    handleTaskTitleLabelClick: function(event) {

        // Récupération de la tâche sur laquelle le click a eu lieu
        const taskElement = event.currentTarget.closest( ".task" );
        
        // Rajout de la classe CSS à la tâche, permettant son passage en mode "édition"
        taskElement.classList.add('task--edit');

        // Focus dans le champ, à la fin du texte
        const titleFieldElement = taskElement.querySelector('.task__title-field');
        titleFieldElement.selectionStart = titleFieldElement.selectionEnd = titleFieldElement.value.length;
        titleFieldElement.focus();

    },

    handleValidateNewTaskTitle: function(event) {

        // Récupération de la valeur fournie
        const titleFieldElement = event.currentTarget;
        let newTitleFieldElement = titleFieldElement.value;

        // Récupération de l'id de la tâche éditée
        const taskId = titleFieldElement.closest('.task').dataset.id;

        // ---------------------------
        // Requête à l'API
        // ---------------------------

        let data = { 
            title : newTitleFieldElement,
        };

        // Entêtes HTTP (headers) de la requête
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        // Options de la requête
        let fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            headers : httpHeaders,
            body    : JSON.stringify(data)
        };

        // Exécution de la requête HTTP via XHR
        fetch(app.apiBaseUrl + 'tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
                if (response.status == 204) {

                    taskElement = titleFieldElement.closest('.task');

                    // Mise à jour du titre de la tâche dans l'élément p
                    const titleLabelElement = taskElement.querySelector('.task__title-label');
                    titleLabelElement.textContent = newTitleFieldElement;

                    // Sortie du mode édition
                    taskElement.classList.remove('task--edit');

                    console.log('Tâche modifiée');
                    
                } else {
                    alert('Erreur lors de la modification en base de données');
                }
            }
        );

    },

    handleValidateNewTaskTitleOnKeyDown: function(event) {
        if(event.key === "Enter") {
            const titleFieldElement = event.currentTarget;
            titleFieldElement.blur();
        }
    },

    handleCompleteTaskClick: function(event) {
        
        const buttonElement = event.currentTarget;
        const taskElement = buttonElement.closest('.task');
        taskId = taskElement.dataset.id;

        // ---------------------------
        // Requête à l'API
        // ---------------------------

        let data = { 
            completion : 1
        };

        // Entêtes HTTP (headers) de la requête
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        // Options de la requête
        let fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            headers : httpHeaders,
            body    : JSON.stringify(data)
        };

        // Exécution de la requête HTTP via XHR
        fetch(app.apiBaseUrl + 'tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
                if (response.status == 204) {

                    task.changeTaskCompletion(taskElement);
                    console.log('Tâche modifiée');
                    
                } else {
                    alert('Erreur lors de la modification en base de données');
                }
            }
        );

    },

    handleIncompleteTaskClick: function(event) {
        
        const buttonElement = event.currentTarget;
        const taskElement = buttonElement.closest('.task');
        taskId = taskElement.dataset.id;

        // ---------------------------
        // Requête à l'API
        // ---------------------------

        let data = { 
            completion : 0
        };

        // Entêtes HTTP (headers) de la requête
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        // Options de la requête
        let fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            headers : httpHeaders,
            body    : JSON.stringify(data)
        };

        // Exécution de la requête HTTP via XHR
        fetch(app.apiBaseUrl + 'tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
                if (response.status == 204) {

                    task.changeTaskCompletion(taskElement);
                    console.log('Tâche modifiée');
                    
                } else {
                    alert('Erreur lors de la modification en base de données');
                }
            }
        );

    },

    handleArchiveTaskClic: function(event) {

        const buttonElement = event.currentTarget;
        const taskElement = buttonElement.closest('.task');
        taskId = taskElement.dataset.id;

        // ---------------------------
        // Requête à l'API
        // ---------------------------

        let data = { 
            status : 1
        };

        // Entêtes HTTP (headers) de la requête
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        // Options de la requête
        let fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            headers : httpHeaders,
            body    : JSON.stringify(data)
        };

        // Exécution de la requête HTTP via XHR
        fetch(app.apiBaseUrl + 'tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
                if (response.status == 204) {

                    task.changeTaskArchive(taskElement);
                    console.log('Tâche modifiée');
                    
                } else {
                    alert('Erreur lors de la modification en base de données');
                }
            }
        );

    },

    handleDesarchiveTaskClic: function(event) {

        const buttonElement = event.currentTarget;
        const taskElement = buttonElement.closest('.task');
        taskId = taskElement.dataset.id;

        // ---------------------------
        // Requête à l'API
        // ---------------------------

        let data = { 
            status : 0
        };

        // Entêtes HTTP (headers) de la requête
        const httpHeaders = new Headers();
        httpHeaders.append("Content-Type", "application/json");

        // Options de la requête
        let fetchOptions = {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            headers : httpHeaders,
            body    : JSON.stringify(data)
        };

        // Exécution de la requête HTTP via XHR
        fetch(app.apiBaseUrl + 'tasks/' + taskId, fetchOptions)
        .then(
            function(response) {
                if (response.status == 204) {

                    task.changeTaskArchive(taskElement);
                    console.log('Tâche modifiée');
                    
                } else {
                    alert('Erreur lors de la modification en base de données');
                }
            }
        );

    },

    //* ----------------------------------------------------------------
    //* DOM
    //* ----------------------------------------------------------------

    createTaskElement: function(newTask) {

        // Création d'un élement tâche depuis l'élément <template>
        const newTaskElement = document.getElementById('taskTemplate').content.cloneNode(true).firstElementChild;

        // Mise à jour de la tâche
        newTaskElement.dataset.id = newTask.id;
        newTaskElement.dataset.categoryId = newTask.category_id;;
        newTaskElement.querySelector('.task__title-label').textContent = newTask.title;
        newTaskElement.querySelector('.task__title-field').setAttribute('value', newTask.title);
        newTaskElement.querySelector('.task__category-label').textContent = newTask.category.name;

        if (newTask.completion == 1) {
            task.changeTaskCompletion(newTaskElement);
        }

        if (newTask.status == 1) {
            task.changeTaskArchive(newTaskElement);
        }

        // Insertion dans le DOM
        document.getElementById('taskList').prepend(newTaskElement);

        // Ajout des évènements dessus
        task.bindSingleTaskEvents(newTaskElement);

    },

    changeTaskCompletion: function(taskElement) {

        taskElement.classList.toggle('task--complete');

    },

    changeTaskArchive: function(taskElement) {
        
        taskElement.classList.toggle('task--archive');

    }

}
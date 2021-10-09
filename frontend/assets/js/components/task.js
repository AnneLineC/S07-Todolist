const task = {

    //* ----------------------------------------------------------------
    //* DOM
    //* ----------------------------------------------------------------

    createTaskElement: function(newTask) {

        // Création d'un élement tâche depuis l'élément <template>
        const newTaskElement = document.getElementById('taskTemplate').content.cloneNode(true).firstElementChild;

        // Mise à jour de la tâche
        newTaskElement.querySelector('.task__title-label').textContent = newTask.title;
        newTaskElement.querySelector('.task__title-field').setAttribute('value', newTask.title);
        newTaskElement.querySelector('.task__category-label').textContent = newTask.category.name;

        // Insertion dans le DOM
        document.getElementById('taskList').prepend(newTaskElement);

    }

}
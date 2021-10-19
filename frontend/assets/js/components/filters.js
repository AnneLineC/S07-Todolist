const filters = {

    showArchivedTasks: false,

    init: function() {

        // Gestion de l'affichage des archives
        const seeArchivesLinkElement = document.querySelector( '#archivesButton' );
        seeArchivesLinkElement.addEventListener('click', filters.handleArchivesLink);

        // Gestion de la sélection d'une catégorie
        const selectCategoryFilterElement = document.querySelector('#filterCategorySelect');
        selectCategoryFilterElement.addEventListener('change', filters.handleCategoryFilterChange);
    },

    /**
     * Méthode permettant de gérer le clic sur le lien 'Voir les archives'
     * @param {Event} evt
     */
    handleArchivesLink: function( evt ) {
        filters.showArchivedTasks = filters.showArchivedTasks? false : true;
        const linkElement = evt.currentTarget;

        // Récupération de la valeur de la catégorie sélectionnée pour le filtre
        const selectCategoryFilterElement = document.querySelector('#filterCategorySelect');
        categoryId = selectCategoryFilterElement.value;
  
        if (filters.showArchivedTasks) {
            linkElement.textContent = 'Voir les tâches actives';
            tasksList.showArchiveTasks(categoryId);
        } else {
            linkElement.textContent = 'Voir les archives';
            tasksList.hideArchiveTasks(categoryId);
        }
    },

    /**
     * Méthode permettant de gérer le filtre par catégorie à appliquer en sélection d'une option
     * @param {Event} evt
     */
    handleCategoryFilterChange: function(event) {

        let categoryId = event.currentTarget.value;
        tasksList.showTasksFilteredByCategory(categoryId);

    }

}
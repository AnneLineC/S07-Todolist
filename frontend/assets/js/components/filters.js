const filters = {

    showArchivedTasks: false,

    init: function() {

        const seeArchivesLinkElement = document.querySelector( "#archivesButton" );
        seeArchivesLinkElement.addEventListener("click", filters.handleArchivesLink);

    },

    /**
     * Méthode permettant de gérer le clic sur le lien "Voir les archives"
     * @param {Event} evt
     */
    handleArchivesLink: function( evt ) {
        filters.showArchivedTasks = filters.showArchivedTasks? false : true;
        const linkElement = evt.currentTarget;
        if (filters.showArchivedTasks) {
            linkElement.textContent = "Voir les tâches actives";
            tasksList.showArchiveTasks();
        } else {
            linkElement.textContent = "Voir les archives";
            tasksList.hideArchiveTasks();
        }
    }

}
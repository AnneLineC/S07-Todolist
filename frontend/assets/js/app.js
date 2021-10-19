const app = {

    apiBaseUrl: 'http://localhost:8080/',

    init: function() {

        categoriesList.init();

        tasksList.init();

        newTaskForm.init();

        filters.init();

        // ----------------------------------------------------------------
        // Menu burger responsive
        // ----------------------------------------------------------------

        // On cache le menu au lancement de la page grâce à JS, ainsi il restera accessible même si JS est désactivé.
        // Bon, le reste du site ne marchera plus dans ce cas là, mais c'est pour la bonne habitude ;)
        const nav = document.getElementById('main-nav');
        nav.classList.add('hidden');

        const burgerIcon = document.getElementById('burger');
        burgerIcon.addEventListener('click', app.handleBurgerMenuClick);
    },

    /**
     * Méthode permettant de gérer l'affichage du menu au clic sur le burger (en version mobile)
     */
     handleBurgerMenuClick: function() {
        const nav = document.getElementById('main-nav');
        nav.classList.toggle('hidden');
    }
}

document.addEventListener( "DOMContentLoaded", app.init );



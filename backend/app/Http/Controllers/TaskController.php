<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    /**
     * HTTP Method : GET
     * URL : /tasks
     */
    public function list()
    {
        return response()->json(Task::all()->load('category'), 200);
    }


    /**
     * HTTP method : POST
     * URL : /tasks
     */
    public function add( Request $request )
    {

        $newTask = new Task();

        // Récupération des données
        $newTask->title = $request->input('title');
        $newTask->category_id = $request->input('categoryId');

        $isInserted = $newTask->save();

        // Récupération des informations de la catégorie associée
        $newTask->load('category');

        if( $isInserted ) // Si l'ajout a fonctionné
        {
            return response()->json($newTask, 201);
        }
        else
        {
            // Internal Server Error
            return response("", 500);
        }

    }

    /**
     * HTTP method : PATCH
     * URL : /tasks/{id}
     */
    public function update( Request $request, int $id )
    {
        // Récupération de la tâche à modifier, erreur 404 si non trouvée
        $taskToUpdate = Task::findOrFail($id);

        // Initialisation de la variable permettant de s'assurer qu'une valeur au moins est modifiée
        $oneDataAtLeast = false;

        if ($request->filled('title')) {
            $taskToUpdate->title = $request->input('title');
            $oneDataAtLeast = true;
        }

        if ($request->filled('categoryId')) {
            $taskToUpdate->category_id = $request->input('categoryId');
            $oneDataAtLeast = true;
        }

        if ($request->filled('completion')) {
            $taskToUpdate->completion = $request->input('completion');
            $oneDataAtLeast = true;
        }

        if ($request->filled('status')) {
            $taskToUpdate->status = $request->input('status');
            $oneDataAtLeast = true;
        }

        // Si on n'a pas reçu au moins une donnée à mettre à jour concernant notre Task
        if ($oneDataAtLeast === false) {
            // Bad Request
            return response('', 400);
        }

        // Sinon, on lance la sauvegarde
        if ($taskToUpdate->save()) {
            // Succès, pas de contenu renvoyé
            return response('', 204);
        } else {
            // Erreur serveur
            return response('', 500);
        }
    }
}

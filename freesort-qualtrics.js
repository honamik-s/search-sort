Qualtrics.SurveyEngine.addOnload(function()
{
    // Retrieve Qualtrics object and save in qthis
    var qthis = this;

    // Hide buttons
    qthis.hideNextButton();

    var task_github = "https://honamik-s.github.io/search-sort/"; // https://<your-github-username>.github.io/<your-experiment-name>

    // requiredResources must include all the JS files that demo-simple-rt-task-transformed.html uses.
    var requiredResources = [
        task_github + "jspsych-6.1.0/jspsych.js",
        task_github + "jspsych-6.1.0/plugins/jspsych-html-keyboard-response.js",
        task_github + "jspsych-6.1.0/plugins/jspsych-image-keyboard-response.js",
        task_github + "jspsych-6.1.0/plugins/jspsych-fullscreen.js",
        task_github + "jspsych-6.1.0/plugins/jspsych-free-sort.js",
        "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js",
        "https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js",
        task_github + "freesort-main.js"
    ];

    function loadScript(idx) {
        console.log("Loading ", requiredResources[idx]);
        jQuery.getScript(requiredResources[idx], function () {
            if ((idx + 1) < requiredResources.length) {
                loadScript(idx + 1);
            } else {
                initExp();
            }
        });
    }

    if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
        loadScript(0);
    }

    // jQuery is loaded in Qualtrics by default
    jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
    jQuery("<div id = 'display_stage'></div>").appendTo('body');

    jsPsych.init({
        timeline: timeline,
        display_element: 'display_stage',
        on_finish: function (data) {
            /* Change 6: Summarize and save the results to Qualtrics */
            // summarize the results
            var trials = jsPsych.data.get().filter({
                test_part: 'test'
            });
            var rt = Math.round(trials.select('rt').mean());
    
            // save to qualtrics embedded data
            Qualtrics.SurveyEngine.setEmbeddedData("rt", rt);
    
            /* Change 7: Add the clean up and continue functions.*/
            // clear the stage
            jQuery('display_stage').remove();
            jQuery('display_stage_background').remove();
    
            // simulate click on Qualtrics "next" button, making use of the Qualtrics JS API
            qthis.clickNextButton();
        }
    });
});

Qualtrics.SurveyEngine.addOnReady(function()
{
    /*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function()
{
    /*Place your JavaScript here to run when the page is unloaded*/

});
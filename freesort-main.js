var repo_site = "https://honamik-s.github.io/search-sort/";

/* create timeline */
var timeline = [];

/* define welcome message trial */
var welcome = {
  type: "html-keyboard-response",
  stimulus: '実験を開始します。準備ができたらスペースキーを押してください。'
};
timeline.push(welcome);

/* test trials */
var sorting_stimuli_1 = [];
for (var i = 1; i <= 14; i++) {
    sorting_stimuli_1.push(repo_site + "img/img_"+i+".png");
}

var sorting_stimuli_2 = [];
for (var i = 1; i <= 14; i++) {
    sorting_stimuli_2.push(repo_site + "img2/img_"+i+".png");
}


timeline.push({
  type: 'fullscreen',
  fullscreen_mode: true,
  message: '<p>この実験ではフルスクリーンモードを使用します。「続ける」ボタンをクリックして、フルスクリーンモードに切り替えてください。</p>',
  button_label: '続ける'
});

timeline.push({
  type: 'html-keyboard-response',
  stimulus: 'スペースキーを押して、実験を始めてください。'
});

var fixation = {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: 750,
  data: {test_part: 'fixation'}
}

var sort_trial = {
    type: 'free-sort',
    stimuli: jsPsych.timelineVariable('sorting_stimuli'),
    stim_height: 60,
    stim_width: 60,
    button_label: '次へ',
    prompt_location: "below",
    prompt: '<p>画像をマウスでクリックして移動させて、仲間はずれの図形が見つけにくくなるように並びかえてください。</p><p>並びかえが終わったら、「次へ」ボタンをクリックしてください。</p>'
};

var test_procedure = {
  timeline: [fixation, sort_trial],
  timeline_variables: [
    {'sorting_stimuli': sorting_stimuli_1},
    {'sorting_stimuli': sorting_stimuli_2}
    ],
  randomize_order: true,
  repetitions: 5
}

timeline.push(test_procedure);
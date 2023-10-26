//Global Variables and Lists
var difficultyChoices = ["EASY", "NORMAL", "GAMER"];
var difficulty = "";

var easyQuestions = ["What is the first thing you're supposed to do start a game?\nA: Make a crafting table\nB: Pick up a rock\nC: Chop a tree\nD: Kill a goblin", "What do you use to cook food?\nA: Furnace\nB: Crafting table\nC: Cauldron\nD: Oven", "What does the Red pill powerup do?\nA: Increase health\nB: Increase defense\nC: Increase health regeneration\nD: Increase stamina", "What does the powerup Crimson daggers do?\nA: Increase damage\nB: Lifesteal\nC: Inflicts bleed\nD: Increases attack speed", "Which chest gives you a free powerup?\nA: Blue chest\nB: Gold chest\nC: Green chest\nD: Black chest", "What does the powerup Sneakers do?\nA: Increases movement speed\nB: Increases sprint speed\nC: Increases jump height\nD: Increases strafe speed", "How much wood is needed to make a workbench?\nA: 5\nB: 10\nC: 15\n D: 20", "What is another way to obtain coins besides through killing enemies and opening chests?\nA: Mine gold ore\nB: Trade with villagers\nC: Forge/craft it\nD: There are no other ways"];
var normalQuestions = ["What is the name of the small bipedal monster with elemental variants?\nA: David\nB: Joseph\nC: Johnson\nD: Dave", "What is the weakest armor?\nA: Steel armor\nB: Wood armor\nC: Wolfskin armor\nD: Gold armor", "What is the default cost of a gold chest?\nA: 50 coins\nB: 100 coins\nC: 200 coins\nD: 300 coins", "What do you get for beating a Battle totem?\nA: Ore\nB: Weapons\nC: Food\nD: Powerups", "What is the Ancient Bone used to craft?\nA: A sword\nB: A set of armor\nC: Wolf taming\n D: A bow", "How do you beat Muck?\nA: Get the best gear\nB: You can't, survive as long as possible\nC: Build a ship and sail out\nD: Defeat a final boss", "Who made Muck?\nA: Dave\nB: Dani\nC: Jannik\nD: Spooo", "What does the Gem Map lead you to?\nA: Boss totems\nB: Ore veins\nC: Chests containing gems\nD: A cave", "How much do you have to walk to earn the Leg Day achievement?\nA: 100 km\nB: 200 km\nC: 250 km\nD: 350"];
var gamerQuestions = ["Which shroom gives you stamina when you eat it?\nA: Gulpon Shroom\nB: Ligon Shroom\nC: Sugon Shroom\nD: Slurbon Shroom", "Which is the correct order of ore from weakest to strongest?\nA: Mithril < Chunkium < Obamium < Adamantite\nB: Mithril < Chunkium < Adamantite < Obamium\nC: Chunkium < Mithril < Obamium < Adamantite\nD: Chunkium < Mithril < Adamantite < Obamium", "What is the base HP of a goblin?\nA: 50\nB: 60\nC: 70\nD: 80", "What is the chance of an Ancient Bone dropping?\nA: 1%\nB: 0.1%\nC: 0.01%\nD: 10%", "How many items can a singular coal smelt?\nA: 5 items\nB: 4 items\nC: 3 items\nD: 2 items", "How do you obtain the Black Shard?\nA: Defeat Bob\nB: Defeat Guardian\nC: Trading with the villagers\nD: Rare chance of mining it"];
var filteredQuestions = []; /*This is for randomizing the question*/
var question = 1;

var easyAnswers = ["B", "C", "A", "B", "D", "A", "B", "C"];
var normalAnswers = ["D", "C", "C", "D", "D", "D", "B", "A", "C"];
var gamerAnswers = ["C", "B", "B", "A", "D", "B", "C"];
var filteredAnswers = []; /*This is for checking the answer*/
var answer = "";

var e = 0; /*These variables are needed to filtering the randomized questions and answers*/
var n = 0;
var g = 0;

var score = 0;

var currentScreen = "TITLE"; /*Determines if the screen was previously on the title screen or the trivia screen*/

var mute = false;
var congratulateRestrict = true; /*The "congratulations" sfx plays when you get a score of 5/5. This setting removes that restriction so you can get any score and still get the sfx*/

var egg = 0; /*Easter egg on final score screen*/

//Returns to title screen, resets all values for next trivia (Play again button)
onEvent("playAgain", "click", function(){
  sound();
  title();
  resetValues();
  currentScreen = "TITLE";
  egg = 0;
  setImageURL("batchest", "assets/HD_transparent_picture.png");
});

//Returns to title screen, resets all values for next trivia (Exit button)
onEvent("exitTrivia", "click", function(){
  sound();
  question = question + 1;
  resetValues();
  title();
});

//Settings button
onEvent("cogTrivia", "click", function(){
  sound();
  setScreen("settings");
});

onEvent("cogTitle", "click", function(){
  sound();
  setScreen("settings");
});

//Exit settings button
onEvent("exitSettings", "click", function(){
  sound();
  returnScreen();
});

onEvent("cogSettings", "click", function(){
  sound();
  returnScreen();
});

//Mute button
setText("mute", "Mute SFX: Off");

onEvent("mute", "click", function(){
  if (mute == false){
    mute = true;
    setText("mute", "Mute SFX: On");
  } else {
    mute = false;
    setText("mute", "Mute SFX: Off");
    playSound("assets/category_notifications/game_notification_81.mp3");
  }
});

//Congratulation SFX restriction button
setText("congratulate", "Congratulation SFX Restriction: On");

onEvent("congratulate", "click", function(){
  sound();
  
  if (congratulateRestrict == true){
    congratulateRestrict = false;
    setText("congratulate", "Congratulation SFX Restriction: Off");
  } else {
    congratulateRestrict = true;
    setText("congratulate", "Congratulation SFX Restriction: On");
  }
});

//Default settings button
onEvent("default", "click", function(){
  playSound("assets/category_notifications/game_notification_81.mp3");
  mute = false;
  setText("mute", "Mute SFX: Off");
  congratulateRestrict = true;
  setText("congratulate", "Congratulation SFX Restriction: On");
});

//Selecting difficulty
onEvent ("easyDiff", "click", function(){
  sound();
  difficulty = difficultyChoices[0];
  triviaScreen();
});

onEvent ("normalDiff", "click", function(){
  sound();
  difficulty = difficultyChoices[1];
  triviaScreen();
});

onEvent ("gamerDiff", "click", function(){
  sound();
  difficulty = difficultyChoices[2];
  triviaScreen();
});

//Identifies which answer the user picked
onEvent("choiceA", "click", function(){
  sound();
  answer = "A";
});

onEvent("choiceB", "click", function(){
  sound();
  answer = "B";
});

onEvent("choiceC", "click", function(){
  sound();
  answer = "C";
});

onEvent("choiceD", "click", function(){
  sound();
  answer = "D";
});

//Updates trivia whenever you select an answer
onEvent("choiceA", "click", function(){
  sound();
  question = question + 1;
  checkQuestionNumber();
});

onEvent("choiceB", "click", function(){
  sound();
  question = question + 1;
  checkQuestionNumber();
});

onEvent("choiceC", "click", function(){
  sound();
  question = question + 1;
  checkQuestionNumber();
});

onEvent("choiceD", "click", function(){
  sound();
  question = question + 1;
  checkQuestionNumber();
});

//Sets screen to title screen
function title(){
  setScreen("titleScreen");
  updateTrivia();
  currentScreen = "TITLE";
}

//Progresses to the trivia screen, then immediately begins the trivia
function triviaScreen(){
    setScreen("trivia");
    question = 1;
    score = 0;
    updateTrivia();
    currentScreen = "TRIVIA";
}

//Updates the questions and answers
function updateTrivia(){
  setText("questionNumber", "Question " + question);
  updateQuestion();
  
  if (question != 6){ /*To prevent an error when 5 items are already removed*/
    if (difficulty == "EASY"){
      removeItem(easyQuestions, e);
      removeItem(easyAnswers, e);
    
    } else if (difficulty == "NORMAL"){
      removeItem(normalQuestions, n);
      removeItem(normalAnswers, n);
    
    } else if (difficulty == "GAMER"){
      removeItem(gamerQuestions, g);
      removeItem(gamerAnswers, g);
    } 
  }
  
  setText("question", ""+filteredQuestions[question - 1]);
}

//Randomizes questions and filters the questions and answers with the appropriate difficulty
function updateQuestion(){
  if (difficulty == "EASY"){
    e = randomNumber(0, (easyQuestions.length - 1));
    appendItem(filteredQuestions, easyQuestions[e]);
    appendItem(filteredAnswers, easyAnswers[e]);
    
  } else if (difficulty == "NORMAL"){
    n = randomNumber(0, (normalQuestions.length - 1));
    appendItem(filteredQuestions, normalQuestions[n]);
    appendItem(filteredAnswers, normalAnswers[n]);
    
  } else if (difficulty == "GAMER"){
    g = randomNumber(0, (gamerQuestions.length - 1));
    appendItem(filteredQuestions, gamerQuestions[g]);
    appendItem(filteredAnswers, gamerAnswers[g]);
  } 
}

//Checks answer and adjusts score accordingly
function updateScore(){
  if (answer == filteredAnswers[question - 2]){
    score++;
  }
}

//When all questions are answered, the screen switches to the score. If questions are less than 6, then the trivia will continue.
function checkQuestionNumber(){
  updateTrivia();
  updateScore();
  if (question == 6){
    
    if ((mute == false) && (score == 5)){
      playSound("assets/category_male_voiceover/congratulations_male.mp3");
    } else if ((mute == false) && (congratulateRestrict == false)){
      playSound("assets/category_male_voiceover/congratulations_male.mp3");
    }
    
    setScreen("score");
    setText("scoreNumber", score + "/5");
  }
}

//Resets all values of the variables
function resetValues(){
var i = 0;  

  if (difficulty == "EASY"){
    for (i = 0; i < (question - 1); i++){
      appendItem(easyQuestions, filteredQuestions[i]);
      appendItem(easyAnswers, filteredAnswers[i]);
    }
  } else if (difficulty == "NORMAL"){
    for (i = 0; i < (question - 1); i++){
      appendItem(normalQuestions, filteredQuestions[i]);
      appendItem(normalAnswers, filteredAnswers[i]);
    }
  } else if (difficulty == "GAMER"){
    for (i = 0; i < (question - 1); i++){
      appendItem(gamerQuestions, filteredQuestions[i]);
      appendItem(gamerAnswers, filteredAnswers[i]);
    }
  }
  
  difficulty = "";
  filteredQuestions = [];
  question = 1;
  filteredAnswers = [];
  answer = "";
  e = 0;
  n = 0;
  g = 0;
  score = 0;
}

//Returns to appropriate screen when exiting settings
function returnScreen(){
  if (currentScreen == "TITLE"){
    setScreen("titleScreen");
  } else if (currentScreen == "TRIVIA"){
    setScreen("trivia");
  }
}

//Play sound
function sound(){
  if (mute == false){
    playSound("assets/category_notifications/game_notification_81.mp3");
  }
}


















































//Easter egg
onEvent("batchest", "click", function(){
  if (score == 5){
    egg++;
  }
  
  if (egg == 117){
    playSound("assets/category_human/character_jimmy_woah_1.mp3");
    setImageURL("batchest", "assets/844.png");
  }
});

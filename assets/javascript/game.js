$(document).ready(function(){
	var player;
	var defender;
	var you;
	var enemy;
	var enemy_count;
	/*--Array of player objects --*/
	var playerList = [{
		"id": "button-1",
		"apBaseValue": 10,
		"name": "Obi-Wan",
		"hp": 120,
		"ap": 10,
		"cap": 5,
		"value": 1,
		"imgsrc" : "assets/images/Obi-Wan.jpg",
	},
	{
		"id": "button-2",
		"apBaseValue": 15,
		"name": "Luke Skywalker",
		"hp": 100,
		"ap": 15,
		"cap": 5,
		"value": 2,
		"imgsrc" : "assets/images/lukeskywalker.jpg",
	},
	{
		"id": "button-3",
		"apBaseValue": 8,
		"name": "Darth Sidious",
		"hp": 150,
		"ap": 8,
		"cap": 10,
		"value": 3,
		"imgsrc" : "assets/images/darth-sidious.jpg",
	},
	{
		"id": "button-4",
		"apBaseValue": 5,
		"name": "Darth Maul",
		"hp": 180,
		"ap": 5,
		"cap": 20,
		"value": 4,
		"imgsrc" : "assets/images/Darth-Maul.jpg",
	}
	];
	/*--Creating the players--*/
	var createPlayers = function(){
		var playerBtn = [];
		var playerName =[];
		var image = [];
		var healthPoints = [];
		for(var i=0;i<playerList.length; i++){
			playerBtn[i] = $("<button>");
			playerBtn[i].addClass("btn btn-primary");
			playerBtn[i].attr('id',playerList[i].id);
			playerBtn[i].attr('apBaseValue',playerList[i].apBaseValue);
			playerBtn[i].attr('name',playerList[i].name);
			playerBtn[i].attr('hp',playerList[i].hp);
			playerBtn[i].attr('ap',playerList[i].ap);
			playerBtn[i].attr('cap',playerList[i].cap);
			playerBtn[i].attr('value',playerList[i].value);
			playerName[i] = $("<h5>"+playerList[i].name+"</h5>");
			image[i] = $("<img>");
			image[i].attr('src', playerList[i].imgsrc);
			healthPoints[i] = $("<h4>"+playerList[i].hp+"<h4>");
			healthPoints[i].attr('id',playerList[i].value);
			/*--Appending playername, playerimage and player healpoints --*/
			playerBtn[i].append(playerName[i]).append(image[i]).append(healthPoints[i]);
			/*--Appending the players to the mainSection div--*/
			$("#mainSection").append(playerBtn[i]);
		}
	}
	/*--The on-click events function--*/
	var callOnClickEvents = function(){
		$("#button-1").on("click", function(){
		/*--If button1 is the player, add the rest of buttons 
		to enemies available --*/
		if(player){
			$("#yourCharacter").append($("#button-1"));
			you = $("#button-1");
			player = false;
			/*--player disabled once chosen as your character--*/
			you.attr("disabled",true);
			$("#enemiesAvailable").append($("#button-2, #button-3, #button-4"));
		}
		/*-- choosing the defender and enabling the attack button--*/
		else if(defender){
			console.log("player1 defender: "+ you);
			$("#defender").html($("#button-1"));
			enemy = $("#button-1");
			defender = false;
			$("#button-attack").attr("disabled",false);
			$("#display").html("");
		}
	});
		$("#button-2").on("click", function(){
		/*--If button2 is the player, add the rest of buttons 
		to enemies available --*/
		if(player){
			$("#yourCharacter").append($("#button-2"));
			you = $("#button-2");
			player = false;
			/*--player disabled once chosen as your character--*/
			you.attr("disabled",true);
			$("#enemiesAvailable").append($("#button-1, #button-3, #button-4"));
		}
		/*-- choosing the defender and enabling the attack button--*/
		else if(defender){
			$("#defender").html($("#button-2"));
			enemy = $("#button-2");
			defender = false;
			$("#button-attack").attr("disabled",false);
			$("#display").html("");
		}
	});
		$("#button-3").on("click", function(){
		/*--If button3 is the player, add the rest of buttons 
		to enemies available --*/
		if(player){
			$("#yourCharacter").append($("#button-3"));
			you = $("#button-3");
			player = false;
			/*--player disabled once chosen as your character--*/
			you.attr("disabled",true);
			$("#enemiesAvailable").append($("#button-1, #button-2, #button-4"));
		}
		/*-- choosing the defender and enabling the attack button--*/
		else if(defender){
			$("#defender").html($("#button-3"));
			enemy = $("#button-3");
			defender = false;
			$("#button-attack").attr("disabled",false);
			$("#display").html("");
		}
	});
		$("#button-4").on("click", function(){
		/*--If button4 is the player, add the rest of buttons 
		to enemies available --*/
		if(player){
			$("#yourCharacter").append($("#button-4"));
			you = $("#button-4");
			player = false;
			/*--player disabled once chosen as your character--*/
			you.attr("disabled",true);
			$("#enemiesAvailable").append($("#button-1, #button-2, #button-3"));
		}
		/*-- choosing the defender and enabling the attack button--*/
		else if(defender){
			$("#defender").html($("#button-4"));
			enemy = $("#button-4");
			defender = false;
			$("#button-attack").attr("disabled",false);
			$("#display").html("");
		}
	});
	}
	/*--Initialize function --*/
	var callInitialize =function(){
		/*--createPlayers function called--*/
		createPlayers();
		player = true;
		defender = true;
		you="";
		enemy = "";
		enemy_count = 3;
		$("#button-restart").hide();
		$("#button-attack").attr("disabled",true);
		$("#yourCharacter").html("");
		$("#enemiesAvailable").html("");
		$("#defender").html("");
		$("#display").html("");
		/*--on-click events function called--*/
		callOnClickEvents();
	}
	/*--call the initialize function--*/
	callInitialize();
	/*--When attack button clicked,your character and the enemy 
	chosen would fight--*/
	$("#button-attack").on("click", function(){
		var enemy_cap = parseInt(enemy.attr("cap"));
		var enemy_hp = parseInt(enemy.attr("hp"));
		var you_ap = parseInt(you.attr("ap"));
		var you_hp = parseInt(you.attr("hp")); 
		/*--Display the damage message--*/
		$("#display").html("You attacked "+enemy.attr("name")+
			" for "+ you.attr("ap")+ " damage.");
		$("#display").append("<br><br>");
		$("#display").append(enemy.attr("name")+" attacked you for "
			+ enemy.attr("cap")+ " damage.");
		/*--Decrement the health points of you and the defender--*/
		you_hp -= enemy_cap;
		enemy_hp -= you_ap;
		you_ap += parseInt(you.attr("apBaseValue"));
		/*--Updating the attribute values with the new calculated ones.--*/
		you.attr("hp", you_hp);
		enemy.attr("hp", enemy_hp);
		you.attr("ap", you_ap);
		$("#"+you.attr("value")).text(you_hp);
		$("#"+enemy.attr("value")).text(enemy_hp);
		/*--If your health point less than or equal to zero, you
		loose the game. --*/
		if(you_hp <= 0){
			$("#display").html("<br><br>You lost the game!. Please restart<br><br>");
			$("#button-attack").attr("disabled",true);
			$("#button-restart").show();
		}
		/*--If enemy's health point less than or equal to zero, you
		defeat the enemy. --*/
		else if(enemy_hp <= 0){
			$("#defender").html("");
			$("#display").html("<br><br>You defeated the enemy!!");
			enemy_count--;
			/*--Checking to see if there are more enemies to fight--*/
			if(enemy_count > 0){
				defender = true;
				$("#display").append("<br><br>Choose another enemy");
			}
			/*--if no more enemies left, you win the game--*/
			else{
				$("#display").html("<br><br>You won the game!. Please restart<br><br>");
				$("#button-restart").show();
			}
			$("#button-attack").attr("disabled",true);
		}
	});
	/*-- callInitialize invoked for restarting --*/
	$("#button-restart").on("click", function(){
		callInitialize();
	});
});


$(document).ready(function(){
			var player;
			var defender;
			var you;
			var enemy;
			var enemy_count;
			var callInitialize =function(){
				player = true;
				defender = true;
				you="";
				enemy = "";
				enemy_count = 3;
				$("#button-restart").hide();
				$("#button-attack").attr("disabled",true);
				$("#yourCharacter").html("");
				$("#defender").html("");
				$("#display").html("");
			}
			callInitialize();
			$("#button-1").on("click", function(){
				if(player){
					$("#yourCharacter").append($("#button-1"));
					you = $("#button-1");
					player = false;
					$("#enemiesAvailable").append($("#button-2, #button-3, #button-4"));
				}
				else if(defender){
					$("#defender").html($("#button-1"));
					enemy = $("#button-1");
					defender = false;
					$("#button-attack").attr("disabled",false);
					$("#display").html("");
				}
			});
			$("#button-2").on("click", function(){
				if(player){
					$("#yourCharacter").append($("#button-2"));
					you = $("#button-2");
					player = false;
					$("#enemiesAvailable").append($("#button-1, #button-3, #button-4"));
				}
				else if(defender){
					$("#defender").html($("#button-2"));
					enemy = $("#button-2");
					defender = false;
					$("#button-attack").attr("disabled",false);
					$("#display").html("");
				}
			});
			$("#button-3").on("click", function(){
				if(player){
					$("#yourCharacter").append($("#button-3"));
					you = $("#button-3");
					player = false;
					$("#enemiesAvailable").append($("#button-1, #button-2, #button-4"));
				}
				else if(defender){
					$("#defender").html($("#button-3"));
					enemy = $("#button-3");
					defender = false;
					$("#button-attack").attr("disabled",false);
					$("#display").html("");
				}
			});
			$("#button-4").on("click", function(){
				if(player){
					$("#yourCharacter").append($("#button-4"));
					you = $("#button-4");
					player = false;
					$("#enemiesAvailable").append($("#button-1, #button-2, #button-3"));
				}
				else if(defender){
					$("#defender").html($("#button-4"));
					enemy = $("#button-4");
					defender = false;
					$("#button-attack").attr("disabled",false);
					$("#display").html("");
				}
			});
			$("#button-attack").on("click", function(){
				var enemy_cap = parseInt(enemy.attr("cap"));
				var enemy_hp = parseInt(enemy.attr("hp"));
				var you_ap = parseInt(you.attr("ap"));
				var you_hp = parseInt(you.attr("hp")); 
				if(you_hp <= 0){
					$("#display").html("<br><br>You lost the game!. Please restart<br><br>");
					$("#button-restart").show();
				}
				else if(enemy_hp <= 0){
					$("#defender").html("");
					$("#display").html("<br><br>You defeated the enemy!!");
					enemy_count--;
					if(enemy_count > 0){
						defender = true;
						$("#display").append("<br><br>Choose another enemy");
					}
					else{
						$("#display").html("<br><br>You won the game!. Please restart<br><br>");
						$("#button-restart").show();
					}
					$("#button-attack").attr("disabled",true);
				}
				else{
					$("#display").html("You attacked "+enemy.attr("name")+
						" for "+ you.attr("ap")+ " damage.");
					$("#display").append("<br><br>");
					$("#display").append(enemy.attr("name")+" attacked you for "
						+ enemy.attr("cap")+ " damage.");
					you_hp -= enemy_cap;
					enemy_hp -= you_ap;
					you_ap += parseInt(you.attr("apBaseValue"));
					you.attr("hp", you_hp);
					enemy.attr("hp", enemy_hp);
					you.attr("ap", you_ap);
					$("#"+you.attr("value")).text(you_hp);
					$("#"+enemy.attr("value")).text(enemy_hp);
				}
			});
			$("#button-restart").on("click", function(){
				location.reload();
			});
		});

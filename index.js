//Getting the number of games
const query_string = window.location.search;
const param = new URLSearchParams(query_string);
const games_count = parseInt(param.get("games"));
console.log(games_count);

//Getting the elements
const player_points = document.getElementById("curr_points_player");
const opponent_points = document.getElementById("curr_points_opponent");
const restart_btn = document.getElementById("restart");
const curr_img = document.getElementById("image_opp");
const stat = document.getElementById("waiter");
const play_btns = document.querySelectorAll(".play_btn");

//variables
let player_score = 0;
let opp_score = 0;
let round_number = 0;

//logic

let random_choices_arr = [];

for (var i = 0; i < games_count; i++) {
  var rand_num = Math.random() * 3;
  var rand_num_rounded = Math.floor(rand_num);
  random_choices_arr.push(rand_num_rounded);
}

console.log(random_choices_arr);

restart_btn.disabled = false;

play_btns.forEach((btn) => {
  btn.disabled = false;
});

restart_btn.addEventListener("click", () => {
  window.location.href = "index.html";
});

play_btns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    play_btns.forEach((b) => (b.disabled = true));

    const val = parseInt(e.target.value);
    console.log(val);
    var opp_choice = random_choices_arr[round_number];

    if (val == opp_choice) {
      // It's a tie
      player_score += 1;
      opp_score += 1;
      stat.innerText="Draw";
    } else if (
      (val == 0 && opp_choice == 2) ||
      (val == 1 && opp_choice == 0) ||
      (val == 2 && opp_choice == 1)
    ) {
      // Player wins
      player_score += 1;
      stat.innerText="player scores";
    } else {
      // Opponent wins
      opp_score += 1;
      stat.innerText="opponent scores";
    }

    round_number++;

    if (opp_choice == 0) {
      curr_img.src = "assets/rock.png";
    } else if (opp_choice == 1) {
      curr_img.src = "assets/paper.png";
    } else if (opp_choice == 2) {
      curr_img.src = "assets/scissors.png";
    }

    player_points.innerText = `You : ${player_score}`;
    opponent_points.innerText = `Robo : ${opp_score}`;

    setTimeout(() => {
      if (round_number < games_count) {
        curr_img.src="";
        stat.innerText="Enter choice"
        stat.innerText = `Enter your choice (Round ${round_number + 1})`;
        play_btns.forEach((b) => (b.disabled = false));
      } else {
        stat.innerText = "";
        play_btns.forEach((b) => (b.disabled = true));
        restart_btn.disabled = false;

        if (player_score === opp_score) {
          stat.innerText = "Tie, press restart";
        } else if (player_score > opp_score) {
          stat.innerText = "player wins, press restart";
        } else {
          stat.innerText = "Robo wins, press restart";
        }
      }
    }, 2000);
  })
);

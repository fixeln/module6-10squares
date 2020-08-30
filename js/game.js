const numDivs = 36;
const maxHits = 10;

let hits = 0;
let miss = 0;
let firstHitTime = 0;
let lastTarget = 0;


function missDiv(div) {
  div.addClass("miss");
}

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
  if (lastTarget) {
    if ($(lastTarget).hasClass("target")) {
      $(lastTarget).removeClass("target");
    }
  }
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  lastTarget =  divSelector;
  // TODO: помечать target текущим номером
  $(divSelector).text(hits+1);
  // FIXME: тут надо определять при первом клике firstHitTime
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $(".game-field").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#points-total").text(miss);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if($("div").hasClass("miss")){
    $("div").removeClass("miss");
  };
  if ($(event.target).hasClass("target")) {
    $(event.target).text('');
    hits = hits + 1;
    round();
  }else {
    miss = miss + 1;
    $(event.target).text('');
    missDiv($(event.target));
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function callInit(){
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
    $(".game-field").hide();
    $("#button-reload").hide();
    $("#button-start").click(function () {
      firstHitTime = getTimestamp();
      round();
      callInit();
      $(".game-field").show();
      $("#button-reload").show();
      $("#button-start").hide();
    })
}

$(document).ready(init);

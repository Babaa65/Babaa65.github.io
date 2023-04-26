//ce fonctionnement est utilisé pour montrer la modale une seule fois par session
//elle apparaît dans la page avec un délai de 5sec
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

$(document).ready(async function () {
  var shownModal = localStorage.getItem("shownModal");

  if (!shownModal) {
    await delay(5000);
    $("#myModal").modal("show");
    localStorage.setItem("shownModal", 1);
  }

  // Close modal on button click
  $(".close").click(function () {
    $("#myModal").modal("hide");
  });
});

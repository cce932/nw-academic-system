for (let i=1; i<=$( ".menu-item" ).length; i++) {
  $(`li[aria-owns='menu-item-${i}'], #menu-item-${i}`).hover(
    function() {
      $(`#menu-item-${i}`).show();
    }, function() {
      $(`#menu-item-${i}`).hide();
    }
  );
}

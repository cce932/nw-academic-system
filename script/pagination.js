let currentPageRadio = ".pagination ul > li > input[type='radio']:checked"
let firstPageOfEachPagination = $(".pagination ul > li:first-child > input")

firstPageOfEachPagination.each(function(index, element) {
  $(element).prop('checked', true);
});

let allPageRadios = document.querySelectorAll(".pagination ul > li > input[type='radio']");

function changeTablePageHandler(event) {
  const currentPageId = event.target ? event.target.id.split("__") : event.attr("id").split("__");
  const currentTab = currentPageId[0];
  const currentPageNumber = currentPageId[1];

  $(`.${currentTab} .table-page.active`).removeClass("active"); 
  $(`.${currentTab} .table-${currentPageNumber}`).addClass("active");
}

Array.prototype.forEach.call(allPageRadios, function(radio) {
    radio.addEventListener('change', changeTablePageHandler);
});


$(".previous-page").on("click", function(event) {
  const currentTab = event.target.id.split("__")[0];
  const currentPage = $(`.${currentTab} ${currentPageRadio}`).attr("id").slice(-1);
  const previousPage = $(`.pagination ul > li > input#${currentTab}__page-${parseInt(currentPage) - 1}`);
  
  if (parseInt(currentPage) > 1) {
    previousPage.prop('checked', true);
    changeTablePageHandler(previousPage)
  }
})

$(".next-page").on("click", function(event) {
  const currentTab = event.target.id.split("__")[0];
  const currentPage = $(`.${currentTab} ${currentPageRadio}`).attr("id").slice(-1);
  const nextPage = $(`.pagination ul > li > input#${currentTab}__page-${parseInt(currentPage) + 1}`);
  
  if (parseInt(currentPage) < $(`.${currentTab} .pagination ul > li`).length) {
    nextPage.prop('checked', true);
    changeTablePageHandler(nextPage)
  }
})
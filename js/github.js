$(document).ready(function(){
//Ajax Repo
  $.ajax({
    type: 'GET',
    url: "https://api.github.com/users/dstichter/repos",
    success: function (repos){
      for(var i = 0; i < repos.length; i++){
        $('.list-group').append(getRepos(repos[i]))
      }
    }
  });
//A links AJAX to fill Table
  $(".list-group").on("click", "a", function(e) {
    e.preventDefault();

    $.ajax({
      type: "GET",
      url: $(this).attr("href"),
      success: function(commits) {
        $("tbody").empty();
        for(var i = 0; i < commits.length; i++) {
          $("tbody").append(fillTable(commits[i]));
        }
      }
    })
  });
//Sha on Hover
  $('.tableBody').hover(
    function (){
      alert('a')  
      $(this).attr('data-hold', $(this).html);
      $(this).html($(this.attr('id')));
    },
    function (){      
      $(this).attr('id', $(this.html));
      $(this).html($(this.attr('data-hold')));
    });
  function getRepos(repoData){

    var commitsApiUrl = "https://api.github.com/repos/";
    commitsApiUrl += repoData.owner.login + "/";
    commitsApiUrl += repoData.name + "/commits";

    var newRepoLink = $('<a>').attr('href', commitsApiUrl)
      .addClass("list-group-item")
      .append(repoData.name);
    return newRepoLink;
  }

  function fillTable(repoCommits){
    var newUserName = $('<td>')
      .append(repoCommits.commit.author.name).append(' : ')
      .append(repoCommits.author.login)
      .attr('id', repoCommits.sha);
    var newDate = $('<td>').append(repoCommits.commit.author.date)
    var newMessage = $('<td>').append(repoCommits.commit.message)

    var newTableRow = $('<tr>').append(newUserName).append(newDate).append(newMessage);
    return newTableRow;
  }
});
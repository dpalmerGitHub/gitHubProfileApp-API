$(document).ready(function() {
    $("#searchUser").on("keyup", function(e) {
            var keyVal = e.target.value;
            if ($("#searchUser").val() == "") {
                $("#profileResults").html("");
            }


            $.ajax({
                url: "https://api.github.com/users/" + keyVal,
                data: {
                    client_id: "", //enter client id here
                    client_secret: "" //enter secret key here
                }
            }).done(function(userData) {


                $.ajax({
                    url: "https://api.github.com/users/" + keyVal + "/repos",
                    data: {
                        client_id: "", //enter client id here
                        client_secret: "", //enter secret key here
                        sort: "created:asc",
                        per_page: 5
                    }
                }).done(function(repos) { $.each(repos, function(index, repo) { $("#repos").append(`
<div class="well">
    <div class="row">
        <div class="col-md-7">
            <strong>${repo.name}</strong> ${repo.description}
        </div>
        <div class="col-md-3">
            <span class="label label-default">Forks: ${repo.forks_count}</span>
            <span class="label label-primary">Watchers:${repo.watcher_count}</span>
            <span class="label label-success">Stars:${repo.stargazers_count}</span>
        </div>
        <div class="col-md-2">
            <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
        </div>
    </div>
</div>

`); }) });
                $("#profileResults").html(`
<div class="panel panel-default">
    <div class="panel-heading">
        <h3>${userData.name}</h3>
    </div>
    <div class="panel-body">
        <div class="row">
            <div class="col-md-3">
                <img class="thumbnail avatar" src="${userData.avatar_url}">
                <a target="_blank" class="btn btn-primary btn-block" href="${userData.html_url}">View Profile</a>
            </div>

            <div class="col-md-9">
                <span class="label label-default">Public Repos: ${userData.public_repos}</span>
                <span class="label label-primary">Public Gists:${userData.public_gists}</span>
                <span class="label label-success">${userData.followers}</span>
                <span class="label label-info">${userData.following}</span>
                <br><br>
                <ul class="list-group">
                    <li class="list-group-item">Company:${userData.company}</li>
                    <li class="list-group-item">Website/Blog:${userData.blog}</li>
                    <li class="list-group-item">Location:${userData.location}</li>
                    <li class="list-group-item">Member Since:${userData.created_at}</li>
                </ul>
            </div>
        </div>
    </div>
</div>

<h3 class="page-header">Latest Repos</h3>
<div id="repos"></div>

`);
            });
        }) //end on key up


})
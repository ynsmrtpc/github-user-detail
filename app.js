$(document).ready(function() {
    $("#btn").click(function(e) {
        e.preventDefault();
        var inputVal = $("#search").val();
        console.log(inputVal);
        $('#search').val(' ');
        // inputVal = 'ynsmrtpc';
        document.getElementById('body').style.display = 'block';
        $('#btn').remove();
        $('#search').remove();
        $('#label').remove();
        document.getElementById('btn2').style.display = 'block';
        document.getElementById('form-group').style.marginTop = '0';
        document.getElementById('form-group').style.transform = 'none';

        apirepo = `https://api.github.com/users/${inputVal}`;

        listrepos = document.createElement('div');
        listrepos.className = 'container'
        document.getElementById('github').appendChild(listrepos);
        rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        listrepos.appendChild(rowDiv);

        $.getJSON(apirepo + '/repos', function(data) {
            console.log('data now', data)

            data.forEach(projects => {

                cardDiv = document.createElement('div');
                cardDiv.className = 'card';
                cardDiv.style = 'width: 18rem;';
                rowDiv.appendChild(cardDiv);

                cardBodyDiv = document.createElement('div');
                cardBodyDiv.className = 'card-body';
                cardDiv.appendChild(cardBodyDiv);

                h5 = document.createElement('h5');
                h5.className = 'card-title';
                h5.innerHTML = `${projects.name}`.toUpperCase() + '<br><br>';
                cardBodyDiv.appendChild(h5);

                github_a = document.createElement('a');
                github_a.className = 'btn';
                github_a.innerHTML = '<i class="fab fa-github"></i>' + ' Github';
                github_a.href = `${projects.html_url}`;
                github_a.target = '_blank'
                github_a.style = 'position:absolute; bottom:5px; right: 5px;'
                cardBodyDiv.appendChild(github_a);
            })

            $.getJSON(apirepo, function(data) {
                document.getElementById('img').src = `${data.avatar_url}`;
                document.getElementById('userName').textContent = `${data.name}`;
                userGithub = document.getElementById('userGithub');
                userGithub.href = `${data.html_url}`;
                userGithub.target = '_blank';
                document.getElementById('followers').textContent = 'Fallowers:' + `${data.followers}`;
                document.getElementById('following').textContent = 'Fallowing: ' + `${data.following}`;
                document.getElementById('location').textContent = `${data.location}`;

                email = `${data.email}`;
                console.log(email)
                if (email == 'null') {
                    document.getElementById('email').textContent = ' ';
                } else {
                    document.getElementById('email').innerHTML = `${data.email}` + '<br>';
                }

                document.getElementById('repos').textContent = 'Repo Sayısı: ' + `${data.public_repos}`;

            })
        })
    });
});
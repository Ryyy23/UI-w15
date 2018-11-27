//json-server --watch db.json
$(document).ready(function () {
    var serveraddress = "http://localhost:3000";
    var fontawesomeicons = "https://gist.githubusercontent.com/zwinnie/3ed8e7970240962bc29227533c3ae047/raw/da69f87c399284440487004e78004dd8c6735bff/font-awesome-4.7.0.json";
    var currentplayer = {};
    var iconlist = [];
    var playerlist = [];
    var tilelist = [];
    var rows = 0;
    var columns = 0;
    GetTileRequest();
    GetIconsRequest();
    GetPlayerRequest();
    DisplayPlayerButton();
    InitialiseTable();
    class Player {
        constructor(name, nukes, icon, color) {
            this.id = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
            this.name = name;
            this.nukes = nukes;
            this.icon = icon;
            this.color = color;
        }
    }
    class Tile {
        constructor(xposition, yposition, player) {
            this.id = `${xposition}-${yposition}`;
            this.xposition = xposition;
            this.yposition = yposition;
            this.player = player;
        }
    }
    function InitialiseTable() {
        for (index = 0; index <= 9; index++) {
            for (subindex = 0; subindex <= 9; subindex++) {
                let tile = {
                    "id": `${index}-${subindex}`,
                    "xposition": `${index}`,
                    "yposition": `${subindex}`,
                    "player": "-1"
                }

                $.ajax({
                    url: `${serveraddress}/tiles`,
                    method: "POST",
                    data: tile,
                    success: function (result) {
                        console.log("post")
                    }
                });
            }
        }
    }
    function GetPlayerRequest() {
        $.ajax({
            url: `${serveraddress}/players`,
            dataType: "JSON"
        })
            .done(async function (data) {
                await SetPlayerList(data)
            });
    }
    function SetPlayerList(players) {
        playerlist = []
        for (const person in players) {
            playerlist.push(players[person]);
        }
    }
    function DisplayPlayerSelector() {
        $("#player-list").html('');
        $("#player-list").append(`<br><br><br>
            <select id="user-select" class="form-control">
            <option selected="true" disabled>Select your player</option>`);

        for (const person in playerlist) {
            let html = `<option value=${playerlist[person].id}> ${playerlist[person].id}: "${playerlist[person].name} </option>`;
            $("#user-select").append(html);
        }
        $("#player-list").append('</select>');
    }
    function GetIconsRequest() {
        $.ajax({
            url: fontawesomeicons,
            type: "GET",
            dataType: "JSON"
        })
            .done(async function (data) {
                await SetIconsList(data)
            });
    }
    function SetIconsList(icons) {

        iconlist = []
        for (const fa in icons) {
            iconlist.push(icons[fa]);
        }
    }
    function SetRandomIcon() {
        var icon = '';
        var length, numb = 0;
        length = (iconlist[0].length);
        numb = Math.floor(Math.random() * (length - 1 + 1)) + 1;
        icon = iconlist[0][numb];
        return icon
    }
    function GetTileRequest() {
        $.ajax({
            url: `${serveraddress}/tiles`,
            type: "GET",
            dataType: "JSON"
        })
            .done(async function (data) {
                await SetTileList(data)
            });
    }
    function SetTileList(tiles) {
        tilelist = []
        for (const tile in tiles) {
            tilelist.push(tiles[tile]);
        }
    }
    function NewPlayer(player) {
        $.ajax({
            url: `${serveraddress}/players/`,
            method: "POST",
            data: player,
            success: function (result) { }
        });
    }
    function SetCurrentUser() {
        var selecteduser = $("#user-select").val();
        for (index = 0; index < playerlist.length; index++) {
            if (selecteduser == playerlist[index].id) {
                currentplayer = playerlist[index];
            }
        }
    }
    function DisplayPlayerForm() {
        $("#player-form").html('');
        $("#player-form").html(`
        <div id="playerModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <div class="container" style="max-width:600px;padding:40px 20px;background:#ebeff2">
                    <section>
                        <h3>Player Registration Page </h3>
                        <form class="form-horizontal" id="player-registration" role="form">
                            <div class="form-group row">                                
                                <label for="player-name" class="col-form-label col-sm-2 text-danger" id="player-name-label">Player's
                                    Name</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control is-invalid" id="player-name" placeholder="Jackie Chan">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="player-icon" class="col-form-label col-sm-2 text-danger" id="player-icon-label">Player
                                    Icon</label>
                                <div class="col-sm-6">
                                    <div class="input-group">
                                        <input type="text" class="form-control is-invalid" id="player-icon" placeholder="fa-icon"> 
                                        <button id="random-icon" type="button" class="btn btn-outline-primary pull-right" style="margin-left: 15px;">
                                        Random </button>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="player-color" class="col-form-label col-sm-2 text-success" id=player-color-label>Player
                                    color</label>
                                <div class="col-sm-6">
                                    <input type="color" class="form-control is-valid" id="player-color">
                                </div>
                            </div>
                            <div class="col-sm-offset-2 col-sm-8">
                                <button id="submit-player" type="button" class="btn btn-outline-primary">
                                    Register
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
            <div class="modal-footer">
            </div>
        </div>
    </div>
        `)
    }
    function DisplayPlayerInfo() {

        $('#player-info').html(`
        <p class="offset-5" style="font-size:16px">Player: ${currentplayer.name}</p>
        <p class="offset-5" style="font-size:16px">Nukes: ${currentplayer.nukes}</p>
        <p class="offset-5" style="font-size:16px">Icon:  <i class="fa ${currentplayer.icon}" aria-hidden="true" style="color:black;font-size: 24px;"></i></p>
        <p class="offset-5" style="font-size:16px">Colour:  <i class="fa fa-square" aria-hidden="true" style="color:${currentplayer.color};font-size: 24px;"></i></p>
        <button id="change-class" type="button" class="btn btn-outline-primary offset-5">Update Player</button>
        `);
    }
    function DisplayPlayerButton() {
        $("#buttons").html(`<br><br><br>
            <button class="btn btn-lg btn-outline-secondary btn-block" id="selectPlayerBtn" type="button" onclick="">
                Select a player
            </button>
        `);
    }
    function DisplayStartButton() {
        $("#buttons").html(`<br>
            <button class="btn btn-lg btn-outline-success btn-block" id="startBtn" type="button" onclick="">
                Start Game
            </button>
        `);
    }
    function DisplayNukeButton() {
        $("#buttons").html(`<br><br><br><br><br>
            <button class="btn btn-danger btn-lg btn-block" id="nukeBtn" type="button" onclick="">
                Nuke
            </button>
        `);
    }
    function DisplayGridSizes() {
        $("#grid-size").html(`
        <label class="col-form-label" for="rows">Rows: </label>
        <input class="form-control" type="number" id="rowselector" name="rows"
           placeholder="10" min="5" max="50">
        <label class="col-form-label" for="columns">Columns: </label>
        <input class="form-control" type="number" id="columnselctor" name="columns"
            placeholder="10" min="5" max="50">
    `);
    }
    function CreateGridBox(rows, cells) {
        $("#grid-box").show();
        let html = "";
        for (xAxis = 0; xAxis < rows; xAxis++) {
            html += "<tr>";
            for (yAxis = 0; yAxis < cells; yAxis++) {
                html += "<td>";
                html += "<i class='fa fa-bullseye board' id='" + xAxis + "-" + yAxis + "' data-player='-1'></i>";
                html += "</td>";
            }
            html += "</tr>;"
        }
        $("#grid-box").html(html);
        UpdateGridBox();
    }
    function UpdateGridBox() {
        GetTileRequest();
        for (const tile in tilelist) {
            for (const player in playerlist) {
                if (tilelist[tile].player == playerlist[player].id) {
                    $(`#${tilelist[tile].id}`).removeClass().addClass(`fa board ${playerlist[player].icon}`);
                    $(`#${tilelist[tile].id}`).css("color", playerlist[player].color);
                    $(`#${tilelist[tile].id}`).attr('data-player', playerlist[player].id);
                }
            }
        }
        setTimeout(function () {
            UpdateGridBox();
        }, 1000);
    }
    function UpdatePlayerInfo() {
        GetPlayerRequest();
        DisplayPlayerInfo();
    }
    function UpdateNukes() {

        let player = {
            "id": currentplayer.id,
            "nukes": currentplayer.nukes
        }
        console.log(player)
        $.ajax({
            url: `${serveraddress}/players/${currentplayer.id}`,
            method: "PATCH",
            data: player,
            success: async function (result) {
                await UpdatePlayerInfo();
            }
        });
    }
    function NukeTable(player) {
        for (index = 0; index <= 9; index++) {
            for (subindex = 0; subindex <= 9; subindex++) {
                let tile = {
                    "id": `${index}-${subindex}`,
                    "xposition": `${index}`,
                    "yposition": `${subindex}`,
                    "player": player.id
                }
                $.ajax({
                    url: `${serveraddress}/tiles/${index}-${subindex}`,
                    method: "PATCH",
                    data: tile,
                    success: function (result) {
                        console.log("SUCCESS!");
                    },
                    error: function (request, status, error) {
                        console.log(request.responseText);
                    }
                });
            }
        }
    }
    function PlayerTakesTurn(timeout) {

        let tableHeight = $("#grid-box").height();
        let tableWidth = $("#grid-box").width();

        $("#loading-screen").addClass('loading-screen');
        $("#loading-screen").css('height', $("#grid-box").height());
        $("#loading-screen").css('width', $("#grid-box").width());
        $("#loading-screen").html(`<div style="text-align:center;"><i class="fa fa-spinner fa-spin" style="color: yellow;height: ${tableHeight}px;line-height: ${tableWidth}px;"></i></div>`)
        $(".loading-screen").show();

        setTimeout(function () {
            $("#loading-screen").html("");
            $("#loading-screen").css('height', 0);
            $("#loading-screen").css('width', 0);
            $("#loading-screen").removeClass('loading-screen');
        }, timeout);
    }
    $("#newPlayerBtn").click(() => {

        DisplayPlayerForm();
        $("#playerModal").css("display", "block")
        $('#player-name').focus();

        $('#player-name').on('input', function () {
            if ($('#player-name').val().length > 1) {
                $("#player-name").removeClass('is-invalid');
                $("#player-name-label").removeClass('text-danger');
                $("#player-name").addClass('is-valid');
                $("#player-name-label").addClass('text-success');

            } else if ($('#player-name').val().length <= 1) {
                $("#player-name").removeClass('is-valid');
                $("#player-name-label").removeClass('text-success');
                $("#player-name").addClass('is-invalid');
                $("#player-name-label").addClass('text-danger');
            }
        });

        $('#random-icon').click(() => {
            $("#player-icon").val(SetRandomIcon());
            $("#player-icon").removeClass('is-invalid');
            $("#player-icon-label").removeClass('text-danger');
            $("#player-icon").addClass('is-valid');
            $("#player-icon-label").addClass('text-success');
        });

        $('#player-form').on('input', '#player-icon', () => {
            if (iconlist[0].includes($('#player-icon').val())) {
                $("#player-icon").removeClass('is-invalid');
                $("#player-icon-label").removeClass('text-danger');
                $("#player-icon").addClass('is-valid');
                $("#player-icon-label").addClass('text-success');
            } else {
                $("#player-icon").removeClass('is-valid');
                $("#player-icon-label").removeClass('text-success');
                $("#player-icon").addClass('is-invalid');
                $("#player-icon-label").addClass('text-danger');
            }
        });
    });
    $("#player-form").on("click", "#submit-player", function () {
        if ($("#player-name").hasClass("is-valid") || $("#player-icon").hasClass("is-valid")) {
            $("#playerModal").css("display", "none")
            var newplayer = new Player(
                $("#player-name").val(),
                3,
                $("#player-icon").val(),
                $("#player-color").val()
            );
            NewPlayer(newplayer);
        }
    });
    $("#player-form").on("click", ".close", function () {
        $("#playerModal").css("display", "none")
    });
    $("#selectPlayerBtn").click(() => {
        DisplayPlayerSelector();
        $("#selectPlayerBtn").hide();
    });
    $("#player-list").on("change", "#user-select", function () {
        console.log(currentplayer)
        SetCurrentUser();
        DisplayPlayerInfo();
        DisplayStartButton();
        if (Object.keys(currentplayer).length > 0) {
            $("#startBtn").show();
            DisplayGridSizes();
        }
    });
    $("#buttons").on("click", "#startBtn", function () {
        DisplayNukeButton();
        $("#grid-size").hide();
        $("#startBtn").hide();
        if ($("#rowselector").val() == '') {
            if ($("#columnselctor").val() == '') {
                rows = 10;
                columns = 10;
            }
        }
        if (rows != 10 && columns != 10) {
            rows = $("#rowselector").val();
            columns = $("#columnselctor").val();

        }
        CreateGridBox(rows, columns);
    });
    $("#grid-box").on("click", ".fa", function (tile) {
        var tileowner = $(this).attr("data-player")

        PlayerTakesTurn(1500);

        if (tileowner != currentplayer.id) {
            $(".jumbotron").css("background-color", "#2ECC71")
            setTimeout(function () {
                $(".jumbotron").css("background-color", "#e9ecef")
            }, 1500);

            var numb = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
            if (tileowner < 0) {
                var X = this.id.split("-")[0]
                var Y = this.id.split("-")[1]
                let tile = new Tile(
                    X,
                    Y,
                    currentplayer.id
                );
                $.ajax({
                    url: `${serveraddress}/tiles`,
                    method: "POST",
                    data: tile,
                    success: function (result) {
                        console.log("post")
                    }
                });
            }
            if ((numb > 5) && (tileowner > 0)) {


                $(".jumbotron").css("background-color", "crimson")
                setTimeout(function () {
                    $(".jumbotron").css("background-color", "#e9ecef")
                }, 1500);


            } else if ((numb <= 5) && (tileowner > 0)) {

                for (index = 0; index < playerlist.length; index++) {
                    if (playerlist[index].id == currentplayer.id) {
                        var selectedtile = this.id;

                        let tile = {
                            id: selectedtile,
                            player: currentplayer.id
                        }

                        $.ajax({
                            url: `${serveraddress}/tiles/${selectedtile}`,
                            method: "PATCH",
                            data: tile,
                            success: function (result) {
                                $(".jumbotron").css("background-color", "#2ECC71")
                                setTimeout(function () {
                                    $(".jumbotron").css("background-color", "#e9ecef")
                                }, 1500);
                            }
                        });
                    }
                }
            }
        } else {
            console.log("Your tile")
        }
    });
    $("#buttons").on("click", "#nukeBtn", function () {
        if (currentplayer.nukes > 0) {
            PlayerTakesTurn(5000);
            currentplayer.nukes = currentplayer.nukes - 1
            UpdateNukes();
            NukeTable(currentplayer);
            $(".jumbotron").css("background-color", "#2ECC71")
            setTimeout(function () {
                $(".jumbotron").css("background-color", "#e9ecef")
            }, 2000);
        }
        else {
            $(".jumbotron").css("background-color", "crimson")
            setTimeout(function () {
                $(".jumbotron").css("background-color", "#e9ecef")
            }, 1500);
        }
    });
    $("#player-info").on("click", "#change-class", function () {
        let player = {
            "id": "8920",
            "nukes": "999"
        }
        console.log(player)
        $.ajax({
            url: `${serveraddress}/players/${currentplayer.id}`,
            method: "PATCH",
            data: player,
            success: async function (result) {
                await UpdatePlayerInfo();                
            }
        });    
    });
});
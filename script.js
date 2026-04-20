//get date from local device and display it
const date = new Date();
display_date = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("/");
let title = document.getElementById("title_date")
title.innerHTML = title.innerHTML + display_date

//add animation to links
let links = document.getElementsByClassName("link");
for (i=0; i < links.length; i++) {
    let link = links[i];
    link.innerHTML = link.attributes["data-title"].value;
    link.addEventListener("mouseover", selected);
    link.addEventListener("mouseout", deselected);
}

//show arrows when pointing at link
function selected(event) {
    let text = event.target.attributes["data-title"].value;
    event.target.innerHTML = ">>" + text;
}

//remove arrows when cursor isn't pointing
function deselected(event) {
    let text = event.target.attributes["data-title"].value;;
    event.target.innerHTML = text;
}

//set up audio player
let player = document.getElementById("player");
let player_control = document.getElementById("player_control");
let player_anim = document.getElementById("player_anim");
player_control.addEventListener("click", music_switch);

function music_switch() {
    condition = player_control.dataset.switch;
    
    if (condition == "off") { //i.e. audio isn't playing
        player_control.innerHTML = "&#x23F8";
        player.play();
        player_anim.play();
        player_control.dataset.switch = "on";
    } else {
        player_control.innerHTML = "&#x23F5";
        player.pause();
        player_anim.pause();
        player_control.dataset.switch = "off";
    }
}

//set up slideshow
let slideshow = document.getElementById("slideshow");
let display = document.getElementById("display");
let prev_slide = document.getElementById("prev_slide");
let next_slide = document.getElementById("next_slide");
let caption = document.getElementById("caption");

let images = []; //array with relatives paths to images for slideshow
for (let i = 0; i < 4; i++) {
    images.push("media/image" + String(i) + ".jpg");
}

let current_slide = 0;
display.src = images[current_slide];

prev_slide.addEventListener("click", slide_back);
next_slide.addEventListener("click", slide_next);

function slide_back() {
    if (current_slide > 0){
        current_slide--;
        display.src = images[current_slide];
    } else {
        current_slide = images.length - 1;
        display.src = images[current_slide];
    }
}

function slide_next() {
    if (current_slide < images.length - 1) {
        current_slide++;
        display.src = images[current_slide];
    } else {
        current_slide = 0;
        display.src = images[current_slide];
    }
}

//enable background animation only for computers
let mobile_check = window.innerWidth <= 1280;
if (!mobile_check) {
    //make background a bit bigger, so that we can add move animation to it without going out of its bounds
    let background = document.getElementById("background");
    background_style = window.getComputedStyle(background);
    size = background_style.getPropertyValue("background-size"); //get background's resolution
    size = size.split(" ");
    screen_width = Math.round(size[0].replace("px", ""))
    screen_height = Math.round(size[1].replace("px", ""))
    bck_width = screen_width * 1.05;
    bck_height = screen_height * 1.05;
    background.style.backgroundSize = String(bck_width) + "px" + " " + String(bck_height) + "px";
    move_x = Math.floor(bck_width - screen_width);
    move_y = Math.floor(bck_height - screen_height);
    background.style.backgroundPositionX = "-" + String(Math.floor(move_x/2)) + "px"; //Center the background. Now we can move it by half of move_x/move_y to each side
    background.style.backgroundPositionY = "-" + String(Math.floor(move_y/2)) + "px";

    //change background image's position relative to mouse
    document.addEventListener("mousemove", move_background);
    function move_background(event) {
        background.style.backgroundPositionX = String(-event.pageX * move_x/screen_width) + "px"; //i derived formula cursor/screen resolution = x/background-screen ratio. it was a headache
        background.style.backgroundPositionY = String(-event.pageY * move_y/screen_height) + "px";
    } 
}
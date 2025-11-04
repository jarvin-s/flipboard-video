//Setting up variables for our display
const flipboard_display_size = [84, 28]; //amount of columns,rows
const flipboard_dots_array = []; //an array for all the dots
const flipboard_element = document.querySelector("section"); //reference to the HTML flipboard container
const video_element = document.querySelector("video"); //reference to the video element that holds our video
const canvas_element = document.querySelector("canvas"); //reference to the Canvas element that should hold our videostream
const canvas_context = canvas_element.getContext("2d"); //Get the 2d context of our Canvas element, that we use to draw the video

//Set the amount of columns in our CSS
flipboard_element.style.setProperty(
  "--amount-of-columns",
  flipboard_display_size[0]
);

//Go over all rows and columns and populate the HTML section element
for (let columns = 1; columns <= flipboard_display_size[0]; columns++) {
  //for each columns
  for (let rows = 1; rows <= flipboard_display_size[1]; rows++) {
    //and each row inside that column
    //Create all the dots and populate the section with them
    const dot_element = document.createElement("div");
    //dot_element.innerText=columns+"-"+rows
    flipboard_element.appendChild(dot_element);
    //Set an arraydot in the fliboard array
    flipboard_dots_array.push(false);
  }
}

//Old notation of a function
// function update_flipboard(){
//     console.log("update")
// }

//Modern notation of a function (arrow function)
const update_dots = () => {
  for (let row = 1; row <= flipboard_display_size[1]; row++) {
    for (let column = 1; column <= flipboard_display_size[0]; column++) {
      let pixel_information = canvas_context.getImageData(
        column * (640 / flipboard_display_size[0]),
        row * (360 / flipboard_display_size[1]),
        1,
        1
      );
      pixel_information =
        pixel_information.data[0] +
        pixel_information.data[1] +
        pixel_information.data[2];
      let dot_array_location =
        (row - 1) * flipboard_display_size[0] + (column - 1);
      if (pixel_information > 382) {
        flipboard_dots_array[dot_array_location] = false;
        //Make the dot true, to show a dot
      } else {
        //Make the dot false
        flipboard_dots_array[dot_array_location] = true;
      }
    }
  }
};

//Modern notation of a function (arrow function)
const update_flipboard = () => {
  flipboard_dots_array.forEach((dot, index) => {
    //    dot=Math.random()<0.5 //Randomly define if a dot is on or off
    const dot_element = flipboard_element.querySelector(
      "div:nth-child(" + (index + 1) + ")"
    ); //Referencing that specific dot in your HTML (with the X numberth child)
    if (dot) {
      //checking if statement (variable which holds the dot true or false)
      //If it is active
      dot_element.classList.add("on");
    } else {
      //If it is not active
      dot_element.classList.remove("on");
    }
  });
};

navigator.mediaDevices
  .getUserMedia({ audio: false, video: { width: 640, height: 360 } })
  .then((videostream) => {
    video_element.srcObject = videostream;
    video_element.play();
    setInterval(() => {
      canvas_context.drawImage(video_element, 0, 0, 640, 360);
    }, 1000 / 15);
  });

//There is 2 timing functions, one to run once and one to run at an interval
//We need the one with the interval
// setTimeout(()=>{
//     //do something once after 1 second
// },1000) //amount of miliseconds

//Every time update the flipboard
setInterval(() => {
  update_dots();
  update_flipboard();
}, 1000 / 15); //amount of miliseconds (1s divided by 15, so 15 times (frames) a second alias 15fps)

console.log(flipboard_dots_array);
// console.log(flipboard_dots_array)

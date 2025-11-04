const flipboard_display_size = [84, 28];
const flipboard_dots_array = [];
const flipboard_element = document.querySelector("section");
const video_element = document.querySelector("video");
const canvas_element = document.querySelector("canvas");
const canvas_context = canvas_element.getContext("2d");

flipboard_element.style.setProperty(
  "--amount-of-columns",
  flipboard_display_size[0]
);

for (let columns = 1; columns <= flipboard_display_size[0]; columns++) {
  for (let rows = 1; rows <= flipboard_display_size[1]; rows++) {
    const dot_element = document.createElement("div");
    flipboard_element.appendChild(dot_element);
    flipboard_dots_array.push(false);
  }
}

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
        (row - 1) * flipboard_display_size[0] + column - 1;
      if (pixel_information > 382) {
        flipboard_dots_array[dot_array_location] = false;
      } else {
        flipboard_dots_array[dot_array_location] = true;
      }
    }
  }
};

const update_flipboard = () => {
  flipboard_dots_array.forEach((dot, index) => {
    const dot_element = flipboard_element.querySelector(
      "div:nth-child(" + (index + 1) + ")"
    );
    if (dot) {
      dot_element.classList.add("on");
    } else {
      dot_element.classList.remove("on");
    }
  });
};

navigator.mediaDevices
  .getUserMedia({
    audio: false,
    video: { width: 640, height: 360 },
  })
  .then((videostream) => {
    video_element.srcObject = videostream;
    video_element.play();
    setInterval(() => {
      canvas_context.drawImage(video_element, 0, 0, 640, 360);
    }, 1000 / 15);
  });

setInterval(() => {
  update_dots();
  update_flipboard();
}, 1000 / 15);

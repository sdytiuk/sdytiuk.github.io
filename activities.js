let imagePaths = ['dates.jpg', 'marmot2.jpg', 'mountainbike.jpg', 'paddleboarding2.png', 'workingout.jpg', 'yyj_bridge.png'];
let images;

//preload all the images
imagePaths.forEach((e,i) => {
    images[i] = new Image();
    images[i].src = "./images/" + e; 
});

//use a timer to highlight each image in the figure tag for a time, then place it into the below grid
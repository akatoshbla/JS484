// This Javascript file was created by David Kopp

// Global Variables
var images = [];
var checkedBoxes = [];
var downloadButtonCount = 0;
var isModalOpen = false;

// Get the list of images that are in the album folder
window.onload = function () {
    "use strict";
    
    // Animage the background with snow citation on top of the function's code
    letItSnow();
    
    console.log("Started windows.load function to fill image array");
    var url,
        ext = ".jpg",
        http = new XMLHttpRequest(); // Ajax object to check if the filename exist.
    for (var i = 1; i <= 25; i++) {
        url = "images/" + i + ext;
        http.open("HEAD", url, false);
        http.send();
        if (http.status !== 404) {
            images.push(url);
            console.log(i + ext + " FileFound and added to image array");
        } else {
            console.log("Error " + i + ".jpg FileNotFound. HTTP Error 404."); // This error should be called once
            console.dir(images);
            dynStyle(); // Method to make the dynamic html elements needed for the thumbnails
            return false;
        }
    } 
}

// This function's code was created by an anonymous individual from http://thecodeplayer.com/walkthrough/html5-canvas-snow-effect
function letItSnow() {
    "use strict";
    
    console.log("Particle system launched");
    var canvas = document.getElementById("snow");
    var context = canvas.getContext("2d");
    var particles = []; // This array represents the number of particles on the canvas
    var maxParticles = 100;
    
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    
    //console.log(canvas.height);
    //console.log(canvas.width);
    
    // creation of all the particle objects
    for (var i = 0; i < maxParticles; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 4 + 1,
            density: Math.random() * maxParticles
        })
    }
    
    // draw function that is called on every redraw on the canvas
    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height) 
        context.fillStyle = "rgba(255, 255, 255, 0.9)";
        context.beginPath();
        
        for (var i = 0; i < maxParticles; i++) {
            var particle = particles[i];
            
            context.moveTo(particle.x, particle.y);
            context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, true);
        }
        
        context.fill();
        update();
    }
	
	var angle = 0;
	
    // Changes the angle that the particle is redrawn at on the its x and y axis as it falls
    function update() {
        angle += 0.01;
        
        for (var i = 0; i < maxParticles; i++) {
            var particle = particles[i];
            
            particle.x += Math.sin(angle) * 2;
            particle.y += Math.cos(angle + particle.density) + 1 + particle.radius / 2;
            
            if (particle.x > canvas.width + 5 || particle.x < -5 || particle.y > canvas.height) {
                if(i % 3 > 0) {
                    particles[i] = {
                        x: Math.random() * canvas.width,
                        y: -10,
                        radius: particle.radius,
                        density: particle.density};
                } else {
                    if (Math.sin(angle) > 0) {
                        particles[i] = {
                            x: -5,
                            y: Math.random() * canvas.height,
                            radius: particle.radius,
                            density: particle.density};
                    } else {
                        particles[i] = {
                            x: canvas.width + 5,
                            y: Math.random() * canvas.height,
                            radius: particle.radius,
                            density: particle.density};
                    }
                }
            }
        }
    }
    
    // sets the interval of the redraw of the canvas. lower the number the fast the particles move
    setInterval(draw, 5);    
}

// Method to make the dynamic html elements for the thumbnails
function dynStyle() {
    "use strict";
    console.log("Starting to create thumbnails");
    
    for (var i = 0; i < images.length; i++) {
        var currentDiv = document.getElementById("thumbnails");
        var outerElement = document.createElement("div");
        var innerElement = document.createElement("div");
        var checkBoxHolder = document.createElement("div");
        var checkBox = document.createElement("input");
        var image = document.createElement("img");
        var caption = document.createElement("figcaption");
    
        outerElement.className = "outerImageHolder";
        innerElement.className = "imageHolder";
        checkBoxHolder.className = "checkbox";
        checkBox.type = "checkbox";
        
        checkBox.id = "check" + i;
        image.id = "image" + i;
        image.src = images[i];
        image.addEventListener("click", function (event) {
            var thumbnailSrc = document.getElementById(event.target.getAttribute("id")).src;
            var imageNumber = thumbnailSrc.split("/").pop(); // removes the folder name off the url
            imageNumber = imageNumber.slice(0, -4); // removes the extention off the url of the image
            
            document.getElementById("previewImage").src = thumbnailSrc;
            document.getElementById("previewCaption").innerHTML = "Image " + imageNumber;
            //console.log(event);
        }, false);
        image.addEventListener("mouseover", function (event) { // this adds a js verison of hover over
            var thumbnailSrc = document.getElementById(event.target.getAttribute("id")).src;
            var imageNumber = thumbnailSrc.split("/").pop();
            
            imageNumber = parseInt(imageNumber.slice(0, -4)); 
            document.getElementById("image" + (imageNumber - 1)).style.borderColor = "yellow";
        });
        image.addEventListener("mouseout", function () { // this adds a js version of hover off
            var thumbnailSrc = document.getElementById(event.target.getAttribute("id")).src;
            var imageNumber = thumbnailSrc.split("/").pop();
            
            imageNumber = parseInt(imageNumber.slice(0, -4));
            document.getElementById("image" + (imageNumber - 1)).style.borderColor = "grey";
        })
        caption.innerHTML = "Image " + (i + 1);
        
        checkBoxHolder.appendChild(checkBox);
        innerElement.appendChild(checkBoxHolder);
        innerElement.appendChild(image);
        innerElement.appendChild(caption);
        outerElement.appendChild(innerElement);
        currentDiv.appendChild(outerElement);
    }
}

// Event listeners for the gallery
document.getElementById("checkAllButton").addEventListener("click", checkAllBoxes, false);
document.getElementById("uncheckAllButton").addEventListener("click", uncheckAllBoxes, false);
document.getElementById("downloadButton").addEventListener("click", downloadImages, false);
document.getElementById("previewImage").addEventListener("click", showModal, false);
document.getElementById("close").addEventListener("click", closeModal, false);
document.addEventListener("keyup", keyPressed, false);

// Method to show the modal
function showModal() {    
    var modal = document.getElementById("modal");
    var modalContent = document.getElementById("modalContent");
    
    modal.style.display = "block";
    modalContent.src = this.src;
    isModalOpen = true;
}

// Method to close the model
function closeModal() {
    var modal = document.getElementById("modal");
    var currentImageSrc = document.getElementById("previewImage").src;
    var imageNumber = currentImageSrc.split("/").pop();
    imageNumber = parseInt(imageNumber.slice(0, -4));
    
    modal.style.display = "none";   
    document.getElementById("image" + (imageNumber - 1)).scrollIntoView(true);
    isModalOpen = false;
}

// Method to monitor and react to the right and left arrow keys and esc.
function keyPressed() {
    var modal = document.getElementById("modal");
    var currentImageSrc = document.getElementById("previewImage").src;
    var imageNumber = currentImageSrc.split("/").pop();
    imageNumber = parseInt(imageNumber.slice(0, -4));
    
    //console.dir(event.keyCode);
    if (event.key === "Escape" || event.keyCode === 27) {
        console.log("esc pressed");
        modal.style.display = "none";
        document.getElementById("image" + (imageNumber - 1)).scrollIntoView(true);
        isModalOpen = false;
    } else if (event.key === "ArrowLeft" || event.keyCode === 37) {
        //console.log(imageNumber);
        
        if (imageNumber > 1 && imageNumber <= images.length) {
            //console.log("images/" + (imageNumber - 1) + ".jpg");
            document.getElementById("modalContent").src = "images/" + (imageNumber - 1) + ".jpg";
            document.getElementById("previewImage").src = "images/" + (imageNumber - 1) + ".jpg";
            document.getElementById("previewCaption").innerHTML = "Image " + (imageNumber - 1);
            if (!isModalOpen) {
                document.getElementById("image" + (imageNumber - 2)).scrollIntoView(true);
            }

            if (imageNumber > 1) {
                document.getElementById("image" + (imageNumber - 2)).style.borderColor = "yellow";
                document.getElementById("image" + (imageNumber - 1)).style.borderColor = "grey"; 
            } else if (imageNumber === images.length) {
                document.getElementById("image" + (imageNumber - 2)).style.borderColor = "yellow";               
            }
        }
    } else if (event.key === "ArrowRight" || event.keyCode === 39) {
        //console.log(imageNumber);
        
        if (imageNumber >= 1 && imageNumber < images.length) {
            //console.log("images/" + (imageNumber + 1) + ".jpg");
            document.getElementById("previewImage").src = "images/" + (imageNumber + 1) + ".jpg";
            document.getElementById("previewCaption").innerHTML = "Image " + (imageNumber + 1);
            document.getElementById("modalContent").src = "images/" + (imageNumber + 1) + ".jpg";
            if (!isModalOpen) {
                document.getElementById("image" + imageNumber).scrollIntoView(true);
            }
            
            if (imageNumber > 1) {
                document.getElementById("image" + imageNumber).style.borderColor = "yellow";
                document.getElementById("image" + (imageNumber - 1)).style.borderColor = "grey";
            } else {
                document.getElementById("image" + imageNumber).style.borderColor = "yellow";
                if (document.getElementById("image" + (imageNumber - 1)).style.borderColor === "yellow") {
                    document.getElementById("image" + (imageNumber - 1)).style.borderColor = "grey";
                }
            }
        }
    }
}

// Method that checkmarks all the checkbox elements
function checkAllBoxes() {
    for (var i = 0; i < images.length; i++) {
        document.getElementById("check" + i).checked = true;
    }
}

// method that removes all the checkbox elements checkmarks
function uncheckAllBoxes() {
    for (var i = 0; i < images.length; i++) {
        document.getElementById("check" + i).checked = false;
    }
}

// Method that starts to gather all the images that have been selected to download
function downloadImages() {    
    var counter = 0;
    
    console.log("Download button clicked");
    downloadButtonCount++;
    
    // Checks to make sure you can not download a zip twice. The issue here is that the timing involved to clear out the zip object is difficult or impossible to time.
    if (downloadButtonCount >= 2) {
        alert("To download more files please reload the web page by using the refresh button in your internet browser");
        return true;
    }
    for (var i = 0; i < images.length; i++) {
        var box = document.getElementById("check" + i);
        if (box.checked) {
            console.log(box.id + " is checked file " + images[i]);
            checkedBoxes.push(images[i]); // Adds to the array of images that have been selected to zip
        } else {
            counter++;
        }
        if (counter == images.length) {
            if (downloadButtonCount === 1) {
                downloadButtonCount--;
            }
            alert("No checkbox has been selected");
            return true;
        }
    }
    zipImages(checkedBoxes); // Call to zip the array
}

// Method that zips an array of urls in the client memory
function zipImages(imageArray) {
    var counter = 0;
    var binaryRetrievalCounter = 0; // This is a closure variable
    var zip = new JSZip(); // JSZip object from the JSZip library
    zip.folder("galleryImages"); // Adds a folder in the zip object
    
    imageArray.forEach(function(url) {
       var fileName = url.split("/").pop();
        
        // This method call is an asynchronous call that is giving us the ckearing zip file issue
        JSZipUtils.getBinaryContent(url, function (error, data) {
           if (error) {
               throw error;
           } 
            zip.file("galleryImages/" +fileName, data, {binary: true});
            console.log("getting binary content");
            counter++;
            if (counter == imageArray.length) {
                var browser = navigator.userAgent;
                //console.dir(navigator);
                
                // This checks which browser the user is using to handle the zipping of the file correctly. Order matters...
                if (browser.indexOf("Chrome") != -1) {
                    console.log("User is using Chrome");
                    
                    zip.generateAsync({type: "blob"}).then(function (file) {
                        saveAs(file, "Download.zip");
                    });
                } else if (browser.indexOf("Safari") != -1) {
                    console.log("User is using Safari");
                    alert("After the zip file is loaded please look for a file named unknown in your downloads folder and rename the file to unknown.zip. Then use the zip file as usual. Sorry for the issue.");
                        
                    zip.generateAsync({type: "base64"}).then(function (file) {
                        location.href = "data:application/zip;base64," + file;
                    });
                }  else if (browser.indexOf("Opera") != -1) {
                    console.log("User is using Opera");
                    
                    zip.generateAsync({type: "base64"}).then(function (file) {
                        location.href = "data:application/zip;base64," + file;
                    });
                } else if (browser.indexOf("Firefox") != -1) {
                    console.log("User is using Firefox");
                    
                    zip.generateAsync({type: "base64"}).then(function (file) {
                        location.href = "data:application/zip;base64," + file;
                    });
                } else if (browser.indexOf("MSIE") != -1) {
                    console.log("User is using Microsoft Internet Explorer");
                    
                    zip.generateAsync({type: "base64"}).then(function (file) {
                        location.href = "data:application/zip;base64," + file;
                    });
                }
            } // end of makeZip
        }); // end of getBinaryContent
    }); // end of foreach
    console.log("end of foreach");
    
// This section is in development for later use - to decrease dependancy on the FileSaver.js library(does not work with safari);
/*    console.dir(imageArray); 
    for (var i = 0; i < imageArray.length; i++) {
    var image = new Image();
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    
    image.onload = function () {
        console.log("onload function ignited")
        canvas.width = this.width;
        canvas.height = this.height;
        
        context.drawImage(this, 0, 0, image.width, image.height);
        
        var imageData = canvas.toDataURL();
        
        //console.log(imageData);
        //var data = imageData.split(",").pop();
        //console.log(data);
        //return imageData;
        var fileName = this.src;
        zip.file(fileName.split("/").pop(), imageData.split(",").pop(), {base64: true});
        console.log("zipped file: " + this.src);
            
    }
    console.log("imageArray size is: " + imageArray.length);
    image.src = imageArray[i];
        console.log("after onload function");
        if (i == imageArray.length - 1) {
            console.log("making zip File");
            zip.generateAsync({type:"base64"}).then(function(file) {
            //saveAs(file, "images.zip");
            window.location.href = "data:application/zip;base64," + file;}); 
        }
    } */
}
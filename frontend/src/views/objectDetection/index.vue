<script setup>
    import ml5 from 'ml5';
    import p5 from 'p5';

    var p5obj = function (sketch) {
        let detector;
        let ready = false;
        let img;
        let multiplier = {
            x: null,
            y: null,
        };

        function drawRects(e, r) {
            if (e != null) {
                alert('Error: ' + e);
            }

            console.log(r);
            if (r != null) {
                for (let i = 0; i < r.length; i++) {
                    let object = r[i];
                    sketch.stroke(0, 255, 0);
                    sketch.strokeWeight(4);
                    sketch.noFill();
                    sketch.rect(
                        object.x * multiplier.x,
                        object.y * multiplier.y,
                        object.width * multiplier.x,
                        object.height * multiplier.y,
                    );
                    sketch.noStroke();
                    sketch.fill(255);
                    sketch.textSize(24);
                    sketch.text(
                        object.label + ` ${sketch.nf(100 * object.confidence, 2, 1)}%`,
                        object.x * multiplier.x + 10 * multiplier.x,
                        object.y * multiplier.y - 5,
                    );
                }
            }
        }

        function imageLoaded() {
            // WAIT FOR IMAGE TO LOAD
            if (img && img.width) {
                sketch.image(img, 0, 0, sketch.width, sketch.height);

                multiplier.x = sketch.width / img.width;
                multiplier.y = sketch.height / img.height;

                detector.detect(img, drawRects);
            } else setTimeout(imageLoaded, 100);
        }

        function imageDetect(url) {
            img = sketch.loadImage(url, imageLoaded());
        }

        function modelReady() {
            ready = true;
            let url = '';
            // if(url)
            // alert("If image no loaded probably CORS issue. Try again different image.");

            imageDetect(url || 'https://i.imgur.com/xC1KKXG.png');
        }

        sketch.setup = function () {
            var c = sketch.createCanvas(1200, 800);
            c.parent('canvas');
            sketch.background(0);

            // file input
            let input = sketch.createFileInput(handleFile);
            // add class

            input.class(
                'block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400',
            );
            input.position(20, 20);

            // Add text 'Model Loading...'
            sketch.textSize(32);
            sketch.fill(255);
            sketch.textAlign(sketch.CENTER);
            sketch.text('Model Loading...', sketch.width / 2, sketch.height / 2);

            // Load model
            detector = ml5.objectDetector('cocossd', modelReady);
        };
    };

    function handleFile(f) {
        console.log('yeah we got a file!');
    }

    setTimeout(function () {
        var myp5 = new p5(p5obj);
    }, 1000);
</script>

<template>
    <div>
        <!-- URL to image -->
        <div class="flex justify-center">
            <!-- <i class="fa fa-search"></i> -->
            <!-- <input type="text" class="h-14 w-96 pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none" placeholder="Type url for image!"> -->

            <!-- <button class="w-20 text-white rounded-lg bg-red-500 hover:bg-red-600">Redraw</button> -->
        </div>
        <div id="canvas"></div>
    </div>
</template>

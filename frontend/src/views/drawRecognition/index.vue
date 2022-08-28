<script setup>
    import ml5 from 'ml5';
    import p5 from 'p5';

    var p5obj = function (sketch) {
        let clearButton;
        let c;
        let doodleClassifier;
        let resultsDiv;
        let mc = 0;
        let sc = 255;
        let penSize = 16;

        function clearCanvas() {
            sketch.background(sc);
        }

        function changeColors() {
            mc = mc == 0 ? 255 : 0;
            sc = sc == 0 ? 255 : 0;

            sketch.background(mc == 0 ? 255 : 0);
        }

        function changePenSizeS() {
            changePenSize(-1);
        }

        function changePenSizeB() {
            changePenSize(1);
        }

        function changePenSize(arg) {
            penSize += arg;
            if (penSize < 1) {
                penSize = 1;
            }
        }

        sketch.setup = function () {
            c = sketch.createCanvas(1200, 800);
            sketch.background(mc);

            // Add text 'Model is still loading...'
            sketch.textSize(32);
            sketch.textAlign(sketch.CENTER, sketch.CENTER);
            sketch.fill(mc);
            sketch.text('Model is still loading...', sketch.width / 2, sketch.height / 2);

            // clear button
            clearButton = sketch.createButton('CLEAR THE CANVAS!!!');
            clearButton.position(10, sketch.height / 2);
            // add class
            clearButton.class(
                'bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded',
            );
            clearButton.mousePressed(clearCanvas);

            // change colors button
            clearButton = sketch.createButton('Change colors');
            clearButton.position(10, sketch.height / 2 + 50);
            clearButton.class(
                'bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded',
            );
            clearButton.mousePressed(changeColors);

            // change pen size button
            clearButton = sketch.createButton('Make pen smaller');
            clearButton.position(10, sketch.height / 2 + 50 * 2);
            clearButton.class(
                'bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded',
            );
            clearButton.mousePressed(changePenSizeS);

            // change pen size button
            clearButton = sketch.createButton('Make pen bigger');
            clearButton.position(10, sketch.height / 2 + 50 * 3);
            clearButton.class(
                'bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded',
            );
            clearButton.mousePressed(changePenSizeB);

            // make div for results
            resultsDiv = sketch.createDiv();

            // load the model
            doodleClassifier = ml5.imageClassifier('DoodleNet', modelReady);
        };

        function modelReady() {
            sketch.background(0);
            doodleClassifier.classify(c, gotResults);
        }

        function gotResults(e, r) {
            if (e) alert('Error: ' + e);

            let content = `Pen size: ${penSize}<br>`;
            for (let i = 0; i < 7; i++) {
                content += "<span class='mr-10 text-xl mt-3'>";
                content += r[i].label + ': ' + sketch.nf(100 * r[0].confidence, 2, 1) + '%';
                content += '</span>';
            }

            resultsDiv.html(content);
            doodleClassifier.classify(c, gotResults);
        }

        sketch.draw = function () {
            if (sketch.mouseIsPressed) {
                sketch.stroke(mc);
                sketch.strokeWeight(penSize);
                sketch.line(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY);
            }
        };
    };

    setTimeout(function () {
        var myp5 = new p5(p5obj);
    }, 1000);
</script>

<template></template>

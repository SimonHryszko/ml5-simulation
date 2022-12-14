import { transformExpression } from '@vue/compiler-core';
import ml5 from 'ml5';
import { ref } from 'vue';
// https://www.youtube.com/watch?v=XPhBVWyZXXk
let nn;

const nnOptions = {
    task: 'classification',
    debug: false,
};

const trainingOptions = {
    epochs: 32,
    batchSize: 12,
};

// initialize and train the neural network

export function initNN(data) {
    // 1 initialize the neural network
    nn = ml5.neuralNetwork(nnOptions);

    // 2 add data to the neural network
    data.forEach((item) => {
        const inputs = {
            r: item.r,
            g: item.g,
            b: item.b,
        };

        const output = {
            color: item.color,
        };

        nn.addData(inputs, output);
    });

    // 3 normalize the data
    nn.normalizeData();

    // 4 train the neural network
    nn.train(trainingOptions, finishedTraining);
}

// callback finishedTraining
function finishedTraining() {
    console.log('finished training');
}

// make classification
export function classify(input) {
    nn.classify(input, gotResult);
}

export const colorLabel = ref('');

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        colorLabel.value = results[0].label;
    }
}

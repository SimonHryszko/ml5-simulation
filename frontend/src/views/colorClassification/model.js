import ml5 from 'ml5';
import data from './data.json';
import { ref } from 'vue';

let network;
const options = { task: 'classification', debug: false };
const trainingOptions = { epochs: 32, batchSize: 12 };
let isModelReady = false;

export const result = ref([]);
export const load = () => {
    // initialize the neural network
    network = ml5.neuralNetwork(options);

    // add data to the neural network
    data.map((item) => {
        let input;
        if (item.hex) {
            input = {
                r: parseInt(item.hex.substring(1, 3), 16) / 255,
                g: parseInt(item.hex.substring(3, 5), 16) / 255,
                b: parseInt(item.hex.substring(5, 7), 16) / 255,
            };
        } else {
            input = {
                r: item.r,
                g: item.g,
                b: item.b,
            };
        }

        network.addData(input, {
            color: item.color,
        });
    });

    // normalize the data
    network.normalizeData();

    // train the neural network
    network.train(trainingOptions, trained);
};

const trained = () => {
    isModelReady = true;
};

export const classify = (input) => {
    if (!isModelReady) {
        console.log('Model is not ready yet!');
        return false;
    }
    network.classify(input, classified);
};

const classified = (err, r) => {
    if (err) {
        console.log(err);
    } else {
        result.value = r;
    }
};

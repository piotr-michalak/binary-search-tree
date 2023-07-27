// remove duplicates and sort
function handleArray(array) {
    let newArray = [...new Set(array)].sort((a, b) => a - b);

    return newArray;
}

function createRandomizedArray() {
    return [...Array(15)].map(() => Math.floor(Math.random() * 100));
}

export { handleArray, createRandomizedArray };
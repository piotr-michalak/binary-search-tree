// remove duplicates and sort
function handleArray(array) {
    let newArray = [...new Set(array)].sort((a, b) => a - b);

    return newArray;
}

export { handleArray };
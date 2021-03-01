const getMayus = (string) => {
    const newLetter = string.trim().split('')[0].toUpperCase()
    if(string.trim().includes(' ')){ 
        string.split(' ')[1][0].toUpperCase()
    }
}

export default getMayus;

function JustNumberInputCheck(event) {
    const isNumber = /^[0-9]$/i.test(event.key)
    
    if (!isNumber && event.which != 8) {
        event.preventDefault();
    }
}

export default JustNumberInputCheck
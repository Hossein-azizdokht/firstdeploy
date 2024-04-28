const Check_postcode = (event) => {
    // var p = document.getElementById("post_code").value;
    var pattern = /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/gm;
    if (pattern.test(event) === false) {
        document.getElementById("post_code").style = "border-color: #ff0000";
        document.getElementById("postcode_err").style.display = "block";
        document.getElementById("postcode_err").innerHTML = "کد پستی 10 رقمی را درست وارد کنید";
    } else {
        document.getElementById("post_code").style = "border-color: #d2d6de";
        document.getElementById("postcode_err").style.display = "none";
    }
}

export default Check_postcode;
import getAccessToken from "../helper/getAccesstoken";
import BaseURL from "../_instance/instance";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";






function joinURL(reqURL, url) {
    return `${reqURL}/${url}`
}

function GoOut() {
    // const history = useHistory();
    // history.push("/login");
    window.location.href = "/";

    toast.error("مدت‌زمان اعتبار شما به پایان رسیده است، لطفا مجددا وارد شوید", {
        position: toast.POSITION.TOP_CENTER,
    });
}
// سرویس اصلی
// const domain = BaseURL

// سرویس تستی
const domain = BaseURL


class Services {

    //---REQUEST FUNCTION
    request(url, method = "POST", data = null) {


        


        // const Authorization = getAccessToken();
        const headers = {
            "Accept": "application/json",
            "Content-type": "application/json",
            scheme: 'http',
            // Authorization: Authorization
        }
        url = joinURL(domain, url);

        const options = {
            headers,
            method,
        }
        if (data) {
            options.body = JSON.stringify({ ...data })
        }
        return fetch(url, options)
        // .then((response) => {
            
        //     if (response.status === 401) {
        //         GoOut();
        //     }
        // });
    }
    //---POST 
    post(url, data) {
        const method = "POST";
        return this.request(url, method, data).then(res => res.json())
    }
    //---GET
    get(url, id) {
        const method = "Get";
        if (id) {
            url = `${url}/${id}`
        }
        return this.request(url, method).then(res => res.json())

    }
    delete(url) {
        const method = "DELETE";
        return this.request(url, method).then(res => res.json())
    }

    put(url, data) {
        const method = "PUT";
        return this.request(url, method, data).then(res => res.json())
    }

    getAll() {


    }

}

export default Services;


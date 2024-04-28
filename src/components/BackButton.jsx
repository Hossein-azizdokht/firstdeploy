import { ArrowBack } from "@material-ui/icons";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

const GoBack = () => {
    let history = useHistory();
    return (
        <span style={{marginRight: '14px',borderRight: '1px solid #ddd'}}>
            <Button color="secondary" className="btn btn-secodary" onClick={() => history.goBack()}>
                <span>بازگشت</span>
                <ArrowBack sx={{ marginRight: 1 }} />
            </Button>
        </span>
    );
};

export default GoBack;
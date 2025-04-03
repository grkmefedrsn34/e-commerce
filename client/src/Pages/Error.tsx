import { Alert, AlertTitle, Button, Container, List, ListItem, ListItemText } from "@mui/material";
import request from "../api/Request";
import { useState } from "react";

export default function Error() {
    const [validationsError, setValidationsError] = useState<string[]>([]);

    function getValidationError() {
        request.Errors.getValidationError()
            .then(() => console.log("No validation errors"))
            .catch(errors => setValidationsError(errors));
    }

    return (
        <Container>
            {validationsError.length > 0 && (
                <Alert sx={{ mb: 2 }} severity="error">
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {validationsError.map((error, index) => (
                            <ListItem key={index}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            )}

            <Button sx={{ mr: 2 }} variant="contained" onClick={() => request.Errors.get400Error().catch(error => console.log(error))}>
                400 ERROR
            </Button>
            <Button sx={{ mr: 2 }} variant="contained" onClick={() => request.Errors.get401Error().catch(error => console.log(error))}>
                401 ERROR
            </Button>
            <Button sx={{ mr: 2 }} variant="contained" onClick={() => request.Errors.get404Error().catch(error => console.log(error))}>
                404 ERROR
            </Button>
            <Button sx={{ mr: 2 }} variant="contained" onClick={() => request.Errors.get500Error().catch(error => console.log(error))}>
                500 ERROR
            </Button>
            <Button sx={{ mr: 2 }} variant="contained" onClick={getValidationError}>
                Validation ERROR
            </Button>
        </Container>
    );
}

import { LockOutline } from "@mui/icons-material";
import { Avatar, Box, Container, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

import { loginUser } from "./accountSlice";
import { useLocation, useNavigate } from "react-router";
import { useAppDispatch } from "../../Store/store";
import { getCart } from "../cart/CartSlice";

// Login formuna özel tip tanımı
type LoginFormInputs = {
    username: string;
    password: string;
};

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<LoginFormInputs>({
        defaultValues: {
            username: "",
            password: ""
        },
        mode: "onChange"
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    async function submitForm(data: LoginFormInputs) {
        await dispatch(loginUser(data));
        await dispatch(getCart());
        navigate(location.state?.from || "/catalog");
    }

    return (
        <Container maxWidth="xs">
            <Paper sx={{ marginTop: 8, padding: 2 }} elevation={3}>
                <Avatar sx={{ mx: "auto", color: "secondary.main", textAlign: "center", mb: 1 }}>
                    <LockOutline />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>Login</Typography>
                <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={handleSubmit(submitForm)}>
                    <TextField
                        {...register("username", { required: "Username is required" })}
                        label="Enter username"
                        fullWidth
                        required
                        autoFocus
                        sx={{ mb: 1 }}
                        size="small"
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                    <TextField
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Min length is 6 characters"
                            }
                        })}
                        label="Enter password"
                        fullWidth
                        required
                        type="password"
                        sx={{ mb: 2 }}
                        size="small"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <LoadingButton loading={isSubmitting} disabled={!isValid} type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Login
                    </LoadingButton>
                </Box>
            </Paper>
        </Container>
    );
}


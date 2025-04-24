import { LockOutline } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Container, Paper, Avatar, Typography, Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import request from "../../api/Request";
import { toast } from "react-toastify";

type RegisterFormInputs = {
    username: string;
    name: string;
    email: string;
    password: string;
};

export default function RegisterPage() {
    const {
        register,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting, isValid }
    } = useForm<RegisterFormInputs>({
        defaultValues: {
            username: "",
            name: "",
            email: "",
            password: ""
        },
        mode: "onTouched"
    });

    const navigate = useNavigate();

    async function submitForm(data: RegisterFormInputs) {
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
    
        try {
            await request.Account.register(formData); // Artık FormData gönderiliyor
            toast.success("User Created.");
            navigate("/login");
        } catch (result: any) {
            const { data: errors } = result;
            errors.forEach((error: any) => {
                if (error.code === "DuplicateUserName") {
                    setError("username", { message: error.description });
                } else if (error.code === "DuplicateEmail") {
                    setError("email", { message: error.description });
                }
            });
        }
    }
    

    return (
        <Container maxWidth="xs">
            <Paper sx={{ marginTop: 8, padding: 2 }} elevation={3}>
                <Avatar sx={{ mx: "auto", color: "secondary.main", textAlign: "center", mb: 1 }}>
                    <LockOutline />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
                    Register
                </Typography>
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
                        {...register("name", { required: "Name is required" })}
                        label="Enter name"
                        fullWidth
                        required
                        sx={{ mb: 1 }}
                        size="small"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format"
                            }
                        })}
                        label="Enter email"
                        fullWidth
                        required
                        sx={{ mb: 1 }}
                        size="small"
                        error={!!errors.email}
                        helperText={errors.email?.message}
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
                    <LoadingButton
                        loading={isSubmitting}
                        disabled={!isValid}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </LoadingButton>
                </Box>
            </Paper>
        </Container>
    );
}

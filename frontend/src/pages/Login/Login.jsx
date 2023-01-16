import React, { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
const Login = () => {
	const toast = useToast();
	const [data, setData] = useState({});
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(data, " Sent data");
		axios({
			method: "post",
			url: "https://nykaclonebymyteam.herokuapp.com/login",
			data: { ...data },
		})
			.then((res) => {
				console.log(res.data);
				localStorage.setItem("token",res.data.token)
				if (res.data.message === "login successfull") {
					toast({
						title: `login successful`,
						status: "success",
						position: "top",
						isClosable: true,
						color: "white",
					});
					navigate("/");
				} else {
					toast({
						title: `unauthorized`,
						status: "error",
						position: "top",
						isClosable: true,
						color: "white",
					});
				}
			})
			.catch((err) => console.log(err, "err"));
	};

	const handleChange = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<div>
			<div>
				<hr />
			</div>
			<div style={{ paddingBottom: "60px" }}>
				<div className={styles.sc1}>
					<img
						style={{ height: "17px", margin: "4vh 0vh 0vh 4vh" }}
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyVhNLTUnAPBQYMepezLlKgTmXwNHlHnKTdlFYGlgW56q9V9lJ3cpSiYLBrRgkRRuFSd0&usqp=CAU"
						alt=""
						onClick={() => navigate("/otp")}
					/>
					<h1>LOGIN</h1>

					<hr style={{ margin: "2vh 2vh 0vh 2vh" }} />
					<form onSubmit={handleSubmit}>
						<input
							style={{
								border: "1px solid red",
								height: "6vh",
								margin: "5vh 0vh 0vh 4vh",
								width: "85%",
								textAlign: "center",
								outline: "red",
							}}
							type="text"
							name="email"
							onChange={handleChange}
							placeholder="Username"
						/>
						<input
							style={{
								border: "1px solid red",
								height: "6vh",
								margin: "2vh 0vh 0vh 4vh",
								width: "85%",
								textAlign: "center",
								outline: "red",
							}}
							type="password"
							name="password"
							onChange={handleChange}
							placeholder="Password"
						/>
						<br />
						<br />

						<input
							style={{
								backgroundColor: "#fb2e79",
								margin: "2vh 0vh 0vh 4vh",
								color: "white",
								width: "85%",
								height: "6vh",
								fontSize: "1.1rem",
								fontWeight: "500",
								borderRadius: "3px",
							}}
							type="submit"
						/>

						<Link
							to="/verifymail"
							style={{
								margin: "0vh 0vh 0vh 30vh",
								color: "blue",
								fontSize: "0.9rem",
							}}
						>
							Forgot password?
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
